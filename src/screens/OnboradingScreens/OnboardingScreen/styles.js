import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.large,
        paddingTop:0,
        paddingHorizontal:0,
        backgroundColor: colors.backgroundColor,
    },
    logo: {
        height: 400,
        //height: 200,
    },
    siteSee: {
        height: 35,
    },
    logoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnView:{
        flex:0.4,
        width:"100%",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    btn:{
        marginHorizontal:spacing.small,
        backgroundColor:"white",
        borderColor:colors.appPrimary,
        borderWidth:1
    },
    areyou:{
        color:colors.black,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.medium,
        marginBottom:10
    }

})
export default styles