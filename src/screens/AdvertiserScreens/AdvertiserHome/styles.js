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
        borderRadius:spacing.medium,
    },
    imageContainer:{
        //paddingVertical:spacing.large,
        borderRadius:spacing.large,
        marginHorizontal:spacing.medium,
        marginTop:10,
        flexDirection:"row",
        alignItems:"center"
    },
    imageSmall:{
        aspectRatio:16/9,
        borderRadius:spacing.semiMedium,
    },
    profileImage:{
        width:80,
        height:80,
        borderRadius:50
    },
    image:{
        width: "100%", aspectRatio: 16 / 9,
        borderRadius:spacing.medium,
        //overflow:"hidden"
    },
    title:{
        color:"black",
        fontSize:fontSizes.small,
        fontFamily:fonts.bold,
        textAlign:'left',
    },
    subtitle:{
        color:"#7E7D7D",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.regular
    },
    supplier:{
        color:"#898B91",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    des:{
        color:"black",
        fontSize:fontSizes.small,
        fontFamily:fonts.medium,
        marginTop:20
    },
    about:{
        color:"#A7A7A7",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.regular,
        lineHeight:20
    },
    desView:{
        // padding:spacing.medium,
        // backgroundColor:"rgba(255,0,0,0.1)",
        marginTop:10,
        // borderRadius:spacing.small
    },
    btn:{
        position:"absolute",
        bottom:10
    },
    backImage:{
        width:"100%",
        aspectRatio:16/9,
        // borderRadius:20,
        borderTopEndRadius:40,
        borderTopStartRadius:40,
    },
    moreText:{
        position:"absolute",
        fontFamily:fonts.medium,
        color:"black",
        right:20,
        bottom:20,
    }
})
export default styles