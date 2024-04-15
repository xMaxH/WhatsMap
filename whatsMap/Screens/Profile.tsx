import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {style1} from '../Styles/style1';
// @ts-ignore
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {app}from "../firebaseConfig"
import {auth} from "./HomeMap"

const Profile = ({navigation}) => {
    const [user, setUser] = useState(null);

    // Checks if user is logged in
    useEffect(() =>
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        }), []);

    // Function for logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate('MAP');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <View style={style1.container}>
            {user ? ( // Displays user info
                <View>
                    <Text style={style1.text1}>Welcome, {user.email}</Text>
                    <TouchableOpacity onPress={handleLogout} style={style1.Logoutbtn}>
                        <Text style={style1.text2}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={style1.text1}>Not signed in</Text>
            )}
        </View>
    );
};
export default Profile;