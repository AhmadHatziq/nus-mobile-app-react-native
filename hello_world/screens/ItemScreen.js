import { Button, Text, View } from "react-native";

function ItemScreen({ navigation, route }) {
  let contents = "";

  if (route && route.params && route.params.item) {
    contents = route.params.item;
  }

  //alternatively you can write it as optional chaining syntax (ES2020)
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  // const contents = route.params?.item;

  return (
    <View style={{ flex: 1, backgroundColor: "blue" }}>
      <Text
        style={{
          height: 40,
          backgroundColor: "pink",
          flexDirection: "row",
          textAlign: "center",
          padding: 10,
        }}
      >
        ItemScreen - {contents}
      </Text>
      <Button
        title="back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

export default ItemScreen;
