import { View } from "react-native"
import WebView from "react-native-webview"
import React from "react"
import Header from "../../components/Header"
const WebViewScreen = (props) => {
    const {navigation} = props
    return(
        <View style={{flex:1}}>
          <Header title="Now Show" back navigation={navigation}/>
          <WebView
            source={{ uri: 'https://nowshow.app/blog-news/' }}
            style={{ flex:1}}
          />
        </View>
    )
}
export default WebViewScreen