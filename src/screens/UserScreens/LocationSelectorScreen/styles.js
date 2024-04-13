import {StyleSheet} from 'react-native';
import fonts from '../../../../assets/fonts';
import Util, {responsiveSize} from '../../../common/util';
import {fontSizes, itemSizes, spacing} from '../../../common/variables';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  headingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
  },
  crossIconContainer: {
    width: itemSizes.item40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    color: colors.greyText,
    fontFamily: fonts.semiBold,
    fontSize: responsiveSize(13),
    includeFontPadding: false,
  },
  mapView: {
    flex: 1,
    borderRadius: spacing.small,
    paddingHorizontal: 10,
    paddingBottom: 20,
    //zIndex:1
  },
  autoCompleteStyles: {
    container: {
      borderRadius: spacing.large,
      borderWidth: 1,
      backgroundColor: colors.white,
      paddingHorizontal: spacing.extraSmall,
      marginRight: spacing.semiMedium,
      borderColor: colors.borderColor,
      //alignItems: "center",
    },
    textInput: {
      color: 'black',
      borderRadius: spacing.large,
      fontFamily: fonts.regular,
      fontSize: responsiveSize(12),
    },
    listView: {
      height: 300,
    },
    //  separator:{
    //  backgroundColor:"gray"
    //  },
    //  row:{
    //    backgroundColor:"white",
    //    color:"black",
    //    borderRadius:spacing.extraSmall,
    //    marginBottom:spacing.extraSmall,
    //    paddingHorizontal:10,
    //    zIndex:1000,
    //  },
    //  description:{
    //      color:"black",
    //      fontSize:responsiveSize(12),
    //      noWrap:true
    //  }
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  confirmBtn: {
    marign: 5,
    width: '90%',
  },
  confirmBtnTxt: {
    color: 'white',
    fontSize: responsiveSize(13),
    fontFamily: fonts.medium,
  },
  locInstead: {
    fontFamily: fonts.medium,
    color: '#146AF6',
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 10,
    fontSize: fontSizes.extraSmall,
  },
});
