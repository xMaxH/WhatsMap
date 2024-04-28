import React, { useEffect, useState } from 'react';
import Login from "./Screens/Login";
import Profile from "./Screens/Profile";
import HomeScreen, { auth } from "./Screens/HomeMap";
import Register from "./Screens/Register";
import AboutUs from "./Screens/AboutUs";
import Drawer from "./Screens/Drawer";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabScreen = ({ user }) => {
    return (
        <Tab.Navigator initialRouteName="Home">
            {!user ? (
                <Tab.Screen name="Login" component={Login}
                            options={{
                                tabBarLabel: 'Login',
                                tabBarIcon: ({ color }) => <Icon name="login" size={25} color={color} />,
                            }}
                />
            ) : (
                <>
                    <Tab.Screen name="Home" component={HomeScreen}
                                options={{
                                    tabBarLabel: 'Home',
                                    headerShown: false,
                                    tabBarIcon: ({ color }) => <Icon name="home-map-marker" size={25} color={color} />,
                                }}
                    />
                    <Tab.Screen name="Profile" component={Profile}
                                options={{
                                    tabBarLabel: 'Profile',
                                    tabBarIcon: ({ color }) => <Icon name="account" size={25} color={color} />,
                                }}
                    />
                    <Tab.Screen name="Explore" component={Drawer}
                                options={{
                                    tabBarLabel: 'Explore',
                                    tabBarIcon: ({ color }) => <Icon name="monitor-screenshot" size={25} color={color} />,
                                }}
                    />
                </>
            )}
        </Tab.Navigator>
    );
};

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" options={{ headerShown: false }}>
                    {() => <MainTabScreen user={user} />}
                </Stack.Screen>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="About Us" component={AboutUs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
