import {StyleSheet, Dimensions} from "react-native";


const { height: screenY } = Dimensions.get("window");

const style1 = StyleSheet.create({

    container:
        {

            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:"#BEDFED"
        },

    textInput:
        {
            width:300,
            borderWidth:0,
            borderTopWidth:3,
            fontSize:30,
            borderColor:"black",
            backgroundColor:"lightblue",
            color:"black"
        },

    btn1:{
        backgroundColor:"blue",
        color:"red",
        fontSize:25,
        borderTopWidth:3,
        borderColor:"black"
    },

    text1:{
        color: "cyan",
        fontSize:20,
    }


});


const pinModal = StyleSheet.create(
    {
        fullScreenOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '80%',
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 250,
        },
        // Other styles...
    });

export {pinModal, style1}