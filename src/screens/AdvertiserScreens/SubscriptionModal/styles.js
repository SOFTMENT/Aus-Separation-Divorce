import { StyleSheet } from "react-native";
import { spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    btn:{
        padding:spacing.medium,
        borderRadius:spacing.medium,
        borderWidth:0.5,
        borderColor:colors.appDefaultColor,
        width:"90%",
        marginBottom:20
    }
})
export default styles