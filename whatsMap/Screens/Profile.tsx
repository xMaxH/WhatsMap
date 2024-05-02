import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {style1} from '../Styles/style1';
// @ts-ignore
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
            navigation.navigate('Home');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    //Google logout
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    };
/*
           <View>
                {!user ? (
                    <View>
                        <Text>Welcome, {user.displayName}! Email: {user.email}</Text>
                        <TouchableOpacity onPress={handleSignOut} style={style1.Logoutbtn}>
                            <Text style={style1.text2}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                ): null}
            </View>

 */
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