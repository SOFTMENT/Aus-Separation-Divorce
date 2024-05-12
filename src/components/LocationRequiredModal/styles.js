import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { fontSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:colors.backgroundColor
    },
    title:{
        fontSize:fontSizes.large,
        fontFamily:fonts.bold,
        color:"black",
        textAlign:"center",
        marginHorizontal:50,
        marginTop:50
    },
    subtitle:{
        fontSize:fontSizes.small,
        fontFamily:fonts.regular,
        color:"black",
        textAlign:"center",
        marginHorizontal:50,
        marginTop:spacing.large
    },
    btn:{
        flex:0.45
    },
    notNow:{
        flex:0.45,
        borderColor:colors.appPrimary,
        borderWidth:1,
        backgroundColor:"white"
    }
})
export default styles