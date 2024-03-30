    import {StyleSheet, Dimensions} from "react-native";


    const { height: screenY } = Dimensions.get("window");

    const style1 = StyleSheet.create({

        container:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',            },

        text1:
        {
            fontSize:15,
            color:"red"
        }


    });

    export {style1}