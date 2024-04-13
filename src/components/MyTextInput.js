import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import images from '../assets/images';
import {fontSizes, itemSizes, spacing} from '../common/variables';
import colors from '../theme/colors';
import React, {useState} from 'react';
import fonts from '../../assets/fonts';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {responsiveSize} from '../common/util';
const MyTextInput = ({
  containerStyle,
  lowerBorder,
  nonEditable,
  iconName,
  isPass,
  rightTitle,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  subPlace,
  placeholderTextColor,
  txtInputStyle,
  multiline,
}) => {
  const [secureText, setSecureText] = useState(true);
  return (
    <View style={[containerStyle]}>
      {/* <Text
        style={[
          styles.placeholderText,
          placeholderTextColor && {color: placeholderTextColor},
          lowerBorder && {marginLeft: spacing.small, marginBottom: 0},
        ]}>
        {placeholder}
      </Text> */}
      <View
        style={[
          styles.container,
          
        ]}>
        <TextInput
          style={[styles.input, txtInputStyle]}
          secureTextEntry={isPass ? secureText : false}
          multiline={multiline}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          editable={!nonEditable}
          placeholderTextColor={
            placeholderTextColor
              ? placeholderTextColor
              : '#898B91'
          }
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType ? keyboardType : 'default'}
        />
        {iconName && (
          <Icon
            as={MaterialCommunityIcons}
            name={iconName}
            color={colors.appDefaultColor}
            size={'lg'}
          />
        )}
        {rightTitle && <Text style={styles.placeholderText}>{rightTitle}</Text>}
        {/* {
                isPass
                &&
                <IconButton
                    onPress={()=>setSecureText(!secureText)}
                    icon={secureText?images.viewPass:images.hidePass}
                    iconStyle={styles.passStyle}
                />
            } */}
      </View>
    </View>
  );
};
MyTextInput.propTypes = {
  containerStyle: PropTypes.shape(ViewStyle),
  isPass: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  iconName: PropTypes.string,
  keyboardType: PropTypes.string,
};
export default MyTextInput;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: spacing.extraSmall,
    // borderWidth: 1,
    paddingVertical: Platform.OS == 'ios' ? spacing.medium : spacing.semiMedium,
    paddingHorizontal: spacing.small,
    //paddingVertical:0,
    alignItems: 'center',
    borderColor: colors.borderColor,
    borderWidth:1
  },
  lowerBorderStyle: {
    borderBottomWidth: 0.3,
    paddingVertical:
      Platform.OS == 'ios' ? spacing.small : spacing.extraExtraSmall,
    paddingHorizontal: 0,
    paddingRight: 10,
  },
  icon: {
    width: itemSizes.item15,
    height: itemSizes.item15,
    tintColor: colors.borderColor,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.semiMedium,
    fontFamily: fonts.regular,
    paddingVertical: 0,
    fontSize: fontSizes.extraExtraSmall,
    color: 'black',
  },
  placeholderText: {
    fontSize: fontSizes.extraExtraSmall,
    color: colors.black,
    fontFamily: fonts.medium,
    marginBottom:spacing.small,
    //backgroundColor:"red"
  },
  passContainer: {},
  passStyle: {
    width: itemSizes.item20,
    height: itemSizes.item20,
    tintColor: colors.appSecondary,
  },
  placeholderTextContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 20,
    zIndex: 100,
    paddingHorizontal: spacing.extraSmall,
  },
  textArea: {
    borderRadius: spacing.small,
    padding: spacing.medium,
    paddingTop: 20,
    paddingBottom: 20,
    height: 100,
    color: 'white',
    //marginBottom:spacing.medium,
    fontSize: responsiveSize(11.5),
    fontFamily: fonts.regular,
    borderColor: '#686767',
  },
});
