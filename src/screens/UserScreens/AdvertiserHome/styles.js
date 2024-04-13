import {StyleSheet} from 'react-native';
import fonts from '../../../../assets/fonts';
import Util from '../../../common/util';
import {fontSizes, spacing} from '../../../common/variables';
import colors from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    padding: spacing.medium,
    // paddingTop:insets.top
  },
  noSpaces: {
    color: 'gray',
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fonts.regular,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hello: {
    color: 'black',
    fontSize: fontSizes.small,
    fontFamily: fonts.medium,
  },
  name: {
    color: 'black',
    fontSize: fontSizes.medium,
    fontFamily: fonts.bold,
  },
  searchBox: {
    backgroundColor: '#EEEDED',
    borderRadius: spacing.large,
    padding: spacing.medium,
    marginVertical: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  placeholder: {
    color: 'black',
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fonts.regular,
  },
  currentLocation: {
    color: 'black',
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    marginTop: 30,
  },
  currentLocationBold: {
    color: 'black',
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginTop: 5,
    marginBottom: 50,
  },
  tapToSee: {
    height: 150,
    aspectRatio:1,
  },
  logoBorder:{
    borderColor:colors.appDefaultColor,
    backgroundColor:"white",
    borderWidth:2,
    width:"60%",
    alignSelf:"center",
    alignItems:"center",
    marginTop:5,
    borderRadius:10
  },
  tapToSeeText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSizes.extraExtraSmall,
  },
  or: {
    color: colors.black,
    textAlign: 'center',
    marginVertical: spacing.large,
    fontFamily: fonts.bold,
    fontSize: fontSizes.extraExtraSmall,
    marginHorizontal: spacing.extraExtraSmall,
  },
  borderViewContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical:20
    //backgroundColor:'red'
  },
  borderView: {
    height: 0.5,
    flex: 1,
    // width:"100%",
    backgroundColor: 'black',
  },
});
export default styles;
