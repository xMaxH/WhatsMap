import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeMap from "./Screens/HomeMap";
import Profile from "./Screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"}>
                <Stack.Screen options={{headerTintColor:"white",headerTitleAlign:"center",headerStyle: {backgroundColor: "#012154", }}}  name="MAP" component={HomeMap}/>
                {}
                <Stack.Screen options={{headerTintColor:"white",headerTitleAlign:"center",headerStyle: {backgroundColor: "#012154", }}} name="Profile" component={Profile}/>
                {}
            </Stack.Navigator>
        </NavigationContainer>
    );
}