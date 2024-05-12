import { StyleSheet } from "react-native";
import Util from "../../common/util";
import { spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingBottom: spacing.small,
      },
      circleView: {
        flex: 0.3,
        width: '100%',
      },
      circle: {
        position: 'absolute',
        top: 40,
        left: 75,
        height: 100,
        width: 100,
        backgroundColor: '#fff7fc',
        borderRadius: 50,
      },
      circle1: {
        position: 'absolute',
        top: 80,
        left: -35,
        height: 100,
        width: 100,
        backgroundColor: '#fff7fc',
        borderRadius: 50,
      },
      logoView: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
      },
      loaderView:{
        paddingTop:30,
        flex:0.3
      },
      logo: {
        height:250,
        
        //height: 200,
      },
      siteSee:{
        height:35 ,
      }
})