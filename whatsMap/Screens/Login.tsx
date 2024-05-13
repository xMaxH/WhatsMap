import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Alert
} from "react-native";
import styles, {FG_COLOUR_MUTED} from "../Styles/styles";
import SizedBox from "../Styles/SizedBox";
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import React, {useState} from 'react';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function that handles the login for users
    const login = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully');
            navigation.navigate('Home');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                Alert.alert(
                    'Login Error',
                    'Either register a user or check your credentials.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            }
        }
    };

    return (
        <ScrollView style={styles.root}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={styles.header}>Login</Text>

                    <View style={styles.line}></View>

                    <SizedBox height={75}/>

                    <Pressable>
                        <View style={styles.text_input_container}>
                            <KeyboardAvoidingView
                                style={{flex: 1}}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <TextInput
                                    autoCapitalize="none"
                                    placeholder={"Email"}
                                    placeholderTextColor={FG_COLOUR_MUTED}
                                    // autoCompleteType="email"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    style={styles.text_input}
                                    textContentType="username"
                                    value={email}
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
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                                <TextInput
                                    placeholder={"Password"}
                                    placeholderTextColor={FG_COLOUR_MUTED}
                                    autoCapitalize="none"
                                    //autoCompleteType="password"
                                    autoCorrect={false}
                                    returnKeyType="done"
                                    secureTextEntry
                                    style={styles.text_input}
                                    textContentType="password"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                            </KeyboardAvoidingView>

                        </View>
                    </Pressable>
                    <View style={styles.line_input}></View>

                    <SizedBox height={32}/>

                    <TouchableOpacity onPress={login}>
                        <View style={styles.button}>
                            <Text style={styles.button_text}>Login</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                        <View style={styles.button}>
                            <Text style={styles.button_text}>
                                Register
                            </Text>
                        </View>
                    </TouchableOpacity>


                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
    );

};