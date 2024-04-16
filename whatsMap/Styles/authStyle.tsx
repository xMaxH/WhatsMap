import {StyleSheet} from "react-native";

function authStyles() {
    return StyleSheet.create({
        textButtonDrawer: {
            alignSelf: "center",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold"
        },
        iconButtonDrawer: {
            left: 30,
            marginRight: 50,
            fontSize: 35
        },
        buttonDrawer: {
            flexDirection: "row",
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            height: 60,
            width: 310,
            marginBottom: 30,
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            height: 48,
            justifyContent: 'center',
        },
        buttonGoogle: {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            height: 48,
            justifyContent: 'center',
        },
        buttonTitle: {
            color: '#000',
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 22,
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 32,
        },
        forgotPasswordContainer: {
            alignItems: 'flex-end',
        },
        form: {
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            flexDirection: 'row',
            height: 48,
            paddingHorizontal: 16,
        },
        label: {
            color: '#000',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 20,
            width: 80,
        },
        root: {
            backgroundColor: '#BEDFED',
            flex: 1
        },
        safeAreaView: {
            flex: 1,
        },
        subtitle: {
            color: 'rgba(235, 235, 245, 0.6)',
            fontSize: 17,
            fontWeight: '400',
            lineHeight: 22,
        },
        textButton: {
            color: '#000',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 20,
        },
        textInput: {
            color: '#000',
            flex: 1,
        },
        title: {
            color: '#000000',
            fontSize: 30,
            alignSelf: 'center',
        },
        lineContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        line: {
            flex: 1,
            height: 1,
            backgroundColor: 'black',
        },
        text: {
            paddingHorizontal: 10,
        },
    });
}

export default authStyles()