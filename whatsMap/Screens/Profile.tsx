import React, {useEffect, useState} from 'react';
import {Alert, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {deleteUser, getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import styles from '../Styles/styles';
import UsernameModal from './UsernameModal';
import SizedBox from "../Styles/SizedBox";
import {auth} from "./HomeMap";
import {collection, doc, getDoc, getDocs, query, updateDoc, where, writeBatch} from "firebase/firestore";
import {db} from "../firebaseConfig";

const Profile = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [showUsernameModal, setShowUsernameModal] = useState(false);

    useEffect(() => {
        return onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUser({...currentUser, username: userData.username});
                } else {
                    setUser({...currentUser, username: ''}); // Handle case where user data doesn't exist
                }
            } else {
                setUser(null);
            }
        });
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


// Function for handling when the user logs out
    const handleLogout = async () => {
        try {
            await signOut(getAuth());
            navigation.navigate('Home');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
// Function for handling the deletion of an account
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
        <Pressable style={styles.container} onPress={() => setShowUsernameModal(false)}>
            {user ? ( // Displays user info
                <View>

                    <Text style={styles.header2}>Welcome, {user.username || user.username}</Text>

                    <SizedBox height={60}/>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShowUsernameModal(true)}>
                        <Text style={styles.button_text}>Update Username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.button}>
                        <Text style={styles.button_text}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteAccount} style={styles.button_delete}>
                        <Text style={styles.button_text}>Delete Account</Text>
                    </TouchableOpacity>
                    {showUsernameModal && (
                        <UsernameModal
                        visible={showUsernameModal}
                        setVisible={setShowUsernameModal}
                        userId={user.uid}
                        onUpdateUsername={handleUpdateUsername}
                        navigation={navigation}/>
                    )}
                </View>
            ) : (
                <Text>Not signed in</Text>
            )}
        </Pressable>
    );
};
export default Profile;
