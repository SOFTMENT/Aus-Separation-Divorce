import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    mainView:{
        padding:spacing.medium,
        paddingTop:0,
        flex:1
    },
    imageStyle:{
        width:Util.getWidth(90),
        aspectRatio:16/9,
        borderRadius:spacing.small,
        marginBottom:10
    },
    detailsView:{
        alignSelf:"baseline",
        backgroundColor:"rgba(255, 255, 255, 0.9)",
        margin:10,
        padding:spacing.small,
        borderRadius:spacing.extraSmall,
        maxWidth:"70%"
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
    edit:{
        position:"absolute",
        backgroundColor:"rgba(255, 255, 255, 0.8)",
        right:40,
        top:10,
        width:25,
        height:25,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        padding:5
    },
    delete:{
        position:"absolute",
        backgroundColor:"rgba(255, 255, 255, 0.8)",
        right:10,
        top:10,
        width:25,
        height:25,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        padding:5
    }
})
export default styles