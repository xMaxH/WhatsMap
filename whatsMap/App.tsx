import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { onAuthStateChanged } from 'firebase/auth';
import Login from "./Screens/Login";
import HomeScreen, { auth } from "./Screens/HomeMap";
import Profile from "./Screens/Profile";
import Register from "./Screens/Register";
import MyPins from "./Screens/MyPins";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    // Checks if user is logged in
    useEffect(() => {
        return onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
    }, []);

    // The buttons for the bottom navbar
    const MainTabScreen = () => (
        <Tab.Navigator initialRouteName={'Home'}>
            {!user && (
                <Tab.Screen name="Login" component={Login}
                            options={{
                                tabBarLabel: 'Login',
                                tabBarIcon: () => (
                                    <Icon name="login" size={25} />
                                )
                            }}
                />
            )}
            <Tab.Screen name="Home" component={HomeScreen}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                            tabBarIcon: () => (
                                <Icon name="home-map-marker" size={25} />
                            ),
                        }}
            />
            {user && (
                <Tab.Screen name="Profile" component={Profile}
                            options={{
                                tabBarLabel: 'Profile',
                                tabBarIcon: () => (
                                    <Icon name="account" size={25} />
                                )
                            }}
                />
            )}
            {user && (
                <Tab.Screen name="My pins" component={MyPins}
                            options={{
                                tabBarLabel: 'My pins',
                                tabBarIcon: () => (
                                    <Icon name="pin" size={25} />
                                )
                            }}
                />
            )}
        </Tab.Navigator>
    );

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainTabScreen} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: true}}/>
                <Stack.Screen name="MyPins" component={MyPins} options={{ headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}