import {
    Text,
    View,
} from "react-native";
import React, {useState} from 'react';
import {style1} from "../Styles/style1";


export default function AboutUs() {
    return (
        <View style={style1.container}>
            <Text style={style1.textheader}>Welcome to WhatsMap! {"\n"}</Text>
            <Text style={style1.text}>It's an honor to have you on board. WhatsMap offers a great variations of user expirience{"\n"}</Text>
            <Text style={style1.text}>We work for your best expirience and make sure to pin it up haha{"\n"}</Text>
            <Text style={style1.text}>WhatsMap is a Google Map Api platform which where users can see other users pins post comments,
            and enjoy the stay!{"\n"}</Text>

        </View>
    )
}