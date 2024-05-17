import {HStack, VStack} from 'native-base';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import images from '../../../assets/images';
import {spacing} from '../../../common/variables';
import MyButton from '../../../components/MyButton';
import styles from './styles';
import colors from '../../../theme/colors';
import { useState } from 'react';
import { navigateAndReset } from '../../../navigators/RootNavigation';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Util from '../../../common/util';
export default function OnboardingScreen(props) {
  const {navigation} = props;
  const inset = useSafeAreaInsets();
  const [loading,setLoading] = useState(false)
  const handleNavigation = tab => {
    navigation.navigate('LoginScreen', {tab});
  };
  const userAnonymousSignin = () => {
    setLoading(true)
    auth()
    .signInAnonymously()
    .then(async() => {
      await AsyncStorage.setItem("userType",Util.getUserType(1))
      navigateAndReset('UserBottomTab');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }

      console.error(error);
    })
    .finally(()=>{
      setLoading(false)
    })
  }
  return (
    <View style={[styles.container]}>
      <Image
        source={images.bgTopImage}
        style={{width: '100%'}}
        resizeMode="cover"
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
            loading={loading}
            title={'USER'}
            //containerStyle={[styles.btn]}
            onPress={() => userAnonymousSignin()}
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
