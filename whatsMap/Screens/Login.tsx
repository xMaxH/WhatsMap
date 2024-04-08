import {
    Button,
    KeyboardAvoidingView, Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TextInputComponent, TouchableOpacity,
    View,
    KeyboardAvoidingViewProps, KeyboardAvoidingViewBase, KeyboardAvoidingViewComponent
} from "react-native";
import loginStyle from "../Styles/authStyle";
import SizedBox from "../Styles/SizedBox";
import {app} from "../firebaseConfig";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const styles = loginStyle
    const login = async () => {
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in successfully");
            navigation.navigate('MAP');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <SizedBox height={100}/>


                    <TouchableOpacity>
                        <View style={styles.buttonGoogle}>
                            <Text>Login with google</Text>
                        </View>
                    </TouchableOpacity>

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

                    <View style={styles.forgotPasswordContainer}>
                        <Text style={styles.textButton}>Forgot password?</Text>
                    </View>

                    <SizedBox height={16}/>

                    <TouchableOpacity onPress={login}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <SizedBox height={20}/>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>
                                Register
                            </Text>
                        </View>
                    </TouchableOpacity>


                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
        ;
}