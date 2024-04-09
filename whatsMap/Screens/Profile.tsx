import React, { useEffect, useState } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { style1 } from '../Styles/style1';

const Profile = ({navigation}) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    // Checks if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);


    // Function for logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <View style={style1.container}>
            {user ? ( // Displays user info
                <View>
                    <Text style={style1.text1}>Welcome, {user.email}</Text>
                    <TouchableOpacity onPress={handleLogout} style={style1.btn1}>
                        <Text style={style1.text1}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={style1.text1}>Not signed in</Text>
            )}
        </View>
    );
};
export default Profile;
