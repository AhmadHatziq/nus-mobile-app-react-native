import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

//here we are hardcoding to keep things simple but better
//to import this variable from a configuration file
const DATA_KEY = "TODOAPP_DATA";

export default function EntryList() {
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    readData();
  }, [isFocused]);

  async function readData() {
    let entries = [];

    try {
      entries = await AsyncStorage.getItem(DATA_KEY);
    } catch (e) {}

    if (entries) {
      entries = JSON.parse(entries);
      setData(entries);
    }
  }

  async function saveData(updatedData) {
    const entries = JSON.stringify(updatedData);
    try {
      await AsyncStorage.setItem(DATA_KEY, entries);
    } catch (error) {
      Alert.alert("Unable to save the entry. Please try again");
    }
  }

  function deleteEntry(index) {
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    saveData(newData);
    setData(newData);
  }

  function renderEntry({ item, index }) {
    return (
      <View key={index} style={styles.entryContainer}>
        <Text style={styles.entryText}>
          {index + 1}. {item}
        </Text>
        <View style={styles.entryButton}>
          <Button
            onPress={() => {
              Alert.alert("Todo", "Do you want to delete?", [
                {
                  text: "Yes",
                  onPress: () => {
                    deleteEntry(index);
                  },
                },
                {
                  text: "No",
                },
              ]);
            }}
            title="Delete"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        style={styles.scrollViewStyle}
        data={data}
        renderItem={renderEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  entryText: {
    padding: 10,
    flex: 3,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
  entryContainer: {
    flexDirection: "row",

    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a4a4a4",
    margin: 5,

    backgroundColor: "white",
    elevation: 4,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  scrollViewStyle: {
    width: "80%",
  },
});