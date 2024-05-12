import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, View } from "react-native";
import images from "../../assets/images";
import { navigateAndReset } from "../../navigators/RootNavigation";
import styles from "./styles";
import firestore from '@react-native-firebase/firestore';
import colors from '../../theme/colors';
const SplashScreen = (props) => {
    const { navigation } = props
    let authState = true
    useEffect(() => {
        let subscriber  = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber
    }, [])
    function onAuthStateChanged(user) {
        const timeout = setTimeout(async () => {
            // if (initializing) setInitializing(false);
            if (authState) {
                authState = false
                if (user) {
                    // auth().signOut()
                    await firestore()
                        .collection("Users")
                        .doc(user.uid)
                        .get()
                        .then(async doc => {
                            const userDoc = doc.data()
                            if (!doc.exists) {
                                auth().signOut()
                                    .then(() => {
                                        navigateAndReset("OnboardingScreen")
                                    })
                                    .catch(() => {
                                        navigateAndReset("OnboardingScreen")
                                    })

                            }
                            if (userDoc.isAdmin) {
                                navigateAndReset("AdminScreen")
                                return
                            }
                            else {
                                if (!user.emailVerified && (user.providerData[0].providerId == "password" || (user.providerData[1]?.providerId == "password" ?? false))) {
                                    auth().signOut()
                                        .then(() => {
                                            navigateAndReset("OnboardingScreen")
                                        })
                                        .catch(() => {
                                            navigateAndReset("OnboardingScreen")
                                        })
                                }
                                else {
                                    // if(userDoc.profileUpdated)
                                    if (true)
                                        navigateAndReset("HomeScreen", { uid: user.uid })
                                    else
                                        navigateAndReset("OnboardingScreen")
                                }
                            }
                        })
                }
                else
                    navigateAndReset("OnboardingScreen")
            }
        }, 2000)
    }
    return (
        <View style={styles.mainContainer}>
            {/* <View style={styles.circleView}>
                <View style={styles.circle} />
                <View style={styles.circle1} />
            </View> */}
            <Image
                    source={images.bgTopImage}
                    style={{width:"100%"}}
                    resizeMode='cover'
                />
            <View style={styles.logoView}>
                <Image
                    source={images.logo}
                    style={styles.logo}
                    resizeMode='contain'
                />
                {/* <Image
                    source={images.siteSeeText}
                    style={styles.siteSee}
                    resizeMode='contain'
                /> */}
            </View>
            <View style={styles.loaderView}>
                <ActivityIndicator color={colors.appPrimary} size="large"/>
            </View>
        </View>
    )
}
export default SplashScreen