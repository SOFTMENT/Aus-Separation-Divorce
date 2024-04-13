import {HStack, VStack} from 'native-base';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import images from '../../../assets/images';
import {spacing} from '../../../common/variables';
import MyButton from '../../../components/MyButton';
import styles from './styles';
import colors from '../../../theme/colors';
export default function OnboardingScreen(props) {
  const {navigation} = props;
  const inset = useSafeAreaInsets();
  const handleNavigation = tab => {
    navigation.navigate('LoginScreen', {tab});
  };
  return (
    <View style={[styles.container]}>
      <Image
        source={images.bgTopImage}
        style={{width: '100%'}}
        resizeMode="contain"
      />
      <View style={styles.logoView}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        {/* <Text style={[styles.areyou,{fontSize:30}]}>Site See</Text> */}
        {/* <Image
          source={images.siteSeeText}
          style={styles.siteSee}
          resizeMode="contain"
        /> */}
      </View>
      <View style={styles.btnView}>
        <VStack width={'90%'} justifyContent={'space-between'}>
          <MyButton
            title={'USER'}
            //containerStyle={[styles.btn]}
            onPress={() => handleNavigation(1)}
          />
          <MyButton
            title={'ADVERTISER'}
            containerStyle={[styles.btn]}
            txtStyle={{color: colors.appPrimary}}
            onPress={() => handleNavigation(2)}
          />
        </VStack>
      </View>
    </View>
  );
}
