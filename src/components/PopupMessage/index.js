
import React from 'react'
import { Modal, Text, View } from 'react-native'

import styles from './styles'
export default PopupMessage = (props) =>{
    const {visible,onPress,title,subtitle} = props
    return(
       
        <Modal
          visible={visible}
          animationType="slide"
          transparent={true}  
        >
          <View style={styles.container}>
            <View style={styles.modal}>
                <Text style={styles.txtStyle}>{title}</Text>
                <View  style={styles.lottieContainer}>
                    {/* <AnimatedLottieView
                        source={lotties.success}
                        autoPlay 
                        loop={true}
                    /> */}
                 </View>
                 {/* <TouchableOpacity style={styles.btn} onPress={onPress}>
                     <Text style={styles.btnText}>{subtitle}</Text>
                 </TouchableOpacity> */}
            </View>
          </View>  
        </Modal>
        
    )
}