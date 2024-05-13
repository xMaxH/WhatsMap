import {StyleSheet} from "react-native";

const BG_COLOUR = "#30384B";
export const FG_COLOUR = "#22ECBC";
export const FG_COLOUR_MUTED = "#65a192";
export const RED_COLOUR = "#FF3232";

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
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
        },
    header2:
        {
            color: FG_COLOUR,
            marginTop: 60,
            marginBottom: 18,
            fontSize: 35,
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
            marginVertical: 8,
        },
    button_delete:
        {
            backgroundColor: RED_COLOUR,
            width: 275,
            height: 50,
            alignSelf: "center",
            borderRadius: 8,
            marginVertical: 8,
        },
    button_text:
        {
            color: BG_COLOUR,
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 45,
        },
    button_drawer:
        {
            flexDirection: "row",
            alignItems: 'center',
            backgroundColor: BG_COLOUR,
            borderRadius: 20,
            height: 60,
            width: 310,
            marginBottom: 30,
        },
    button_text_drawer:
        {
            alignSelf: "center",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold"
        },
    icon_drawer:
        {
            left: 30,
            marginRight: 50,
            fontSize: 35
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
    loading_overlay:
        {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
    modal_view:
        {
            margin: 20,
            backgroundColor: FG_COLOUR,
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
    modal_text:
        {
            fontSize: 25,
            fontWeight: 'bold',
            color: BG_COLOUR,
        },
    modal_sub_text:
        {
            alignContent:'center',
            fontSize: 15,
            fontWeight: 'bold',
            color: BG_COLOUR,
        },
});

const category_menu_style = StyleSheet.create({
    root:
        {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
        },
    modal_overlay:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    modal_view:
        {
            top: 170,
            width: 250,
            backgroundColor: BG_COLOUR,
            borderColor: FG_COLOUR,
            borderWidth: 1,
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
    option:
        {
            padding: 10,
            marginVertical: 5
        },
    button:
        {
            backgroundColor: FG_COLOUR,
            borderWidth: 0,
            borderRadius: 8,
            padding: 4,
            width: 250,
            alignItems: 'center'
        },
    choice_text:
        {
            fontSize: 25,
            fontWeight: "500",
            color: FG_COLOUR,
        }
});

const category_style = StyleSheet.create({
    root:
        {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor: 'transparent',
            position: 'absolute',
            borderWidth:1,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
        },
    scroll_view:
        {
            paddingHorizontal: 0,
            marginVertical:-10,
            height: 50,
        },
    button:
        {
            backgroundColor: '#ffffff',
            borderColor: 'black',
            borderWidth:2,
            padding: 10,
            width: 250,
            alignItems: 'center'
        },
    modal_view:
        {
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
    modal_option_box:
        {
            paddingVertical: 12, // Increase vertical padding
            paddingHorizontal: 10,
            backgroundColor: 'rgba(255,255,255,0.46)', // Very light transparent background
            borderRadius: 20,
            marginHorizontal: 5,
            borderWidth: 1,
            borderColor: 'rgb(135,206,235)', // Semi-transparent border
        },
    modal_option_box_selected:
        {
            backgroundColor: 'rgb(135,206,235)', // Visible but transparent
            borderColor: 'rgba(0, 0, 139, 0.6)', // Noticeably darker border for selected state
        },
    modal_text:
        {
            fontSize: 14,
            backgroundColor: 'transparent', // Ensure no background interrupts
            textAlign: 'center', // Center text if not already set
        },
    modal_overlay:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
});

const pin_style = StyleSheet.create({
    fs_overlay:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    header:
        {
            fontSize: 35,
            fontWeight: 'bold',
            color: FG_COLOUR,
        },
    header2:
        {
            alignContent:'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: FG_COLOUR,
        },
    row_style:
        {
            flexDirection: 'row',
        },
    space_between:
        {
            marginHorizontal: 10,
            marginTop: 5
        },
    modal_view:
        {
            margin: 20,
            backgroundColor: BG_COLOUR,
            borderColor: FG_COLOUR,
            borderWidth: 1,
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
    input_title:
        {
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: FG_COLOUR,
            padding: 10,
            width: 200,
            backgroundColor: BG_COLOUR,
            color: FG_COLOUR,
        },
    input_desc:
        {
            height: 90,
            margin: 12,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: FG_COLOUR,
            padding: 10,
            width: 250,
            backgroundColor: BG_COLOUR,
            color: FG_COLOUR,
        },
    button:
        {
            backgroundColor: FG_COLOUR,
            width: 75,
            height: 35,
            alignSelf: "center",
            borderRadius: 4,
            marginHorizontal: 10,
        },
    button_delete:
        {
            backgroundColor: RED_COLOUR,
            width: 75,
            height: 35,
            alignSelf: "center",
            borderRadius: 4,
            marginHorizontal: 10,
        },
    button_text:
        {
            color: BG_COLOUR,
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 32,
        },
});

export {styles, pin_style, category_style, category_menu_style};