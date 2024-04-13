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
        color:'rgba(0,0,0,0.7)',
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular,
        marginVertical:3
    },
    noItem:{
        color:colors.white,
        fontFamily:fonts.regular,
        textAlign:"center"
    }
})
export default styles