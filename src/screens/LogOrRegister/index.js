import { Text, View, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import images from '../../assets/images';
import MyButton from '../../components/MyButton';
const LogOrRegister = ({ navigation }) => {
  return (
      <View style={styles.mainContainer}>
        <View style={styles.circleView}>
          <View style={styles.circle}/>
          <View style={styles.circle1}/>
        </View>
      <View style={styles.logoView}>
        <Image
          source={images.logo}
          style={styles.logo}
        />
      </View>
      <View style={styles.btnView}>
        <MyButton
          title={'Login'}
          onPress={() => navigation.navigate('LoginScreen')}
        // onPress={validateLogin}
        // containerStyle={styles.btn}
        />
        <MyButton
          title={'Register'}
          onPress={() => navigation.navigate('SignUpScreen')}
          // onPress={validateLogin}
          containerStyle={styles.btn}
          txtStyle={styles.text}
        />
      </View>
    </View>
  );
};

export default LogOrRegister;

