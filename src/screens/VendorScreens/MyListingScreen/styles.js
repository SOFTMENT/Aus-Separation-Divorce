import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { fontSizes, spacing } from "../../../common/variables";
import fonts from "../../../../assets/fonts";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    img:{
        width:"100%",
        aspectRatio:1,
        borderRadius:spacing.semiMedium
    },
    title:{
        color:colors.black,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraSmall
    },
    name:{
        color:colors.black,
        fontFamily:fonts.medium,
        fontFamily:fonts.regular
    },
    noItem:{
        color:colors.white,
        fontFamily:fonts.regular,
        textAlign:"center"
    },
    address:{
        color:colors.appDefaultColor,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraSmall,
        marginHorizontal:spacing.medium
    }
})
export default styles