import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { fontSizes, itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.backgroundColor,
        paddingHorizontal:spacing.medium
        //padding:spacing.large
    },
    header:{
        position:"absolute"
    },
    // loginBack:{
    //     flexDirection:"row",
    //     height:Util.getHeight(25),
    //     //backgroundColor:colors.black,
    //     alignItems:"center",
    //     marginHorizontal:25,
    // },
    siteSee:{
        height:"100%"
    },
    login:{
        fontFamily:fonts.bold,
        color:colors.blackText,
        fontSize:fontSizes.medium,
    },
    loginSmall:{
        fontFamily:fonts.light,
        color:colors.blackText,
        fontSize:fontSizes.extraExtraSmall,
        marginTop:5
    },
    mainView:{ 
        paddingTop:spacing.large,
        minHeight:Util.getHeight(70) 
    },
    // onboardImage:{
    //     width:"80%",
    //    // height:"80%",
    //    // backgroundColor:"red"
    // },
    // imageView:{
    //     width:Util.getWidth(100),
    //     height:Util.getHeight(40), 
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    // bottomView:{
    //     flex:1,
    //     borderTopLeftRadius:spacing.extraExtraLarge,
    //     borderTopRightRadius:spacing.extraExtraLarge,
    //     backgroundColor:'white',
    //     padding:spacing.extraLarge
    // },
    areYou:{
        fontFamily:fonts.bold,
        fontSize:fontSizes.large,
        textAlign:'left',
        color:"black",
        marginBottom:spacing.medium
       // marginTop:spacing.extraExtraLarge,
    },
    subText:{
        fontFamily:fonts.semiBold,
        marginTop:spacing.semiMedium,
        marginBottom:spacing.extraExtraLarge,
        fontSize:responsiveSize(11.5),
        textAlign:'center',
        color:"white",
    },
    btn:{
        marginTop:spacing.medium,
        borderRadius:spacing.extraSmall,
    },
    or:{
        color:colors.black,
        textAlign:"center",
        marginVertical:spacing.large,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraExtraSmall,
        marginHorizontal:spacing.extraExtraSmall
    },
    register:{
        color:colors.grey,
        textAlign:"center",
        marginVertical:spacing.extraExtraLarge,
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
        marginHorizontal:spacing.small
    },
    forgot:{ 
        marginVertical:spacing.small,
        marginHorizontal: spacing.small, 
        color: colors.borderColor ,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        textAlign:"right",
        // borderBottomColor:colors.borderColor,
        // borderBottomWidth:7,
    },
    borderViewContainer:{
     width:"100%",
     alignItems:"center",
     flexDirection:"row",
     marginVertical:20
     //backgroundColor:'red'
    },
    borderView:{
     height:0.5,
     flex:1,
    // width:"100%",
     backgroundColor:"gray",
     
    },
    socialView:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    btnContainer:{ 
        marginHorizontal: spacing.extraLarge,
        backgroundColor:"white",
        padding:spacing.semiMedium,
        borderRadius:spacing.small
    },
    icon:{
        width:itemSizes.item20,
        height:itemSizes.item20
    },
    socialBtn:{ backgroundColor: colors.darkGreyBtn, flex: 1 }
})