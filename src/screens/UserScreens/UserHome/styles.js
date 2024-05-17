import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        //backgroundColor:colors.backgroundColor,
        padding:spacing.medium,
       // paddingTop:insets.top
    },
    noSpaces:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    topView:{
        flexDirection:"row",
        //justifyContent:"space-between",
        alignItems:"center"
    },
    hello:{
        color:"black",
        fontSize:responsiveSize(16),
        fontFamily:fonts.medium,
        width:"95%",
    },
    name:{
        color:"black",
        fontSize:responsiveSize(16),
        fontFamily:fonts.medium
    },
    searchBox:{
        // borderWidth:1,
        // borderColor:colors.borderColor,
        backgroundColor:"rgb(230,230,230)",
        borderRadius:spacing.small,
        padding:spacing.medium,
        marginVertical:spacing.medium,
        flexDirection:"row",
        alignItems:"center",
        flex:1,
    },
    placeholder:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    filterView:{
        justifyContent:"center",
        alignItems:"center",
        padding:spacing.medium,
        borderRadius:spacing.small,
        borderWidth:1,
        borderColor:colors.borderColor,
    },
    imageStyle:{
        width:Util.getWidth(90),
        aspectRatio:16/9,
        borderRadius:spacing.small,
        marginRight:10
    },
    detailsView:{
        alignSelf:"baseline",
        backgroundColor:"rgba(255, 255, 255, 0.9)",
        margin:10,
        padding:spacing.small,
        borderRadius:spacing.extraSmall,
        maxWidth:"80%"
    },
    spaceTitle:{
        color:"black",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold
    },
    subtitle:{
        color:"black",
        fontSize:fontSizes.tiny,
        fontFamily:fonts.regular
    },
    category:{
        color:"white",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.semiBold,
        textAlign:'center',
    },
    categoryView:{
        borderWidth:1,
        borderColor:"rgba(0, 0, 0, 0.26)",
        marginRight:spacing.small,
        width:130,
        height:130,
        // paddingHorizontal:spacing.extraExtraSmall,
        // paddingVertical:spacing.medium,
        borderRadius:16,
        justifyContent:"center",
        alignContent:"center",
        
    },
    categoryImage:{
        aspectRatio:1,
        borderRadius:16,
    },
    categoryTextView:{
        position:"absolute",
        bottom:0,
        padding:5,
        alignItems:"center",
        backgroundColor:'#b9b5b1',
        width:"100%",
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15
    }
})
export default styles