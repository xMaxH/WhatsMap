import React, { useState} from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, View, Pressable
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app, db} from "../firebaseConfig";
import styles, {FG_COLOUR_MUTED} from "../Styles/styles";
import SizedBox from "../Styles/SizedBox";
import UsernameModal from "./UsernameModal";
import {doc, setDoc} from "firebase/firestore";

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const [userId] = useState(null);

    // Regex for email and password
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~"£¤/=¨`'-_|§€]).{8,}$/.test(password);

    const onUpdateUsername = (newUsername) => {
        console.log("New username set:", newUsername);
    };

// Function for handling the registering of a user
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
            const defaultUsername = email.split('@')[0];
            await setDoc(doc(db, "users", user.uid), {email, username: defaultUsername});

            // After successful registration you get navigated to the home page
            navigation.navigate('Home');
        } catch (error) {
            console.error("Registration failed: ", error);
            Alert.alert('Registration Failed', "Please check your inputs and try again.");
        }
    };

    return (
        <ScrollView style={styles.root}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Text style={styles.header}>Register New Account</Text>
                    <View style={styles.line}></View>
                    <SizedBox height={50}/>

                    <Pressable>
                    <View style={styles.text_input_container}>
                            <KeyboardAvoidingView
                                style={{flex: 1}}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="Email"
                                    placeholderTextColor={FG_COLOUR_MUTED}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onChangeText={setEmail}
                                    value={email}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </Pressable>
                    <View style={styles.line_input}></View>

                    <SizedBox height={16}/>

                    <Pressable>
                        <View style={styles.text_input_container}>
                            <KeyboardAvoidingView
                                style={{flex: 1}}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="Password"
                                    placeholderTextColor={FG_COLOUR_MUTED}
                                    autoCapitalize="none"
                                    onChangeText={setPassword}
                                    value={password}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </Pressable>
                    <View style={styles.line_input}></View>

                    <SizedBox height={16}/>

                    <Pressable>
                        <View style={styles.text_input_container}>
                            <KeyboardAvoidingView
                                style={{flex: 1}}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <TextInput
                                    style={styles.text_input}
                                    placeholder="Confirm password"
                                    placeholderTextColor={FG_COLOUR_MUTED}
                                    autoCapitalize="none"
                                    onChangeText={setConfirmPassword}
                                    value={confirmPassword}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </Pressable>
                    <View style={styles.line_input}></View>

                    <SizedBox height={16}/>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.button_text}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
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