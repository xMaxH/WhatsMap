import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native";
import styles, {FG_COLOUR} from "../Styles/styles";
import SizedBox from "../Styles/SizedBox";
import React, { useState } from 'react';
import { app } from "../firebaseConfig";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError] = useState('');

    const isValidPassword = (password) => {
        // Regex that checks for minimum 8 characters, at least one uppercase letter, one number, and one special character
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~"£¤/=¨`'-_|§€]).{8,}$/;
        return regex.test(password);
    };

    // Function to handle user registration
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        /*if (!isValidPassword(password)) {
            alert('Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.');
            return;
        }*/

        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Main');
        } catch (error) {
            alert('Registration failed. Please check your inputs and try again.');
        }
    };

    return (
        <ScrollView style={styles.root}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Text style={styles.header}>Register Account</Text>

                    <View style={styles.line}></View>

                    <SizedBox height={75}/>

                    <Pressable>
                        <View style={styles.text_input_container}>
                            <KeyboardAvoidingView
                                style={{flex: 1}}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <TextInput
                                    placeholder={"Email"}
                                    placeholderTextColor={FG_COLOUR}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    style={styles.text_input}
                                    textContentType="username"
                                    onChangeText={(text) => setEmail(text)}
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
                                    placeholder={"Password"}
                                    placeholderTextColor={FG_COLOUR}
                                    autoCapitalize="none"
                                    secureTextEntry
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    style={styles.text_input}
                                    textContentType="password"
                                    onChangeText={(text) => {
                                        setPassword(text);
                                    }}
                                />
                            </KeyboardAvoidingView>
                            <Text style={styles.body}>{passwordError}</Text>
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
                                    placeholder={"Confirm password"}
                                    placeholderTextColor={FG_COLOUR}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="done"
                                    secureTextEntry
                                    style={styles.text_input}
                                    textContentType="password"
                                    onChangeText={(text) => setConfirmPassword(text)}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </Pressable>
                    <View style={styles.line_input}></View>

                    <SizedBox height={50}/>

                    <TouchableOpacity onPress={handleRegister}>
                        <View style={styles.button}>
                            <Text style={styles.button_text}>Submit</Text>
                        </View>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
    );
}