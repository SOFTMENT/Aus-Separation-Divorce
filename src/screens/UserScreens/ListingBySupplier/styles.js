import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { responsiveSize } from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    
    supplier:{
        color:"#898B91",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular,
        marginVertical:2
    },
    img:{
        width:"100%",
        aspectRatio:1,
        borderRadius:spacing.semiMedium
    },
    title:{
        color:colors.white,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraSmall,
    },
    product:{
        color:colors.white,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraExtraSmall,
    },
    name:{
        color:colors.black,
        fontFamily:fonts.medium,
        fontSize:fontSizes.small,
        marginTop:10
    },
    btn:{
        position:"absolute",
        bottom:10
    }
})
export default styles