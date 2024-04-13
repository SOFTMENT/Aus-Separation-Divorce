import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import fonts from '../../assets/fonts';
import { fontSizes, spacing } from '../common/variables';
import colors from '../theme/colors';
import images from '../assets/images';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyButton = (props) => {
    const { containerStyle, onPress, title, loading, txtStyle,icon,disabled, rightIcon} = props;
    return (
        <TouchableOpacity
            disabled={loading || disabled}
            onPress={onPress}
            style={[styles.container,containerStyle,disabled&&{opacity:0.5}]}>
                {/* {icon} */}
                {/* {!loading && icon} */}
                {
                    icon && 
                    <Icon
                        as={MaterialCommunityIcons}
                        name={icon}
                        color={colors.appDefaultColor}
                        size={'lg'}
                        ml={1}
                        
                    />
                }
            <Text style={[styles.btnText,txtStyle]}>{title}</Text>
            {
                    rightIcon &&
                    <Icon
                        as={MaterialCommunityIcons}
                        name={rightIcon}
                        color={"white"}
                        size={'lg'}
                        ml={1}
                    />
                }
            {loading && <ActivityIndicator size={'small'} color={colors.white} style={{marginLeft:5}}/>}
        </TouchableOpacity>
    );
};
MyButton.propTypes = {
    containerStyle: PropTypes.object,
    onPress: PropTypes.func,
    title: PropTypes.string,
};
export default MyButton;
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor:colors.appPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.medium,
        //paddingVertical:spacing.semiMedium,
        width: '100%',
        alignSelf: 'center',
        borderRadius: spacing.semiMedium,
        marginVertical:spacing.small,
    },
    btnText:{
        color:colors.white,
        fontFamily:fonts.bold,
        fontSize:fontSizes.extraSmall,
    },
});
