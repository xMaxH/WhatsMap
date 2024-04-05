import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TextInputComponent,
    TouchableOpacity,
    View
} from "react-native";
import sinUpStyle from "../Styles/authStyle";
import SizedBox from "../Styles/SizedBox";
import React, { useState } from 'react';
import { app } from "../firebaseConfig";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register({navigation}) {

    const styles = sinUpStyle

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to handle user registration
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('MAP');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("ERROR", error);
        }
    };

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.content}
                >
                    <Text style={styles.title}>Register New Account</Text>

                    <SizedBox height={0}/>

                    <SizedBox height={50}/>

                    <View style={styles.lineContainer}>
                        <View style={styles.line}/>
                        <Text style={styles.text}>x</Text>
                        <View style={styles.line}/>
                    </View>

                    <SizedBox height={50}/>
                    <Pressable>
                        <View style={styles.form}>
                            <Text style={styles.label}>Email</Text>

                            <TextInput
                                autoCapitalize="none"
                                //autoCompleteType="email"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                style={styles.textInput}
                                textContentType="username"
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                    </Pressable>

                    <SizedBox height={16}/>

                    <Pressable>
                        <View style={styles.form}>
                            <Text style={styles.label}>Password</Text>

                            <TextInput
                                autoCapitalize="none"
                                secureTextEntry
                                //autoCompleteType="email"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                style={styles.textInput}
                                textContentType="password"
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                    </Pressable>

                    <SizedBox height={16}/>

                    <Pressable>
                        <View style={styles.form}>
                            <Text style={styles.label}> Confirm Password</Text>

                            <TextInput
                                autoCapitalize="none"
                                //autoCompleteType="password"
                                autoCorrect={false}
                                returnKeyType="done"
                                secureTextEntry
                                style={styles.textInput}
                                textContentType="password"
                                onChangeText={(text) => setConfirmPassword(text)}
                            />
                        </View>
                    </Pressable>

                    <SizedBox height={16}/>



                    <SizedBox height={16}/>

                    <TouchableOpacity onPress={handleRegister}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Submit</Text>
                        </View>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}