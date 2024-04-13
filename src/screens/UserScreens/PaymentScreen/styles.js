import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    mainView:{
       paddingHorizontal:spacing.medium
    },
    cardView:{
        width:"100%",
        height:Util.getHeight(7),
        // borderWidth:10,
        // borderColor:colors.borderColor,
         borderRadius:spacing.small,
         borderWidth:1,
         borderColor:colors.borderColor,
    },
     cardInner:{
        backgroundColor:colors.borderColor,
        textColor:"black",
        borderRadius:spacing.small,
        fontSize:responsiveSize(13),
        fontFamily:fonts.medium,
        placeholderColor:"black",
       
    },
    title:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.small,
        color:"gray",
        marginBottom:spacing.extraSmall
    },
    amount:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        color:"white"
    },
    borderViewContainer: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        //backgroundColor:'red'
    },
    borderView: {
        height: 0.5,
        flex: 1,
        // width:"100%",
        backgroundColor: "grey",
    },
    or: {
        color: colors.btnColor,
        textAlign: "center",
        marginVertical: spacing.extraExtraLarge,
        fontFamily: fonts.regular,
        fontSize: fontSizes.extraExtraSmall,
        marginHorizontal: spacing.small
    },
})
export default styles