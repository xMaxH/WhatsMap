import {Pressable, Text, View} from "react-native";
import { style1 } from "../Styles/style1";
import {ImageBackground} from "react-native";

export default function HomeScreen({navigation})
{
    const BackgroundImage1 = require("../assets/favicon.png");

    return (
        <View style={style1.container}>
            <Pressable>
                <Text onPress={() => navigation.navigate('Profile')} style={style1.btn1}>
                    Profile
                </Text>
                <Text onPress={() => navigation.navigate('Login')} style={style1.btn1}>
                    Login
                </Text>
                </Pressable>
        </View>
    )
}