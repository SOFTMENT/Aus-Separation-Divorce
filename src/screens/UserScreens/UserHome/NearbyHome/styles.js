import { StyleSheet } from "react-native";
import fonts from "../../../../../assets/fonts";
import Util, { responsiveSize } from "../../../../common/util";
import { fontSizes, spacing } from "../../../../common/variables";

const styles =  StyleSheet.create({
    container:{
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginHorizontal:1,
        borderRadius:10,
        elevation: 3,
        backgroundColor:"white",
        marginVertical:10,
        padding:15,
        flexDirection:"row"
    },
    image:{
        width:"40%",
        aspectRatio:16/12,
        borderRadius:5
    },
    spaceTitle:{
        color:"black",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.medium
    },
    subtitle:{
        color:"rgba(0, 0, 0, 0.5)",
        fontSize:responsiveSize(11),
        width:"95%",
        fontFamily:fonts.regular,
        marginLeft:5
    },
})
export default styles