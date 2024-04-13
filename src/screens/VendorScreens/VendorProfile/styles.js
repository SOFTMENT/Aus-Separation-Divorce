import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

export default StyleSheet.create({
    container:{
        backgroundColor:colors.backgroundColor,
        flex:1
    },
    topView:{
       //backgroundColor:"#202020",
       width:Util.getWidth(50),
       aspectRatio:1,
       alignSelf:"center",
       justifyContent:"center",
       alignItems:"center",
       padding:20,
       borderRadius:200,
       borderWidth:4,
       borderColor:'rgba(239, 51, 65, 0.03)'
    },
    insideView:{
        width:Util.getWidth(40),
        aspectRatio:1,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        padding:20,
        borderRadius:200,
        borderWidth: 3, 
        borderColor: "rgba(185, 41, 106, 0.17)", 
        borderRadius: 200 
    },
    image:{ 
        width:Util.getWidth(15), 
        aspectRatio:1,
        borderRadius: 200 
    },
    name:{
        fontSize:fontSizes.medium,
        fontFamily:fonts.semiBold,
        color:"black",
        textAlign:"left"
    },
    email:{
        fontSize:responsiveSize(11),
        fontFamily:fonts.medium,
        color:"black",
        marginTop:spacing.extraExtraSmall,
        marginBottom:spacing.small,
    },
    orderView:{
        backgroundColor:colors.appPrimary,
        padding:spacing.medium,
        marginHorizontal:spacing.mediumLarge,
        borderRadius:spacing.small
    },
    value:{
        textAlign:"center",
        fontSize:fontSizes.medium,
        fontFamily:fonts.bold,
        color:"black",
    },
    title:{
        textAlign:"center",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.medium,
        color:"black",
    },
    emailLight:{
        fontSize:responsiveSize(10.5),marginLeft:5,
        fontFamily:fonts.light,
    },
    tap:{
        fontSize:fontSizes.extraExtraSmall,
        color:colors.appDefaultColor,
        marginTop:2,
        fontFamily:fonts.light
    }
})