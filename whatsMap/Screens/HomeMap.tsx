import {Pressable, Text, View} from "react-native";
import { style1 } from "../Styles/style1";
import {ImageBackground} from "react-native";

export default function HomeScreen({navigation})
{
    const BackgroundImage1 = require("../assets/favicon.png");

    return (
        <View style={style1.container}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
                <Text style={style1.text1}>
                    Profile
                </Text>
                </Pressable>
        </View>
    )
}