import { Image, Modal, Text, View } from "react-native"
import styles from "./styles"
import React from "react"
import images from "../../assets/images"
import Header from "../Header"
import MyButton from "../MyButton"
import { HStack } from "native-base"
import colors from "../../theme/colors"
const LocationRequiredModal = (props) => {
    const {visible, closeModal, handleLocation,handleNotNow} = props
    return(
        <Modal visible={visible} style={{backgroundColor:colors.backgroundColor,flex:1}}>
            <Header extraStyle={{backgroundColor:colors.backgroundColor}}/>
            <View style={styles.container}>
                <Image
                    source={images.locationImage}
                    resizeMode="contain"
                    style={{height:"50%"}}
                />
                <Text style={styles.title}>
                    Explore vendor spaces nearby you.
                </Text>
                <Text style={styles.subtitle}>
                    Your location helps us bring you to better spaces to find.
                </Text>
            </View>
            <HStack paddingBottom={5} px={4} justifyContent="space-evenly" bgColor={colors.backgroundColor}>
                <MyButton
                    title={"Enable Location"}
                    containerStyle={styles.btn}
                    onPress={handleLocation}
                    txtStyle={{color:"white"}}
                />
                <MyButton
                    title={"Not Now"}
                    containerStyle={styles.notNow}
                    onPress={handleNotNow}
                    txtStyle={{color:colors.appDefaultColor}}
                />
            </HStack>
        </Modal>
    )
}
export default LocationRequiredModal