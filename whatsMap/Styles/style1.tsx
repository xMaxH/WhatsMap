    import {StyleSheet, Dimensions} from "react-native";


    const { height: screenY } = Dimensions.get("window");

    const style1 = StyleSheet.create({

        container:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:"black"
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

    export {style1}