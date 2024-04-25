
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import loginStyle from "../Styles/authStyle";
import SizedBox from "../Styles/SizedBox";
import {app} from "../firebaseConfig";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./HomeMap";



export default function Drawer({navigation})
{
    const styles = loginStyle
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(48, 56, 75, 1)"}}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <View style={styles.buttonDrawer}>
                    <Icon name="home"
                          size={25}
                          style={styles.iconButtonDrawer}
                    />
                    <Text style={styles.textButtonDrawer}>Home Map</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <View style={styles.buttonDrawer}>
                    <Icon name="login"
                          size={25}
                          style={styles.iconButtonDrawer}
                    />
                    <Text style={styles.textButtonDrawer}>Login</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <View style={styles.buttonDrawer}>
                    <Icon name="map-marker"
                          size={25}
                          style={styles.iconButtonDrawer}
                    />
                    <Text style={styles.textButtonDrawer}>Pined Map</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
            >
                <View style={styles.buttonDrawer}>
                    <Icon name="account"
                          size={25}
                          style={styles.iconButtonDrawer}
                    />
                    <Text style={styles.textButtonDrawer}>Profile</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
            >
                <View style={styles.buttonDrawer}>
                    <Icon name="account"
                          size={25}
                          style={styles.iconButtonDrawer}
                    />
                    <Text style={styles.textButtonDrawer}>Discover</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
            >
                <View style={styles.buttonDrawer}>
                    <Icon name="information"
                          size={25}
                          style={styles.iconButtonDrawer}
                    />
                    <Text style={styles.textButtonDrawer}>About Us</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
}