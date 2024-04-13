import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
const ClickableText = props =>  {
const {title,extraStyle,onPress, containerStyle} = props;
return (
  <TouchableOpacity onPress={onPress} style={[containerStyle]}>
    <Text
      adjustsFontSizeToFit={Boolean(true)}
      style={[styles.textStyle,extraStyle]}
      textDecorationColor={'transparent'}
    >
      {title}
    </Text>
  </TouchableOpacity>
  );
};
ClickableText.propTypes = {
  textStyle: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  title: PropTypes.string,
};

ClickableText.defaultProps = {
  textStyle: {},
  title: '',
  containerStyle:{}
};
const styles = StyleSheet.create({
  
})



export default ClickableText;
