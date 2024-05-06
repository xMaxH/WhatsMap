import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View, Alert} from 'react-native';
import {getAuth, onAuthStateChanged, signOut, deleteUser,reauthenticateWithCredential  } from 'firebase/auth';
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

    // Function for deleting user account
    /*const handleDeleteAccount = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            try {
                await deleteUser(user);
                // User deleted successfully
                console.log("User deleted successfully");
            } catch (error) {
                // An error occurred while deleting user
                console.error("Error deleting user:", error);
            }
        } else {
            // User is not logged in
            console.log("User is not logged in");
        }
    };*/

    const handleDeleteAccount = async () => {
        // Function to handle deletion confirmation
        const confirmDelete = () => {
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete your account?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            const auth = getAuth();
                            const user = auth.currentUser;

                            if (user) {
                                try {
                                    await deleteUser(user);
                                    // User deleted successfully
                                    console.log("User deleted successfully");
                                    navigation.navigate('Home');
                                } catch (error) {
                                    // An error occurred while deleting user
                                    console.error("Error deleting user:", error);
                                }
                            } else {
                                // User is not logged in
                                console.log("User is not logged in");
                            }
                        }
                    }
                ],
                { cancelable: false }
            );
        };

        confirmDelete();
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
                    <TouchableOpacity onPress={handleDeleteAccount} style={style1.Deleteaccountbtn}>
                        <Text style={style1.text2}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={style1.text1}>Not signed in</Text>
            )}
        </View>

    );
};
export default Profile;