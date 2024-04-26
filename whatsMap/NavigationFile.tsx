import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication functions here
import {auth} from "./Screens/HomeMap"
// Screens
import HomeMap from "./Screens/HomeMap";
import Profile from "./Screens/Profile";
import Login from "./Screens/Login";
import Register from "./Screens/Register";

const Stack = createNativeStackNavigator();

export function NavigationFile() {
    const [user, setUser] = useState(null); // State to hold the user's authentication state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe; // Cleanupfunction
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"}>
                <Stack.Screen
                    name="MAP"
                    component={HomeMap}
                    options={{ headerShown:false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown:false }}
                />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown:false }}/>
                <Stack.Screen name="Register" component={Register} options={{ headerShown:false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
