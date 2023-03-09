import { Button, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

//Child component doesn't have access to navigation as props
//can use a hook to get the navigation object
function ChildComponent() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>ChildComponent</Text>
      <Button
        title="Go to Screen 1"
        onPress={() => {
          navigation.navigate("Screen1");
        }}
      />
    </View>
  );
}

export default ChildComponent;
