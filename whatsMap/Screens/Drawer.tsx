
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import loginStyle from "../Styles/authStyle";
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
            {!user && (
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
            </TouchableOpacity>)}

            {user && (
            <TouchableOpacity
                onPress={() => navigation.navigate('MyPins')}
            >
                <View style={styles.buttonDrawer}>
                    <Icon name="map-marker"
                          size={25}
                          style={styles.iconButtonDrawer}
                    />
                    <Text style={styles.textButtonDrawer}>My pins</Text>
                </View>
            </TouchableOpacity>)}

            {user && (
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
            </TouchableOpacity>)}

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
                onPress={() => navigation.navigate('About us')}
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