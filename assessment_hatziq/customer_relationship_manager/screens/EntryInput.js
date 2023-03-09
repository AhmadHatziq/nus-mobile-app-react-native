import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput, 
  Text, 
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_KEY } from "../config";

export default function EntryInput({ navigation }) {

  // Define 3 new variables to store the name, phone and address strings
  const[name, setName] = useState(""); 
  const[phoneNumber, setPhoneNumber] = useState(""); 
  const[address, setAddress] = useState("");  


  async function addEntry() {

    // Exit out if any of the fields are of length 0 
    if (name.length == 0 || phoneNumber.length == 0 || address.length == 0) {
      Alert.alert('Please Enter A Value', 'One of the fields is empty', )
      return; 
    }

    // Initialize empty list of customer_entries. Will populate from storage, if data is present. 
    let customer_entries = [];

    // Create new customer object from user input fields. 
    let new_customer = {
      "name": name, 
      "phoneNumber": phoneNumber, 
      "address": address,
    };

    // Load any data if present 
    try {
      customer_entries = await AsyncStorage.getItem(DATA_KEY);
    } catch (error) {}

    // If entries exist 
    if (customer_entries) {
      //load existing data
      customer_entries = JSON.parse(customer_entries);

      //append input to it
      customer_entries = [...customer_entries, new_customer];

    } else {
      //first time usage
      //i.e. an array with input as single entry
      customer_entries = [new_customer];
    }

    // save entries using AsyncStorage
    let customer_entries_json = JSON.stringify(customer_entries);
    try {
      await AsyncStorage.setItem(DATA_KEY, customer_entries_json);
      console.log(`Saved into storage: ${customer_entries_json}`); 
    } catch (error) {
      Alert.alert("Unable to save. Please try again");
      return;
    }

    // Clear all the input fields as data has already been saved. 
    setPhoneNumber(""); 
    setName(""); 
    setAddress(""); 

    // Redirect the user to view the list of customers. 
    navigation.navigate("List of Customers");
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <Text style={styles.inputLabel}>Name: </Text>
        <TextInput
          style={styles.textInput}
          multiline={false}
          placeholder="Enter Name"
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.inputLabel}>{"\n"} Phone Number: </Text>
        <TextInput
          style={styles.textInput}
          multiline={false}
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />

        <Text style={styles.inputLabel}>{"\n"} Address: </Text>
        <TextInput
          style={styles.addressInput}
          multiline={true}
          placeholder="Enter Address"
          value={address}
          onChangeText={text => setAddress(text)}
        />

        <Button title="Add Customer" onPress={addEntry} color="green" />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginVertical: 40,
    marginHorizontal: 20,
  },
  addressInput: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    minHeight: 100,
    backgroundColor: "white",
    fontSize: 20,
    marginBottom: 10,
  }, 
  textInput: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    minHeight: 20,
    backgroundColor: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  inputLabel: {
    fontWeight: 'bold', 
  }, 
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
});
