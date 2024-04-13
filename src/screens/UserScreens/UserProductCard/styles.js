import { StyleSheet } from "react-native";
import { fontSizes, spacing } from "../../../common/variables";
import fonts from "../../../../assets/fonts";
import colors from "../../../theme/colors";
import { responsiveSize } from "../../../common/util";

const styles =  StyleSheet.create({
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
        fontFamily:fonts.regular,
        fontSize:responsiveSize(10.5),
        marginTop:4
    }
})
export default styles