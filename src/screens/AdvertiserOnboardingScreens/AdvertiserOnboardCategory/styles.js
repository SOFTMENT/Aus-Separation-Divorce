import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { fontSizes, itemSizes, spacing } from "../../../common/variables";
import fonts from "../../../../assets/fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.backgroundColor
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        padding: spacing.medium,
        // paddingTop:insets.top
    },
    headline:{
        color:colors.black,
        fontFamily:fonts.medium,
        fontSize:fontSizes.small,
        marginBottom:20
    },
    catText:{
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraSmall,
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
        borderRadius:5,
        elevation: 3,
        backgroundColor:"white",
        marginVertical:10,
        padding:10

    }

})