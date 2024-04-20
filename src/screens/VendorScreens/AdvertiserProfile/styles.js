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
       backgroundColor:"#C4E7E5",
    //    height:Util.getHeight(20),
    paddingBottom:20,
       width:"100%",
       flexDirection:"row",
       paddingHorizontal:spacing.medium,
       alignItems:"center"
    },
    userProfile:{
        borderColor:"white",
        borderWidth:3,
        alignSelf:"center",
        borderRadius:40,
        // bottom:-Util.getHeight(20)+20,
        // position:"relative",
       
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
        width:80,
        height:80,
        borderRadius:40,
    },
    name:{
        fontSize:fontSizes.medium,
        fontFamily:fonts.medium,
        color:"black",
        textAlign:"left",
        width:"100%",
       
    },
    email:{
        fontSize:responsiveSize(11),
        fontFamily:fonts.medium,
        color:"#888888",
        marginTop:spacing.extraExtraSmall,
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