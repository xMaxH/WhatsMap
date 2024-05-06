import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, StyleSheet, Modal } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app, db} from "../firebaseConfig";
import signUpStyle from "../Styles/authStyle";
import SizedBox from "../Styles/SizedBox";
import UsernameModal from "./UsernameModal";
import {doc, getDoc} from "firebase/firestore";
import {auth} from "./HomeMap";

export default function Register({ navigation }) {
    const styles = signUpStyle;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [userId, setUserId] = useState(null);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~"£¤/=¨`'-_|§€]).{8,}$/.test(password);

    const onUpdateUsername = (newUsername) => {
        console.log("New username set:", newUsername);
        // Perform any other actions you might need after username update
    };
    const refreshUserData = async (uid) => {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserId({ ...auth.currentUser, ...userData });  // Combine auth data and user data
        }
    };


    const handleRegister = async () => {
        if (!isValidEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Password Error', 'Passwords do not match.');
            return;
        }
        if (!isValidPassword(password)) {
            Alert.alert('Password Error', 'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
            return;
        }

        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUserId(user.uid); // Store the user ID
            await refreshUserData(user.uid);
            // Show the username modal
            setShowUsernameModal(true);
        } catch (error) {
            console.error("Registration failed: ", error);
            Alert.alert('Registration Failed', "Please check your inputs and try again.");
        }
    };

    return (
        <ScrollView style={styles.root}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
                <Text style={styles.title}>Register New Account</Text>
                <SizedBox height={50}/>
                <TextInput
                    style={styles.form}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />
                <SizedBox height={50}/>

                <TextInput
                    style={styles.form}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <SizedBox height={16}/>

                <TextInput
                    style={styles.form}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
                <SizedBox height={16}/>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {/* Username Modal */}
            {showUsernameModal && (
                <UsernameModal
                    visible={showUsernameModal}
                    setVisible={setShowUsernameModal}
                    userId={userId}
                    onUpdateUsername={onUpdateUsername}
                    navigation={navigation}
                />
            )}

        </ScrollView>
    );
}