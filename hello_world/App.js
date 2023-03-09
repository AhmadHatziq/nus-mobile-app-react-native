import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import ItemScreen from "./screens/ItemScreen";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen
          name="Screen2"
          options={{
            headerStyle: {
              backgroundColor: "brown",
            },
            headerTintColor: "white",
          }}
          component={Screen2}
        />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen
          name="ItemScreen"
          component={ItemScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerRight: () => (
              <IconButton
                name="star"
                size={24}
                color="white"
                onPress={() => {
                  console.log("on pressed");
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
