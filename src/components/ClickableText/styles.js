import { StyleSheet } from 'react-native';
import {  fontSizes, fontWeights, fontName } from '../../common/variables';
import colors from '../../theme/colors';
import Util, { responsiveSize } from '../../common/util';


const styles = StyleSheet.create({
  textStyle: {
    fontSize: responsiveSize(14),
    fontSize: fontSizes.medium,
    color: colors.whiteText,
    fontFamily: fontName.circularStd_Black,
    // fontWeight:fontWeights.book,
  },
});
export default styles;
