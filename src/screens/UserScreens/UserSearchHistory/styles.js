import { StyleSheet } from "react-native";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, itemSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";
import fonts from "../../../../assets/fonts";


export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    mainView:{
        flex:1,
       // padding:spacing.medium
    },
    
    textBack:{
        width:Util.getWidth(100)-spacing.medium*4-itemSizes.item40,
        backgroundColor:"white",
        height:itemSizes.item40,
        borderRadius:spacing.extraSmall,
        padding:spacing.small,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    search:{
        //color:"white",
        //textAlign:"center",
        fontFamily: 'Nunito Sans',
        fontSize: responsiveSize(13),
        flex:1,
       // backgroundColor:"red"
    },
    searchBtn:{
        width:itemSizes.item20,
        height:itemSizes.item20,
       // backgroundColor:"white"
    },
    title:{
        color:"white",
        textAlign:"center",
        fontFamily: 'Nunito Sans',
        fontSize: responsiveSize(13),
    },
    term:{
        color:'black',
        fontFamily:fonts.medium
    },
    searchHistory:{
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
        backgroundColor:"white"
    },
    searchH:{
        borderBottomWidth:0.3,
        borderColor:colors.borderColor,
        padding:15,
    },
    recentSearch:{
        fontFamily:fonts.medium,
        color:colors.appDefaultColor,
        fontSize:fontSizes.extraSmall,
        marginLeft:spacing.medium,
        marginBottom:10
    }
})