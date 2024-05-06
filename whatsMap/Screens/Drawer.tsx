import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import styles from "../Styles/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {auth} from "./HomeMap";
import {onAuthStateChanged} from "firebase/auth";

export default function Drawer({navigation})
{
    const [user, setUser] = useState(null);

    // Checks if user is logged in
    useEffect(() =>
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        }), []);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <View style={styles.button_drawer}>
                    <Icon name="home"
                          size={25}
                          style={styles.icon_drawer}
                    />
                    <Text style={styles.button_text_drawer}>Home Map</Text>
                </View>
            </TouchableOpacity>
            {!user && (
                <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <View style={styles.button_drawer}>
                    <Icon name="login"
                          size={25}
                          style={styles.icon_drawer}
                    />
                    <Text style={styles.button_text_drawer}>Login</Text>
                </View>
            </TouchableOpacity>)}

            {user && (
            <TouchableOpacity
                onPress={() => navigation.navigate('MyPins')}
            >
                <View style={styles.button_drawer}>
                    <Icon name="map-marker"
                          size={25}
                          style={styles.icon_drawer}
                    />
                    <Text style={styles.button_text_drawer}>My pins</Text>
                </View>
            </TouchableOpacity>)}

            {user && (
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
            >
                <View style={styles.button_drawer}>
                    <Icon name="account"
                          size={25}
                          style={styles.icon_drawer}
                    />
                    <Text style={styles.button_text_drawer}>Profile</Text>
                </View>
            </TouchableOpacity>)}

            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
            >
                <View style={styles.button_drawer}>
                    <Icon name="account"
                          size={25}
                          style={styles.icon_drawer}
                    />
                    <Text style={styles.button_text_drawer}>Discover</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('About us')}
            >
                <View style={styles.button_drawer}>
                    <Icon name="information"
                          size={25}
                          style={styles.icon_drawer}
                    />
                    <Text style={styles.button_text_drawer}>About Us</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
}