import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import fonts from '../../../assets/fonts';
import styles from './styles';


const Loader = (props) => {
  const { visible,title} = props;
  return (
    <Modal
      supportedOrientations={['landscape', 'portrait']}
      transparent
      visible={visible}
    >
      <View style={styles.container}>
          <View style={styles.loaderbackgroundView}>
            <ActivityIndicator color={"white"} size="large"/>
            {title&&<Text style={{color:"white",fontFamily:fonts.semiBold}}>{title}</Text>}
          </View>
      </View>
    </Modal>
  );


};

export default React.memo(Loader);
