import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
    },
    mainView:{
        padding:spacing.medium,
        paddingTop:0
    },
    thumbnailView:{
        // borderColor:colors.borderColor,
        // borderWidth:1,
        borderRadius:spacing.small,
        width:300,
        aspectRatio:16/9,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:spacing.extraSmall,
        overflow:"hidden",
        backgroundColor:colors.white,
        alignSelf:"center",
        borderWidth:1,
        borderColor:colors.borderColor
    },
    updateText:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    title:{
        color:"black",
        fontFamily: fonts.medium,
        fontSize: fontSizes.extraExtraSmall,
        marginBottom:spacing.small,
        marginTop:20
    },
    subtitle:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular,
        marginTop:spacing.small
    },
    datePicker:{
        borderRadius:spacing.small,
        borderColor:colors.borderColor,
        borderWidth:1,
        padding:12,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    txt:{
        color:"gray",
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
        width:"80%"
    },
    addmore:{
        width:100,
        aspectRatio:16/9,
        borderRadius:5,
        backgroundColor:colors.whiteDark,
        borderWidth:1,
        borderColor:"gray",
        justifyContent:"center",
        alignItems:'center',
        marginTop:5,
        overflow:"hidden",
        marginRight:10
    }
})
export default styles