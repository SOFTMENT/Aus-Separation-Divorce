import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StripeProvider } from '@stripe/stripe-react-native';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppRoot from './src';
import { store } from './src/store';
import fonts from './assets/fonts';
GoogleSignin.configure({
  iosClientId: "986930678283-dm9hnuatjbk2qfs97q0tffagtfbrhe3g.apps.googleusercontent.com",
  webClientId:"986930678283-3ennf744fbg23gu305t4hql9cvbqfp6n.apps.googleusercontent.com"
  // scopes:[
  //     `https://www.googleapis.com/auth/drive.readonly`,
  //     `https://www.googleapis.com/auth/youtube`,
  //     `https://www.googleapis.com/auth/youtube.upload`,
  //     `https://www.googleapis.com/auth/plus.login`
  //     ],
});
const App = () => {
  // useEffect(() => {
  //   messaging().onMessage(onMessageReceived);
  // }, [])
  async function onMessageReceived(message) {
    console.log(message)
    await notifee.requestPermission()
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    console.log(message)
    // Display a notification
    await notifee.displayNotification({
      title: message.notification?.title ?? "Hey",
      body: message.notification?.body ?? "We Hope You like the App",
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  const theme = extendTheme({
    fontConfig: {
      Mulish: {
        100: {
          normal: fonts.light
          //italic: "Roboto-LightItalic",
        },
        200: {
          normal: fonts.light
          //italic: "Roboto-LightItalic",
        },
        300: {
          normal: fonts.regular,
          //italic: "Roboto-LightItalic",
        },
        400: {
          normal: fonts.regular,
          //italic: "Roboto-Italic",
        },
        500: {
          normal: fonts.medium
        },
        600: {
          normal: fonts.medium
        },
        700: {
          normal: fonts.medium
        },
        800: {
          normal: fonts.medium
        },
        900: {
          normal: fonts.bold,
        },
        1000: {
          normal: fonts.bold
        }
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "Poppins-Regular",
      body: "Poppins-Regular",
      mono: "Poppins-Regular",
    },
  });
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <StripeProvider
        publishableKey={"pk_test_51KFL8tSDWf0JstBgTpxm7DyeiqmojL5nG5gixy7TZG4saXVyDijctKS2axplOrpupagx03wcIAxT7P83kby4neaE00xYu35VZJ"}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
        
            <Provider store={store}>
            
                <NativeBaseProvider theme={theme}>
                
                <AppRoot />
               
                </NativeBaseProvider>
                
            </Provider>
            
    </StripeProvider >
   </GestureHandlerRootView>
  )
}
export default App