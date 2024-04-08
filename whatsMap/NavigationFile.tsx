import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
                <Stack.Screen
                    name="MAP"
                    component={HomeMap}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <Button
                                    onPress={() => navigation.navigate('Profile')}
                                    title="Profile"
                                    color="#000" // Adjust the color as per your theme
                                />
                                <Button
                                    onPress={() => navigation.navigate('Login')}
                                    title="Login"
                                    color="#000" // Adjust the color as per your theme
                                />
                            </View>
                        )
                    })}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={({ navigation }) => ({

                    })}
                />
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="Register" component={Register}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
