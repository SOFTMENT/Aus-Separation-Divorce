import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import fonts from '../../../assets/fonts';
import { spacing } from '../../common/variables';
import colors from '../../theme/colors';
import styles from './styles';

const HeaderTabText = ({label,style}) => {
  return (
    <Text
      style={[{
        color: colors.whiteText,
        fontSize: 14,
        fontFamily: fonts.medium,
      },style]}>
      {label}
    </Text>
  );
};

const TopTabComponent = ({
  selected,
  setSelected,
  tabList,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.horizontalTabHeaderContainer}>
        <ScrollView
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {tabList.map(item => {
            let isSelected = selected === item.label
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelected(item.label)}>
                <View
                    style={[styles.headerTabStyle,isSelected&&{
                        borderColor:colors.btnColor,
                        borderWidth:2,
                        backgroundColor:colors.white
                    }]}>
                    <HeaderTabText label={item.label} style={{color:isSelected?colors.btnColor:"white"}} />
                  </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default TopTabComponent;
