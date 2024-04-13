import {StyleSheet} from 'react-native';
import fonts from '../../../assets/fonts';
import { itemSizes, spacing, fontSizes } from '../../common/variables';
import colors from '../../theme/colors';


// import {fontSizes, itemSizes, spacing} from '../../common/variables';
// import colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    marginBottom:10
    //backgroundColor: colors.ratingColor,
    // marginBottom:Platform.OS === 'ios'?itemSizes.item70:itemSizes.item60,
  },
  headerTabStyle: {
    height: 35,
    alignItems: 'center',
    paddingRight: spacing.large,
    paddingLeft: spacing.large,
    justifyContent: 'center',
    backgroundColor:colors.btnColor,
    borderRadius: itemSizes.item20,
    marginRight: spacing.mediumLarge,
  },
  horizontalTabHeaderContainer: {
    marginTop: spacing.mediumLarge,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
  },
  headingText: {
    textAlign: 'center',
    width: '100%',
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottomBorder: {
    borderTopWidth: 2,
    marginLeft: '10%',
    marginRight: '10%',
    borderTopColor: '#8EC759',
    marginBottom: 20,
    marginTop: 10,
  },
});
