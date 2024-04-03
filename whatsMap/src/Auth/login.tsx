import React from "react"
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import SizedBox from "../components/SizedBox";
import loginStyle from "../../Styles/authStyle";

function LoginFunc() {
    const styles = loginStyle
    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.content}
                >
                    <Text style={styles.title}>Login</Text>

                    <SizedBox height={100} />


                    <TouchableOpacity>
                        <View style={styles.buttonGoogle}>
                            <Text >Login with google</Text>
                        </View>
                    </TouchableOpacity>

                    <SizedBox height={50} />

                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                        <Text style={styles.text}>x</Text>
                        <View style={styles.line} />
                    </View>

                    <SizedBox height={50} />
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
                            />
                        </View>
                    </Pressable>

                    <SizedBox height={16} />

                    <Pressable>
                        <View style={styles.form}>
                            <Text style={styles.label}>Password</Text>

                            <TextInput
                                autoCapitalize="none"
                                //autoCompleteType="password"
                                autoCorrect={false}
                                returnKeyType="done"
                                secureTextEntry
                                style={styles.textInput}
                                textContentType="password"
                            />
                        </View>
                    </Pressable>

                    <SizedBox height={16} />

                    <View style={styles.forgotPasswordContainer}>
                        <Text style={styles.textButton}>Forgot password?</Text>
                    </View>

                    <SizedBox height={16} />

                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

export default LoginFunc;