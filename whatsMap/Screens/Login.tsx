import {
    Button,
    KeyboardAvoidingView, Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TextInputComponent, TouchableOpacity,
    View,
    KeyboardAvoidingViewProps, KeyboardAvoidingViewBase, KeyboardAvoidingViewComponent,
    ScrollView,
    Alert
} from "react-native";
import loginStyle from "../Styles/authStyle";
import SizedBox from "../Styles/SizedBox";
import {app} from "../firebaseConfig";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import {auth} from "./HomeMap";
import firebase from "firebase/compat";
import User = firebase.User;





export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    const styles = loginStyle
    const login = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully');
            navigation.navigate('Home');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                // User does not exist, show alert
                Alert.alert(
                    'User Not Found',
                    'You must register a user before logging in.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            } else {
                // Other errors, show the error message
                Alert.alert(
                    'Login Error',
                    'You must register a user before logging in.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            }
        }
    };


    return (
        <ScrollView style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <SizedBox height={100}/>

                    <SizedBox height={50}/>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={styles.header}>Login</Text>

                    <View style={styles.line}></View>

                    <View style={styles.lineContainer}>
                        <View style={styles.line}/>
                        <Text style={styles.text}>x</Text>
                        <View style={styles.line}/>
                    </View>

                    <SizedBox height={50}/>

                    <Pressable>
                        <View style={styles.form}>
                            <Text style={styles.label}>Email</Text>
                            <KeyboardAvoidingView
                                style={{flex: 1}}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <TextInput
                                    autoCapitalize="none"
                                    // autoCompleteType="email"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    style={styles.textInput}
                                    textContentType="username"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </KeyboardAvoidingView>

                        </View>
                    </Pressable>


                    <SizedBox height={16}/>

                    <Pressable>
                        <View style={styles.form}>
                            <Text style={styles.label}>Password</Text>
                            <KeyboardAvoidingView
                                style={{flex: 1}}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                                <TextInput
                                    autoCapitalize="none"
                                    //autoCompleteType="password"
                                    autoCorrect={false}
                                    returnKeyType="done"
                                    secureTextEntry
                                    style={styles.textInput}
                                    textContentType="password"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                            </KeyboardAvoidingView>

                        </View>
                    </Pressable>
                    <SizedBox height={16}/>

                    <SizedBox height={16}/>

                    <TouchableOpacity onPress={login}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <SizedBox height={20}/>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>
                                Register
                            </Text>
                        </View>
                    </TouchableOpacity>


                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
    );

};