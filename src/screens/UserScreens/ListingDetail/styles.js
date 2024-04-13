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
    imageContainerSmall:{
        borderRadius:spacing.small,
        backgroundColor:"rgba(255,255,255,0.9)",
        padding:spacing.small,
        marginHorizontal:3
    },
    imageContainer:{
        paddingVertical:spacing.large,
        borderRadius:spacing.large,
        backgroundColor:"rgba(255,0,0,0.1)",
        marginHorizontal:spacing.medium
    },
    imageSmall:{
        width:70,
        aspectRatio:1,
        borderRadius:spacing.extraSmall,
    },
    image:{
        width: "80%", aspectRatio: 1,
        borderRadius:spacing.medium,
        alignSelf:"center"
        //overflow:"hidden"
    },
    title:{
        color:"black",
        fontSize:fontSizes.small,
        fontFamily:fonts.bold,
        marginTop:20
    },
    subtitle:{
        color:"black",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    supplier:{
        color:"#898B91",
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
        color:"black",
        fontSize:responsiveSize(11),
        fontFamily:fonts.medium,
        lineHeight:20
    },
    desView:{
        padding:spacing.medium,
        backgroundColor:"rgba(255,0,0,0.1)",
        marginTop:10,
        borderRadius:spacing.small
    },
    btn:{
        position:"absolute",
        bottom:10
    }
})
export default styles