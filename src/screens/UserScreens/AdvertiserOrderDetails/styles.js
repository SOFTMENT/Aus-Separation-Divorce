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
    image:{
        width: "100%", aspectRatio: 16 / 9,
        borderRadius:spacing.medium,
        //overflow:"hidden"
    },
    subtitle:{
        color:"black",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    des:{
        color:"black",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold,
        marginTop:20
    },
    about:{
        color:"rgba(0, 0, 0, 0.45)",
        fontSize:responsiveSize(12),
        fontFamily:fonts.regular,
        marginTop:10,
        lineHeight:20
    },
    btn:{
        position:"absolute",
        bottom:10
    }
})
export default styles