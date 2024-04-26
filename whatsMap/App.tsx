
import Login from "./Screens/Login";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./Screens/HomeMap";
import Profile from "./Screens/Profile";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from "./Screens/Drawer";
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
            <Stack.Navigator>
                <Stack.Screen name="Main" component={MainTabScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="About us" component={AboutUs}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

