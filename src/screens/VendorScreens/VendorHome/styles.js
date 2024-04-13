import {StyleSheet} from 'react-native';
import fonts from '../../../../assets/fonts';
import {fontSizes, spacing} from '../../../common/variables';
import colors from '../../../theme/colors';
import Util, { responsiveSize } from '../../../common/util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.mediumLarge,
    backgroundColor: colors.backgroundColor,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
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
  title: {
    fontSize: fontSizes.extraSmall,
    color: colors.btnColor,
    fontFamily: fonts.semiBold,
  },
  borderViewContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    //backgroundColor:'red'
  },
  borderView: {
    height: 0.5,
    flex: 1,
    // width:"100%",
    backgroundColor: 'gray',
  },
  or: {
    color: colors.black,
    textAlign: 'center',
    marginVertical: spacing.large,
    fontFamily: fonts.bold,
    fontSize: fontSizes.extraExtraSmall,
    marginHorizontal: spacing.extraExtraSmall,
  },
  searchContainer:{
    backgroundColor:colors.white,
    flexDirection:"row",
    alignItems:"flex-start",
    paddingHorizontal:10,
    borderRadius:20,
    borderWidth:1,
    borderColor:colors.borderColor
  },
  autoCompleteStyles: {
    container: {
      borderRadius: spacing.small,
      borderWidth: 1,
      //backgroundColor:"green",
      paddingHorizontal: spacing.extraSmall,
      marginRight: spacing.semiMedium,
      borderColor: colors.borderColor,
      zIndex: 1000,
      height:100,
      //alignItems: "center",
    },
    textInput: {
      backgroundColor: 'transparent',
      color: 'black',
      fontFamily: fonts.regular,
      fontSize: responsiveSize(12),
      height:100,
    },
    listView: {
      width: Util.getWidth(82),
      backgroundColor: colors.backgroundColor,
      padding: spacing.medium,
      paddingBottom: 10,
      borderRadius: spacing.extraExtraSmall,
      position: 'absolute',
      top: Util.getHeight(6),
      left: -2,
      zIndex: 1000,
    },
    separator: {
      backgroundColor: 'gray',
    },
    row: {
      backgroundColor: 'white',
      color: 'black',
      borderRadius: spacing.extraSmall,
      marginBottom: spacing.extraSmall,
      paddingHorizontal: 10,
      zIndex: 1000,
    },
    description: {
      color: 'black',
      fontSize: responsiveSize(12),
      noWrap: true,
    },
    
    placeholder: {
      color: 'black',
      fontSize: fontSizes.extraExtraSmall,
      fontFamily: fonts.regular,
    },
  },
  searchBox: {
    backgroundColor: '#EEEDED',
    borderRadius: spacing.large,
    padding: spacing.medium,
    marginVertical: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
