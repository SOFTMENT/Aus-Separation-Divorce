import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    main:{
        paddingHorizontal:spacing.medium
    },
    fTitle:{
        color:"black",
        fontFamily:fonts.medium,
        fontSize:fontSizes.small,
        marginTop:20
    },
    heading:{
        color:colors.black,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraSmall,
        marginBottom:10
    },
    subTitle:{
        color:"#A6A6A6",
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
        alignSelf:"flex-start",
        marginVertical:1,
        //marginLeft:10
    },
    card:{
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginHorizontal:10,
        borderRadius:10,
        elevation: 3,
        backgroundColor:"white",
        marginVertical:10,  
        flexDirection:"row"  
    },
    image:{
        width:130,
        height:100,
        borderTopStartRadius:10,
        borderBottomStartRadius:10,
    }
})
export default styles