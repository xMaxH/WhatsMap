import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// Screens
import HomeMap from "./Screens/HomeMap";
import Profile from "./Screens/Profile";
import Login from "./Screens/Login";
import Register from "./Screens/Register";

const Stack = createNativeStackNavigator();

export function NavigationFile() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"}>
                <Stack.Screen name="MAP" component={HomeMap}/>
                {}
                <Stack.Screen name="Profile" component={Profile}/>
                {}
                <Stack.Screen name="Login" component={Login}/>
                {}
                <Stack.Screen name="Register" component={Register}/>
                {}
            </Stack.Navigator>
        </NavigationContainer>
    );
}