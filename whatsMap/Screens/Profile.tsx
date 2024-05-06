import React, { useEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View, Alert, Pressable } from 'react-native';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { style1 } from '../Styles/style1';
import UsernameModal from './UsernameModal'; // Ensure it's correctly imported
import SizedBox from "../Styles/SizedBox";
import {auth} from "./HomeMap";
import {collection, doc, getDoc, getDocs, query, updateDoc, where, writeBatch} from "firebase/firestore";
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

    const handleUpdateUsername = async (newUsername) => {
        const userRef = doc(db, 'users', user.uid);
        try {
            // Update the username in the user profile
            await updateDoc(userRef, {
                username: newUsername
            });
            // Update local state
            setUser((currentUser) => ({
                ...currentUser,
                username: newUsername
            }));
            // Update all comments made by the user
            const commentsRef = collection(db, 'comments');
            const q = query(commentsRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const batch = writeBatch(db);
            querySnapshot.docs.forEach((doc) => {
                batch.update(doc.ref, { username: newUsername });
            });
            await batch.commit();
        } catch (error) {
            console.error("Failed to update username:", error);
        }
    };



    const handleLogout = async () => {
        try {
            await signOut(getAuth());
            navigation.navigate('Home');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

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

    return (
        <Pressable style={style1.container} onPress={() => setShowUsernameModal(false)}>
            {user ? ( // Displays user info
                <View>
                    <TouchableOpacity
                        style={style1.usernamebtn}
                        onPress={() => setShowUsernameModal(true)}>
                        <Text>Update Username</Text>
                    </TouchableOpacity>

                    <Text style={style1.text1}>Welcome, {user.username || user.username}</Text>

                    <SizedBox height={60}/>
                    <TouchableOpacity onPress={handleLogout} style={style1.Logoutbtn}>
                        <Text style={style1.text2}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteAccount} style={style1.Deleteaccountbtn}>
                        <Text style={style1.text2}>Delete Account</Text>
                    </TouchableOpacity>
                    {showUsernameModal && (
                        <UsernameModal
                            visible={showUsernameModal}
                            setVisible={setShowUsernameModal}
                            userId={user.uid}
                            onUpdateUsername={handleUpdateUsername}
                            navigation={navigation}
                        />
                    )}
                </View>
            ) : (
                <Text>Not signed in</Text>
            )}
        </Pressable>
    );
};
export default Profile;
