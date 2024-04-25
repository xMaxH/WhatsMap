import {StyleSheet} from "react-native";

export const stylesCategory = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalView: {
        top: 170,
        width: 250,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    option: {
        padding: 10,
        marginVertical: 5
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#DDD',
        padding: 10,
        width: 200,
        alignItems: 'center'
    },
    text:{
        fontSize: 25,
        fontWeight: "500"
    }
});