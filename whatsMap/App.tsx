
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

const MainTabScreen = () => (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
            name="Login"
            component={Login}
            options={{
                tabBarLabel: 'Login',
                tabBarIcon: ({ color }) => <Icon name="login" size={25} color={color} />,
            }}
        />
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                headerShown: false,
                tabBarIcon: ({ color }) => <Icon name="home-map-marker" size={25} color={color} />,
            }}

        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => <Icon name="account" size={25} color={color} />,
            }}
        />
        <Tab.Screen
            name="Explore"
            component={Drawer}
            options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color }) => <Icon name="monitor-screenshot" size={25} color={color} />,
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

