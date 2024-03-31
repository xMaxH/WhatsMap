import {Button, Pressable, Text, TextInput, TextInputComponent, View} from "react-native";
import { style1 } from "../Styles/style1";
import {ImageBackground} from "react-native";

//Funksjon for loginn
function login() {
    console.log("Loginn")

}

export default function Login({navigation})
{
    return (
        <View style={style1.container}>
            <TextInput style={style1.textInput}>Username</TextInput>
            <TextInput style={style1.textInput} secureTextEntry={true}>Password</TextInput>
            <Pressable onPress={login}><Text style={style1.text1}>Login</Text></Pressable>

            <Text onPress={() => navigation.navigate('Register')} style={style1.btn1}>
            Register
        </Text>
        </View>
    );
}