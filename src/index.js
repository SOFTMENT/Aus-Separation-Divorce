import { Fragment } from "react"
import { StatusBar, Text, View } from "react-native"
import AppNavigator from "./navigators/AppNavigator"
import React from "react"
import Toast, { BaseToast, ErrorToast, SuccessToast } from 'react-native-toast-message';
import MyButton from "./components/MyButton";
import { fontSizes, spacing } from "./common/variables";
import ClickableText from "./components/ClickableText";
import colors from "./theme/colors";
import fonts from "../assets/fonts";
const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <SuccessToast
        {...props}
        text2NumberOfLines={3}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text2NumberOfLines={3}
      />
    ),
    btnToast: ({ text1, text2,props }) => (
      <View style={{ height: 80, width: '90%', backgroundColor: 'white',marginHorizontal:spacing.small,borderRadius:spacing.small,padding:spacing.semiMedium,flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderWidth:1,borderColor:colors.appDefaultColor}}>
        <View style={{width:"75%"}}>
          <Text style={{fontFamily:fonts.semiBold,fontSize:fontSizes.extraExtraSmall,color:"#333"}}>{text1}</Text>
          <Text style={{fontFamily:fonts.regular,fontSize:fontSizes.tiny,color:"grey",marginTop:spacing.extraExtraSmall}}>{text2}</Text>
        </View>
        <ClickableText
          title={"Resend"}
          onPress={props.onPress}
          extraStyle={{color:colors.appDefaultColor,fontFamily:fonts.semiBold,fontSize:fontSizes.extraExtraSmall}}
        />
      </View>
    )
}
  
const AppRoot = () =>{
    return(
        <Fragment>
            <StatusBar barStyle={"dark-content"}/>
            <AppNavigator/>
            <Toast config={toastConfig}/>
        </Fragment>
    )
}
export default AppRoot