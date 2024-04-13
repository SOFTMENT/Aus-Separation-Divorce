import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, itemSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
        paddingBottom:spacing.large
    },
    areYou: {
        fontFamily: fonts.bold,
        fontSize: fontSizes.medium,
        textAlign: 'center',
        color: "white",
        //marginBottom:spacing.large
        marginTop: spacing.extraExtraLarge,
    },
    subText: {
        fontFamily: fonts.semiBold,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        fontSize: responsiveSize(11.5),
        textAlign: 'center',
        color: "white",
    },
    mainView:{
        padding: spacing.extraExtraLarge,
        paddingTop:0,
        flex:1,
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
         width:Util.getWidth(30), 
         aspectRatio:1,
         borderRadius: 200 
     },
    title:{
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.tiny,
        marginTop:spacing.mediumLarge,
        marginBottom:spacing.extraSmall,
    },
    upload:{
        color:colors.appPrimary,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraSmall,
        textAlign:"center"
    },
    uploadSub:{
        color:colors.grey,
        fontFamily:fonts.semiBold,
        fontSize:responsiveSize(10.5),
        textAlign:"center",
        marginTop:5
    }
})
export default styles