import React, { useEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View, Alert, Pressable } from 'react-native';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { style1 } from '../Styles/style1';
import UsernameModal from './UsernameModal'; // Ensure it's correctly imported
import SizedBox from "../Styles/SizedBox";
import {auth} from "./HomeMap";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";

const Profile = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [showUsernameModal, setShowUsernameModal] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUser({ ...currentUser, username: userData.username });
                } else {
                    setUser({ ...currentUser, username: '' }); // Handle case where user data doesn't exist
                }
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const handleUpdateUsername = (newUsername) => {
        setUser((currentUser) => ({
            ...currentUser,
            username: newUsername
        }));
    };


    const handleLogout = async () => {
        try {
            await signOut(getAuth());
            navigation.navigate('Home');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <View style={style1.container}>
            {user ? (
                <View>
                    <Text style={style1.text1}>Welcome, {user.username || user.username}</Text>
                    <TouchableOpacity onPress={() => setShowUsernameModal(true)}>
                        <Text>Update Username</Text>
                    </TouchableOpacity>
                    <SizedBox height={30} />
                    <TouchableOpacity onPress={handleLogout} style={style1.Logoutbtn}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                    {showUsernameModal && (
                        <UsernameModal
                            visible={showUsernameModal}
                            setVisible={setShowUsernameModal}
                            userId={user.uid}
                            onUpdateUsername={handleUpdateUsername} // Passing the update function
                            navigation={navigation}
                        />
                    )}
                </View>
            ) : (
                <Text>Not signed in</Text>
            )}
        </View>
    );
};

export default Profile;
