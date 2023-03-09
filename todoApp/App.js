import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RoundButton from "./assets/RoundButton";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EntryInput from "./screens/EntryInput";
import EntryListing from "./screens/EntryListing";

//Try adding dummy data
const randomData = [];
for (let i = 0; i < 3; i++) {
  randomData.push(`item ${i}`);
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  function handleInput(text) {
    console.log(text);
    setInput(text);
  }

  function addEntry() {
    setData([...data, input]);
    setInput("");
  }

  function deleteEntry(index) {
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(newData);
  }

  //input data
  //output RN components
  function renderEntries() {
    return randomData.map((entry, index) => {
      return (
        <View key={index} style={styles.entryContainer}>
          <Text>
            {index + 1}. {entry}
          </Text>
          <Button
            title="Delete"
            onPress={() => {
              deleteEntry(index);
            }}
          />
        </View>
      );
    });
  }

  function renderEntry({ item, index }) {
    return (
      <View key={index} style={styles.entryContainer}>
        <Text style={styles.entryText}>
          {index + 1}. {item}
        </Text>
        <View style={styles.entryButton}>
          <Button
            title="Delete"
            onPress={() => {
              if (Platform.OS == "ios") {
                Alert.alert("Todo", `Do you want to delete ${item}?`, [
                  {
                    text: "Ok",
                    onPress: () => {
                      deleteEntry(index);
                    },
                  },
                  { text: "Cancel", style: "cancel" },
                ]);
              } else {
                Alert.alert("Todo", `Do you want to delete ${item}?`, [
                  {
                    text: "Yes",
                    onPress: () => {
                      deleteEntry(index);
                    },
                  },
                  { text: "No" },
                ]);
              }
            }}
          />
        </View>
      </View>
    );
  }

  return (

    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="EntryInput"
        component={EntryInput} />
      <Stack.Screen name="EntryListing"
        component={EntryListing} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
    /*
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.entryForm}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={handleInput}
          multiline={true}
          placeholder="Enter todo entry"
        />
        <View style={styles.entryFormButton}>
          <Button title="Add" onPress={addEntry} color="green" />
        </View>
      </View>
     
      <FlatList
        style={styles.scrollViewStyle}
        data={data}
        renderItem={renderEntry}
      />
    </View>
  */
 /* <Text>{JSON.stringify(data)}</Text> */
  /* <ScrollView style={styles.scrollViewStyle}>{renderEntries()}</ScrollView> */
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  textInput: {
    borderWidth: 1,
    width: "90%",
    padding: 5,
    borderRadius: 5,
  },
  entryText: {
    flex: 3,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
  entryForm: {
    flexDirection: "row",
    margin: 20,
  },
  entryFormButton: {
    justifyContent: "center",
    marginLeft: 5,
  },
  entryContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a8a8a8",
    margin: 5,
    padding: 5,

    backgroundColor: "white",
    elevation: 8,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  scrollViewStyle: {
    width: "80%",
    maxHeight: "90%",
  },
});
