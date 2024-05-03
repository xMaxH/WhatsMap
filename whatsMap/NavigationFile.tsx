import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./Screens/HomeMap"
// Screens
import HomeMap from "./Screens/HomeMap";
import Profile from "./Screens/Profile";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import MyPins from "./Screens/MyPins";

const Stack = createNativeStackNavigator();

export function NavigationFile() {
    const [setUser] = useState(null); // State to hold the user's authentication state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"}>
                <Stack.Screen name="MAP" component={HomeMap} options={{ headerShown:false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown:false }}/>
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="MyPins" component={MyPins} options={{ headerShown:false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
