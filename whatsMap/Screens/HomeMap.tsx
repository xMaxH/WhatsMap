import {Pressable, Text, View} from "react-native";
import { style1 } from "../Styles/style1";

export default function HomeScreen({navigation})
{

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