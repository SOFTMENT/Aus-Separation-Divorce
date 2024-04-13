import { Platform, StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { responsiveSize } from "../../common/util";
import { itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    settingsText:{
        backgroundColor:"black",
        paddingVertical:Platform.OS=="ios"?spacing.semiMedium:spacing.small,
        paddingLeft:spacing.medium,
        fontSize:responsiveSize(13),
        fontFamily:fonts.medium,
        color:"white"
     },
     subMenu:{
        flexDirection:"row",
        alignItems:"center",
       //backgroundColor:"red",
        marginVertical:Platform.OS=="ios"?spacing.mediumLarge:spacing.medium,
        paddingHorizontal:spacing.mediumLarge
     },
     subMenuImage:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        tintColor:colors.appPrimary
     },
     subMenuTitle:{
        fontSize:responsiveSize(13),
        fontFamily:fonts.regular,
        color:"black",
     },
     subMenuContainer:{
         flex:1,
         marginLeft:spacing.mediumLarge,
         flexDirection:"row",
         justifyContent:"space-between"
     },
     subsubtitle:{
         marginTop:spacing.extraExtraSmall,
         fontSize:responsiveSize(11),
         fontFamily:fonts.regular,
         color:"rgba(0, 0, 0, 0.67)",
         marginRight:spacing.small,
         textAlignVertical:"bottom"
     },
     subImage:{
        width:itemSizes.item12,
        height:itemSizes.item12
     },
     subsubView:{
        flexDirection:"row",
         alignItems:"center"
      }
})