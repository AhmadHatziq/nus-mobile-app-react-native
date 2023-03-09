import { Button, Text, View } from "react-native";
import ChildComponent from "../components/ChildComponent";

function Screen2() {
  return (
    <View>
      <Text
        style={{
          height: 40,
          backgroundColor: "pink",
          flexDirection: "row",
          textAlign: "center",
          padding: 10,
        }}
      >
        Screen 2
      </Text>
      <ChildComponent />
    </View>
  );
}

export default Screen2;
