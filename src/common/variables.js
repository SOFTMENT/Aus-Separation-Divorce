import { responsiveSize } from './util';
import { Platform } from 'react-native';



export const fontSizes = {
  mini: responsiveSize(8),
  tiny: responsiveSize(10),
  extraExtraSmall: responsiveSize(12),
  extraSmall: responsiveSize(14),
  small: responsiveSize(16),
  medium: responsiveSize(18),
  mediumLarge: responsiveSize(20),
  large: responsiveSize(22),
  extraLarge: responsiveSize(24),
  extraLarger: responsiveSize(28),
  extraExtraLarge: responsiveSize(32),
  giant: responsiveSize(36),
  iosIcons: responsiveSize(32),
  androidCloseIcon: responsiveSize(22),
  androidCheckmarkIcon: responsiveSize(26),
};

export const spacing = {
  zero: responsiveSize(0),
  border: responsiveSize(1),
  borderDouble: responsiveSize(2),
  extraExtraSmall: responsiveSize(3),
  minise: responsiveSize(-1),
  extraSmall: responsiveSize(5),
  small: responsiveSize(8),
  semiMedium: responsiveSize(10),
  medium: responsiveSize(12),
  mediumLarge: responsiveSize(16),
  large: responsiveSize(20),
  extraLarge: responsiveSize(24),
  extraExtraLarge: responsiveSize(30),
};

export const itemSizes = {
  item10: responsiveSize(10),
  item12: responsiveSize(12),
  item15: responsiveSize(15),
  item20: responsiveSize(20),
  item25: responsiveSize(25),
  item30: responsiveSize(30),
  item35:responsiveSize(35),
  item40: responsiveSize(40),
  item45:responsiveSize(45),
  item50:responsiveSize(50),
  item60: responsiveSize(60),
  item70: responsiveSize(70),
  defaultHeight: responsiveSize(50),
  defaultWidth: responsiveSize(50),
};

export const fontWeights = {
  thin: '100',
  light: '300',
  book: '400',
  medium: Platform.OS == "ios" ? '600':"bold",
  bold: Platform.OS == "ios" ? '700':"bold",
  black: 'bold'
};

export const fontName = {
  // circularStd_Black: 'CircularStd-Black',
  // circularStd_Bold: 'CircularStd-Bold',
  // circularStd_Book: 'CircularStd-Book',
  // circularStd_Medium: 'CircularStd-Medium',

};

export const maxInputLimit = 4000;

export const blackOutPeriods = [
  {label: '24 hours', value: 24 },
  {label: '48 hours', value: 48 },
  {label: '72 hours', value: 72 },
]
