
import Login from "./Screens/Login";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Profile from "./Screens/Profile";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from "./Screens/Drawer";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import HomeScreen, {auth} from "./Screens/HomeMap"

const Tab = createBottomTabNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    // Checks if user is logged in
    useEffect(() =>
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        }), []);
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}