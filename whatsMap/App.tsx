
import Login from "./Screens/Login";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./Screens/HomeMap";
import Profile from "./Screens/Profile";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Drawer from "./Screens/Drawer";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={'Home'}>
                <Tab.Screen name="Login" component={Login}
                    options={
                    {
                        tabBarLabel: 'Login',
                        tabBarIcon: ({color}) =>
                            (
                                <Icon name="login"
                                      size={25}
                                />
                            )
                    }
                    }/>
                <Tab.Screen name="Home" component={HomeScreen}
                    options={
                {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) =>
                    (
                    <Icon name="home-map-marker"
                    size={25}
                />
                )
                }

                } />
                <Tab.Screen name="Profile" component={Profile}
                    options={
                {
                    tabBarLabel: 'profile',
                    tabBarIcon: ({color}) =>
                    (
                    <Icon name="account"
                    size={25}
                />
                )
                }
                } />
                <Tab.Screen name="Explore" component={Drawer}

                    options={
                {
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({color}) =>
                    (
                    <Icon name="monitor-screenshot"
                    size={25}
                />
                )
                }



                } />
            </Tab.Navigator>
        </NavigationContainer>
    );

}


