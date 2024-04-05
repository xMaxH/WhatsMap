import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { style1 } from "../Styles/style1";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state to track auth status checking

    // If the user is logged in he cant access the login button
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Returns the function to unsubscribe from the auth listener on component unmount
        return unsubscribe;
    }, []);

    // If the auth state is still being checked, it shows a loading spinner
    if (loading) {
        return (
            <View style={style1.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={style1.container}>
            <Pressable onPress={() => navigation.navigate('Profile')} style={style1.btn1}>
                <Text style={style1.text1}>Profile</Text>
            </Pressable>
            {!user && (
                <Pressable onPress={() => navigation.navigate('Login')} style={style1.btn1}>
                    <Text style={style1.text1}>Login</Text>
                </Pressable>
            )}
        </View>
    );
}
