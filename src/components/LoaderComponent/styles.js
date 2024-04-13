import { StyleSheet,Platform,Dimensions } from 'react-native';
import Util from '../../common/util';
import { itemSizes, spacing } from '../../common/variables';
import colors from '../../theme/colors';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:colors.modalBackgraound
    },
      loaderbackgroundView: {
        width:"50%",
        borderRadius:spacing.large,
        alignItems:"center",
        justifyContent:"center",
      },
   
  });
  export default styles;