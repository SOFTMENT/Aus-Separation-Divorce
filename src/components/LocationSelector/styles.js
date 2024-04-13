import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container:{
        flexGrow:1,
        alignItems:"center",
        justifyContent: 'center',
        backgroundColor:colors.modalBackgraound,
       
    },
    modal:{
        width:Util.getWidth(90),
        flex:0,
        backgroundColor:colors.backgroundColor,
        paddingTop:spacing.large,
        paddingBottom:spacing.mediumLarge,
        paddingHorizontal:spacing.mediumLarge,
        borderRadius:spacing.small,
        overflow:"hidden"
    },
    headingView:{
        flex:0,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-start",
        zIndex:1
    },
    crossIconContainer:{
        width:itemSizes.item15,
        aspectRatio:1,
    },
    crossImage:{
        flex:1,
        width:undefined,
        height:undefined,
        tintColor:colors.greyText
     },
     cityView:{
         backgroundColor:colors.appDefaultColor,
         paddingHorizontal:spacing.small,
         paddingVertical:spacing.medium,
         borderRadius:spacing.small,
        shadowColor: '#000',
         shadowOffset: {
           width: 0,
           height: 0
         },
         shadowOpacity: 0.3,
         shadowRadius: 1,
         elevation:1,
         marginVertical:spacing.extraSmall,
         marginHorizontal:spacing.extraExtraSmall
     },
     labelStyle:{
        color:colors.greyText,
        fontFamily:fonts.semiBold,
        fontSize:responsiveSize(13),
        includeFontPadding:false,
       
    },
    mapView:{
        width:"100%",
        height:Util.getHeight(45),
        marginTop:spacing.small,
        borderRadius:spacing.small,
        //zIndex:1
    },
    autoCompleteStyles:{
        container:{
            borderRadius: spacing.small,
            borderWidth:1,
            //backgroundColor:"green",
            paddingHorizontal:spacing.extraSmall,
            marginRight:spacing.semiMedium,
            borderColor: colors.borderColor,
            zIndex:1000,
            //alignItems: "center",
        },
        textInput:{
            backgroundColor: "transparent",
            color:"black",
            fontFamily:fonts.regular,
            fontSize:responsiveSize(12),
        },
         listView:{
            width:Util.getWidth(82),
            backgroundColor:colors.backgroundColor,
            padding: spacing.medium,
            paddingBottom:10,
            borderRadius:spacing.extraExtraSmall,
            position:"absolute",
            top:Util.getHeight(6),
            left:-2,
            zIndex:1000,
         },
         separator:{
         backgroundColor:"gray"
         },
         row:{
           backgroundColor:"white",
           color:"black",
           borderRadius:spacing.extraSmall,
           marginBottom:spacing.extraSmall,
           paddingHorizontal:10,
           zIndex:1000,
         },
         description:{
             color:"black",
             fontSize:responsiveSize(12),
             noWrap:true
         }
         
      },
    confirmBtn:{
        width:"100%",
        backgroundColor:colors.btnColor,
        borderRadius:spacing.small,
        //paddingVertical:spacing.semiMedium,
        marginTop:spacing.medium
    },
     confirmBtnTxt:{
          color:"black",
          fontSize:responsiveSize(13),
          fontFamily:fonts.medium,
     },
   
   
})