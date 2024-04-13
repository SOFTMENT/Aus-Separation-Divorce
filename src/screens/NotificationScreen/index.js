import { View } from "native-base"
import styles from "./styles"
import React from "react"
import Header from "../../components/Header"
const NotificationScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Header back navigation={navigation} title="Notifications"/>
        </View>
    )
}
export default NotificationScreen