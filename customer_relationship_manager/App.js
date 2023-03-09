import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EntryListing from "./screens/EntryListing";
import EntryInput from "./screens/EntryInput";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="List of Customers"
          component={EntryListing}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                //For the list of icon name
                //visit https://icons.expo.fyi/
                name="person-add"
                size={24}
                color="white"
                onPress={() => {
                  navigation.navigate("EntryInput");
                }}
              />
            ),
          })}
        />
        <Stack.Screen name="EntryInput" component={EntryInput} options={{ title: 'Enter Customer Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
