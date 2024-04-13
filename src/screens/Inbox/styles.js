import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { fontSizes } from "../../common/variables";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    noData: {
        color: "white",
        fontFamily: fonts.semiBold
    },
    rightBox: {
        flexDirection: "row",
        flex:1,
    },
    chatBox: {
        flexDirection:"column",
        alignItems: "flex-start",
        justifyContent:"center",
        paddingLeft: 14,
        flex:1,
    },
    item: {
        // backgroundColor: 'pink',
        // padding: 20,
        marginVertical: 3,
        marginHorizontal: 7,
        alignItems: "center",
        paddingVertical:10,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 13,
        borderBottomWidth: 0.4,
        borderBottomColor: colors.borderColor
    },
    title: {
        fontFamily:fonts.semiBold,
        fontSize: fontSizes.extraSmall,
        color: "black",
    },
    text: {
        color: "rgba(0,0,0,0.5)",
        fontSize: fontSizes.extraExtraSmall,
        fontFamily: fonts.medium,
        letterSpacing: 1,
        width:"100%",
        marginTop:3
    },
    smallTxt: {
        color: "rgba(0,0,0,0.5)",
        fontSize: 10,
        // fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 10
    },
    header: {
        flexDirection: "row",
        backgroundColor: '#242424',
        width: "100%",
        height: 70,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        //marginTop:5

    },
})
export default styles