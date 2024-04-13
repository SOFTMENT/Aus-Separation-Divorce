import { StyleSheet, StatusBar } from "react-native";
import colors from "../../../theme/colors";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, itemSizes, spacing } from "../../../common/variables";

export default StyleSheet.create({

  mainContainer: {
    flex: 1,
    //alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },

 
 
  btn: {
    height: Util.getHeight(3.9),
    width: Util.getHeight(10),
    borderRadius: responsiveSize(7),
    padding: 0
  },
  btnTxt: {
    fontSize: responsiveSize(9.5),
    color: "white",
    fontFamily:fonts.medium
  },
  title: {
    fontSize: fontSizes.extraSmall,
    color: colors.black,
    fontFamily:fonts.semiBold
  },
  text: {
    fontSize: fontSizes.extraExtraSmall,
    color: colors.btnColor,
    marginTop: spacing.extraSmall,
    fontFamily:fonts.semiBold
  },
});
