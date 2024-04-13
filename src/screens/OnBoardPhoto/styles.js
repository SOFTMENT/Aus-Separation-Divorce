import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { fontSizes, itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

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
        fontFamily: fonts.medium,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        fontSize: fontSizes.small,
        textAlign: 'left',
        color: "black",
    },
    mainView:{
        padding: spacing.medium,
        paddingTop:0,
        flex:1,
    },
    topView:{
        //backgroundColor:"#202020",
        //width:Util.getWidth(50),
        //aspectRatio:1,
        width:"100%",
        alignItems:"center",
        flexDirection:"row",
        padding:15,
        borderWidth:1,
        borderColor:colors.borderColor,
        borderRadius:spacing.extraSmall
     },
     insideView:{
         //width:Util.getWidth(40),
         aspectRatio:1,
         //alignSelf:"flex-",
         justifyContent:"center",
         alignItems:"center",
         padding:0,
         borderWidth: 1, 
         borderColor: colors.appPrimary, 
         borderRadius: 200 
     },
     image:{ 
         width:Util.getWidth(20), 
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
        color:colors.black,
        fontFamily:fonts.medium,
        fontSize:fontSizes.small,
        textAlign:"center",
        marginLeft:5
    },
    uploadSub:{
        color:colors.appDefaultColor,
        fontFamily:fonts.semiBold,
        fontSize:responsiveSize(10.5),
        textAlign:"center",
        marginTop:5
    }
})
export default styles