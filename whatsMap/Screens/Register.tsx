import {Pressable, Text, TextInput, TextInputComponent, View} from "react-native";
import { style1 } from "../Styles/style1";
import {ImageBackground} from "react-native";

export default function Register({navigation})
{
    return (
        <View style={style1.container}>
            <TextInput style={style1.textInput}>Username</TextInput>
            <TextInput style={style1.textInput}>Password</TextInput>

            <Text onPress={() => navigation.navigate('Register')} style={style1.text1}>
                Register
            </Text>
        </View>
    );
}