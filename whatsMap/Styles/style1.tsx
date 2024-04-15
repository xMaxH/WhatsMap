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
        backgroundColor:"lightblue",
        color:"red",
        fontSize:25,
        width: 100,
        height:40,
        //borderTopWidth:3,
        //borderColor:"black"
    },

    text1:{
        color: "black",
        fontSize:20,
        height: 350,
    },
    text2:{
        textAlign:"center",
    },

    Logoutbtn: {
        alignItems: 'center',
        backgroundColor: '#4882C5',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
    },

    loadingOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


const pinModal = StyleSheet.create(
    {
        fullScreenOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        titletext: {
            fontSize: 35,
            fontWeight: 'bold',
        },
        subtitletext: {
            fontSize: 15,
            fontWeight: 'bold',
        },
        buttonsavecanellineup: {
            flexDirection: 'row',
            //justifyContent: 'space-between',
        },
        buttonspacebetween: {
            marginHorizontal: 10,
            marginTop: 5
        },
        iconpin: {
            flexDirection: "row",
        },
        modalView: {
            margin: 20,
            backgroundColor: "#BEDFED",
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
        inputdescription: {
            height: 90,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 250,
            backgroundColor: 'white',
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 250,
            backgroundColor: 'white',
        },


        // Other styles...
    });
export {pinModal, style1}