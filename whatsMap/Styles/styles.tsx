import {StyleSheet} from "react-native";

const BG_COLOUR = "#30384B";
export const FG_COLOUR = "#22ECBC";
const RED_COLOUR = "#FF3232";

const styles = StyleSheet.create({
    root:
        {
            flex: 1,
            backgroundColor: BG_COLOUR
        },
    container:
        {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: BG_COLOUR,
            paddingHorizontal: 40,
        },
    body:
        {
            color: FG_COLOUR,
            fontSize: 16,
            textAlign: "center",
        },
    text_input:
        {
            color: FG_COLOUR,
            fontSize: 16,
            textAlign: "left",
        },
    text_input_container:
        {
            alignItems: 'center',
            backgroundColor: BG_COLOUR,
            flexDirection: 'row',
            height: 48,
            paddingHorizontal: 16,
        },
    header:
        {
            color: FG_COLOUR,
            marginTop: 70,
            marginBottom: 20,
            fontSize: 50,
            fontWeight: "bold",
            textAlign: "center",
        },
    button:
        {
            backgroundColor: FG_COLOUR,
            width: 275,
            height: 50,
            alignSelf: "center",
            borderRadius: 8,
        },
    button_text:
        {
            color: BG_COLOUR,
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 45,
        },
    line:
        {
            flex: 1,
            height: 2,
            backgroundColor: FG_COLOUR,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
    line_input:
        {
            flex: 1,
            height: 1,
            backgroundColor: FG_COLOUR,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 275,
            marginStart: 15
        },
});

export default styles;