import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { onAuthStateChanged } from 'firebase/auth';
import Login from "./Screens/Login";
import HomeScreen, { auth } from "./Screens/HomeMap";
import Profile from "./Screens/Profile";
import Drawer from "./Screens/Drawer";
import Register from "./Screens/Register";
import MyPins from "./Screens/MyPins";
import {FG_COLOUR} from "./Styles/styles";

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

    const MainTabScreen = () => (
        <Tab.Navigator initialRouteName={'Home'}
                       screenOptions={()=> ({
                           headerShown: false,
                           tabBarStyle: {
                               backgroundColor: FG_COLOUR,
                           }
                       })}
        >
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
            <Stack.Navigator screenOptions={{ headerShown: false,
                headerStyle: {backgroundColor: FG_COLOUR}
            }}>
                <Stack.Screen name="Main" component={MainTabScreen} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: true}}/>
                <Stack.Screen name="MyPins" component={MyPins} options={{ headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/*
import Login from "./Screens/Login";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Profile from "./Screens/Profile";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from "./Screens/Drawer";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import HomeScreen, {auth} from "./Screens/HomeMap"
import Register from "./Screens/Register";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutUs from "./Screens/AboutUs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const [user, setUser] = useState(null);

// Checks if user is logged in
useEffect(() =>
    onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
    }), []);

const MainTabScreen = () => (
    <Tab.Navigator initialRouteName={'Home'}>
        {!user && (
            <Tab.Screen name="Login" component={Login}
                        options={{
                            tabBarLabel: 'Login',
                            tabBarIcon: ({ color }) => (
                                <Icon name="login" size={25} />
                            )
                        }}
            />
        )}
        <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <Icon name="home-map-marker" size={25} />
                        ),
                        headerPressColor: 'red',
                        headerTransparent: true,
                        headerPressOpacity: 100,
                        headerStatusBarHeight: 12,
                        headerTitleAlign: 'center',
                        headerTintColor: 'cyan',
                    }}
        />
        {user && (
            <Tab.Screen name="Profile" component={Profile}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color }) => (
                                <Icon name="account" size={25} />
                            )
                        }}
            />
        )}
        <Tab.Screen name="Explore" component={Drawer}
                    options={{
                        tabBarLabel: 'Explore',
                        tabBarIcon: ({ color }) => (
                            <Icon name="monitor-screenshot" size={25} />
                        )
                    }}
        />
    </Tab.Navigator>
);

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainTabScreen} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                <Stack.Screen name="Main" component={MainTabScreen}/>
                <Stack.Screen name="Register" component={Register}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}*/
