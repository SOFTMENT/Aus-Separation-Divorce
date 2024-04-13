import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    fTitle:{
        color:"black",
        fontFamily:fonts.bold,
        fontSize:fontSizes.small
    },
    filterText:{
        color:colors.appPrimary,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraExtraSmall,
    },
    subTitle:{
        color:"black",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        alignSelf:"flex-start",
        marginVertical:spacing.medium,
        //marginLeft:10
    }
})
export default styles