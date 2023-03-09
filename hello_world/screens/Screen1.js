import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

function Screen1({ navigation }) {
  const [textInput, setTextInput] = useState(""); 
  async function writeSomeDAta(data) {

  }

  async function loadDAta(data) {

  }

  return (
    <View>
      <Text> Contents of Screen 1</Text>
      <TextInput
        style={{ borderWidth: 1}}
        value={textInput}
        onChangeText={setTextInput}
      >
      </TextInput>
      <Button>

      </Button>
    </View>
    {
      /*
    <View>
      <Text
        style={{
          height: 40,
          backgroundColor: "red",
          flexDirection: "row",
          textAlign: "center",
          padding: 10,
        }}
      >
        Screen 1
      </Text>
      <Button
        title="Go to Screen 2"
        onPress={() => {
          navigation.navigate("Screen2");
        }}
      />
      <Button
        title="Go to Screen 3"
        onPress={() => {
          navigation.navigate("Screen3");
        }}
      />
      <Button
        title="Go to ItemScreen with item A"
        onPress={() => {
          navigation.navigate("ItemScreen", {
            item: "A",
            title: "Item A",
          });
        }}
      />
      <Button
        title="Go to ItemScreen with item B"
        onPress={() => {
          navigation.navigate("ItemScreen", {
            item: "B",
            title: "Item B",
          });
        }}
      />
    </View>
    */
      }
  );
}

export default Screen1;
