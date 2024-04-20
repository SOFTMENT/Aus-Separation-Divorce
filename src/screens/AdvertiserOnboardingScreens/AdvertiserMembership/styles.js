import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { fontSizes, itemSizes, spacing } from "../../../common/variables";
import fonts from "../../../../assets/fonts";

export default StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor:colors.backgroundColor
    // },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        padding: spacing.medium,
        // paddingTop:insets.top
    },
    subText:{
        color:colors.black,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraLarge,
        marginTop:10
    },
    catText:{
        fontFamily:fonts.medium,
        fontSize:fontSizes.small,
        color:colors.black,
        marginLeft:5
    },
    icon:{
        width:itemSizes.item15,
        height:itemSizes.item15,

    },
    card:{
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
        marginHorizontal:10,
        borderRadius:10,
        elevation: 3,
        backgroundColor:"white",
        marginVertical:10,
        padding:10,
        paddingVertical:40,
        alignItems:"center"
    },
    subSubText:{
        color:"#969696",
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
        marginLeft:10
    },
    noteText:{
        color:"#767676",
        fontFamily:fonts.regular,
        fontSize:fontSizes.tiny,
        marginLeft:10,
        marginTop:10
    }
})