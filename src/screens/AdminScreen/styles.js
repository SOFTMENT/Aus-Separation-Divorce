import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { responsiveSize } from "../../common/util";
import { fontSizes, itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
        paddingHorizontal:spacing.medium
    },
    logout:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        tintColor:"#333"
    },
    logoutText:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        color:"black",
        marginRight:spacing.small
    },
    heading:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraSmall,
        color:"black",
    },
    logContainer:{
        flexDirection:'row',
        position:'absolute',
        right:0
       // alignItems:"center"
    },
    titleView:{
        width:"100%",
        //  paddingHorizontal:spacing.medium,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:spacing.medium,
       
    },
    title:{
        borderWidth:1,
        borderRadius:spacing.small,
        padding:spacing.medium,
        borderColor:colors.borderColor,
        color:"black",
        fontFamily:fonts.regular,
        marginVertical:10
    },
    message:{
        borderWidth:1,
        borderRadius:spacing.small,
        padding:spacing.medium,
        borderColor:colors.borderColor,
        color:"black",
        fontFamily:fonts.regular,
        height:100
    },
    item:{
        borderColor:colors.borderColor,
        borderWidth:1,  
        borderRadius:spacing.small,
        padding:spacing.medium,
        marginVertical:spacing.small
    },
    name:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraSmall,
        color:"black"
    },
    email:{
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
        marginTop:spacing.extraExtraSmall,
        color:"black"
    },
    btnView:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:spacing.medium
    },
    approve:{
        backgroundColor:"green",
        width:"40%",
        padding:spacing.small
    },
    reject:{
        backgroundColor:"red",
        width:"40%",
        padding:spacing.small
    },
})