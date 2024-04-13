import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    mainView:{
        flex:1,
        padding:spacing.medium
    },
    balance:{
        fontFamily:fonts.semiBold,
        color:"white",
        fontSize:fontSizes.medium
    },
    heading:{
        fontFamily:fonts.medium,
        color:"white",
        fontSize:fontSizes.extraSmall
    },
    value:{
        fontFamily:fonts.regular,
        color:"black",
        fontSize:fontSizes.extraExtraSmall,
        flex:1,
        textAlign:"center"
    },
    transaction:{
        fontFamily:fonts.semiBold,
        color:"black",
        fontSize:fontSizes.small,
        marginVertical:spacing.medium,
        marginLeft:5
    },
    
})
export default styles