import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    mainView:{
        padding:spacing.medium,
        paddingTop:0
    },
    thumbnailView:{
        borderColor:colors.borderColor,
        borderWidth:1,
        borderRadius:spacing.small,
        aspectRatio:16/9,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:spacing.extraSmall,
        overflow:"hidden",
        width:"100%"
    },
    updateText:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    title:{
        color:"black",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.regular,
        marginVertical:10
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
    }
})
export default styles