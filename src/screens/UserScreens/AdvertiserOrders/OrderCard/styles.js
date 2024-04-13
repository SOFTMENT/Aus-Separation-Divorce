import { StyleSheet } from "react-native";
import fonts from "../../../../../assets/fonts";
import { responsiveSize } from "../../../../common/util";
import { fontSizes, spacing } from "../../../../common/variables";
import colors from "../../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        //flex:1,
        backgroundColor:colors.backgroundColor,
        marginBottom:5
    },
    image:{
        height:"100%",
        borderRadius:3.84,
        //width:200
        flex:0.4
    },
    mainView : {
        paddingHorizontal:spacing.medium
    },
    card:{
        padding:5,
        marginVertical:4,
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 1,
        // borderWidth:1,
        // borderColor:colors.borderColor,
        borderRadius:5
    },
    title:{
        fontFamily:fonts.semiBold,
        color:"black",
        fontSize:fontSizes.extraSmall
    },
    subtitle:{
        color:"black",
        fontSize:responsiveSize(10.5),
        fontFamily:fonts.regular
    },
    approve:{
        backgroundColor:"green",
        width:"40%",
        padding:spacing.small
    },
    reject:{
        backgroundColor:"red",
        width:"40%",
        padding:spacing.small
    },
})
export default styles