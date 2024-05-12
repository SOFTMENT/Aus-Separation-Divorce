import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Button, HStack, Link, Stack } from 'native-base';
import React, { useState } from 'react';
import { Image, ImageBackground, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from "../../assets/images";
import Util from '../../common/util';
import { spacing } from "../../common/variables";
import MyButton from "../../components/MyButton";
import MyTextInput from "../../components/MyTextInput";
import { navigateAndReset } from '../../navigators/RootNavigation';
import colors from "../../theme/colors";
import styles from "./styles";
import fonts from '../../../assets/fonts';
import ClickableText from '../../components/ClickableText';
import Header from '../../components/Header';
const UserLogin = (props) => {
    const { navigation, route } = props
    const tab = route.params?.tab ?? 1
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false)
    const inset = useSafeAreaInsets()
    const handleForget = () => {
        if (!email.trim()) {
            Util.showMessage("error", "Please provide email")
        }
        else {
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    Util.showMessage("success", "Email reset link sent")
                })
                .catch(error => {
                    Util.showMessage("success", "Error", error.code.split("/")[1])
                })
        }
    }
    const sendEmailVerificationLink = () => {
        const user = auth().currentUser
        user.sendEmailVerification()
            .then(() => {
                Util.showMessage("success", "Email verification link sent")
            })
    }
    const handleLogin = async () => {
        if (!email.trim()) {
            Util.showMessage("error", "Oops!", "Please Enter Email")
            return
        }
        if (!pass) {
            Util.showMessage("error", "Oops!", "Please Enter Password")
            return
        }
        setLoading(true)
        auth()
            .signInWithEmailAndPassword(email.trim(), pass)
            .then(async () => {
                const user = auth().currentUser
                await firestore()
                    .collection("Users")
                    .doc(user.uid)
                    .get()
                    .then(async doc => {
                        const userDoc = doc.data()
                        // if (userDoc.isDeleted) {
                        //     if (auth().currentUser.providerData[0].providerId == "google.com") {
                        //         //await GoogleSignin.revokeAccess();
                        //         await GoogleSignin.signOut();
                        //     }
                        //     auth().signOut().then(() => {
                        //         Util.showMessage("error","Oops!","This account has been marked as deleted, please register with new email.")
                        //     })
                        // }
                        if (userDoc.isAdmin) {
                            navigateAndReset("AdminScreen")
                            return
                        }
                        else {
                            if (!user.emailVerified && (user.providerData[0].providerId == "password" || (user.providerData[1]?.providerId == "password" ?? false))) {
                                Util.showMessage("btnToast", "Email Verification Required", "A verification link has been sent to your email.(Check your spam in case the email is not in your inbox", sendEmailVerificationLink)
                            }
                            else {
                                // if((userDoc.userType == Util.getUserType(tab)))
                                //     navigateAndReset("HomeScreen", { uid: userDoc.uid })
                                // else
                                //     {
                                //         auth().signOut().then(() => {
                                //             const val = Util.getUserType(tab )
                                //             Util.showMessage("error",'Oops!',`This account is already associated with ${userDoc.userType}.`)
                                //         })
                                //         .catch(error=>{
                                //             console.log(error)
                                //         })
                                //     }
                                await AsyncStorage.setItem("userType",Util.getUserType(tab))
                                navigateAndReset("HomeScreen", { uid: userDoc.uid })
                            }
                        }
                    })
            })
            .catch(error => {
                Util.showMessage("error", "Error", error.code.split("/")[1])
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const sendNewProEmailAdmin = async (name, email) => {
        try {
            var body = new FormData()
            body.append('name', name)
            body.append('email', 'cyril@boquillon.com')
            body.append('subject', "A New Professional has just Signed Up")
            body.append('body', `<h1>Hello Admin</h1><p>A New Professional ${name}(${email}) has just registered with us.</p>`)
            await axios({
                method: "post",
                url: "https://softment.in/universal/mailer/sendmail.php",
                data: body

            })
            console.log("sent")

        } catch (error) {
            console.log(error)
        }
    }
    const sendUnderReviewEmail = async (name, email) => {
        sendNewProEmailAdmin(name, email)
        try {
            var body = new FormData()
            body.append('name', name)
            body.append('email', email)
            body.append('subject', "Welcome to Appvertise")
            body.append('body', `<h1>Hey ${name}</h1><p>Your account is under review, we will let you know once it is approved.</p>`)
            await axios({
                method: "post",
                url: "https://softment.in/universal/mailer/sendmail.php",
                data: body

            })
            console.log("sent")

        } catch (error) {
            console.log(error)
        }
    }
    // const fbLogin = async () => {
    //     try {
    //         setLoading(true)
    //         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //         if (result.isCancelled) {
    //             throw { message: 'User cancelled the login process' };
    //         }
    //         const data = await AccessToken.getCurrentAccessToken();
    //         if (!data) {
    //             throw { message: 'Something went wrong obtaining access token' };
    //         }
    //         // Create a Firebase credential with the AccessToken
    //         const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    //         // Sign-in the user with the credential
    //         const user = await auth().signInWithCredential(facebookCredential);
    //         // console.log( user.providerData)
    //         // console.log( user.providerId)
    //         handleUser()
    //     } catch (error) {
    //         if (error.code == "auth/account-exists-with-different-credential") {
    //             Util.showMessage("error", "Error", "An account already exists with the same email address")
    //         }
    //         else
    //             Util.showMessage("error", "Error", error?.message)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }
    const handleUser = async (fullName) => {
        const userData = auth().currentUser
        setLoading(true)
        await firestore()
            .collection("Users")
            .doc(userData.uid)
            .get()
            .then(async(user) => {
                if (user.exists) {
                    // if (user.data().isDeleted) {
                    //     if (auth().currentUser.providerData[0].providerId == "google.com") {
                    //         //await GoogleSignin.revokeAccess();
                    //         await GoogleSignin.signOut();
                    //     }
                    //     auth().signOut().then(() => {
                    //         Util.showMessage("error","Oops!","This account has been marked as deleted, please register with new email.")
                    //     })
                    // }
                   
                        await AsyncStorage.setItem("userType",Util.getUserType(tab))
                        navigateAndReset("HomeScreen", { uid: user.data().uid })
                        // if((user.data().userType == Util.getUserType(tab)))
                        //     navigateAndReset("HomeScreen", { uid: user.data().uid })
                        // else
                        //     {
                        //         //console.log("not user")
                        //         auth().signOut().then(() => {
                        //             const val = Util.getUserType(tab)
                        //             Util.showMessage("error","Oops!",`This account is already associated with ${user.data().userType}.`)
                        //         })
                        //         .catch(error=>{
                        //             console.log(error)
                        //         })
                        //     }
                    
                }
                else {
                    setUserData(fullName)
                }
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const setUserData = async (fullName) => {
        const user = auth().currentUser
        //console.log(user)
        try {
            setLoading(true)
            await firestore()
                .collection('Users')
                .doc(user.uid)
                .set({
                    name: fullName ? fullName : user.displayName,
                    email: user.providerData[0].email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    //lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                    //userType:Util.getUserType(tab),
                    profileCompleted:false,
                    // phoneVerified: false,
                    uid: user.uid,
                    // status: "pending"
                })
            // if (tab != 1)
            //     sendUnderReviewEmail(fullName ? fullName : user.displayName, user.email ? user.email : user.providerData[0].email)
            await AsyncStorage.setItem("userType",Util.getUserType(tab))
            navigateAndReset("HomeScreen", { uid: user.uid })
        } catch (error) {
            console.log(error)
            Util.showMessage("error", "Error", error.message)
        }
        finally {
            setLoading(false)
        }
    }
    const googleLogIn = async () => {
        try {
            // Check if your device supports Google Play
            setLoading(true)
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const user = await auth().signInWithCredential(googleCredential);

            handleUser()
        } catch (error) {
            console.log(error)
            if (error.code == "auth/account-exists-with-different-credential") {
                Util.showMessage("error", "Error", "An account already exists with the same email address")
            }
            // else
            //     Util.showMessage("error", "Error", error?.message)
        }
        finally {
            setLoading(false)
        }

    }
    const appleLogin = async () => {
        try {
            setLoading(true)
            // Start the sign-in request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });

            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identify token returned');
            }

            // Create a Firebase credential from the response
            const { identityToken, nonce, fullName } = appleAuthRequestResponse;
            console.log(fullName)
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
            // Sign the user in with the credential
            await auth().signInWithCredential(appleCredential);
            handleUser(fullName.givenName ? fullName.givenName : "User")
        }
        catch (error) {
            if (error.code == "auth/account-exists-with-different-credential") {
                Util.showMessage("error", "Error", "An account already exists with the same email address")
            }
            // else
            //     Util.showMessage("error", "Error", error?.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <KeyboardAwareScrollView
            bounces={false}
            style={{ flex: 1,backgroundColor:colors.backgroundColor }}
            keyboardShouldPersistTaps={"handled"}
        // stickyHeaderHiddenOnScroll
        >
            <Image source={images.bgTopImage} style={{width:"100%"}} resizeMode='cover'/>
            <Header back extraStyle={styles.header} navigation={navigation}/>
                <View
                style={styles.container}>
                {/* <Header navigation={navigation} back /> */}
                    <Text style={styles.login}>
                        {`Welcome Back!`}
                    </Text>
                    <Text style={styles.loginSmall}>
                        {`Enter your email & password to login`}
                    </Text>
                <View style={styles.mainView}>
                    {/* <Text style={styles.areYou}>Welcome Back!</Text> */}
                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.medium }}
                        //iconName={"email-outline"}
                        placeholder="Email"
                        //value={}
                        value={email}
                        onChangeText={(txt) => setEmail(txt)}
                        subPlace={"Enter your email"}
                    />
                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.small }}
                        //iconName={"lock-outline"}
                        isPass
                        placeholder={"Password"}
                        value={pass}
                        onChangeText={(txt) => setPass(txt)}
                        subPlace={"Enter your password"}

                    />
                    {/* <ClickableText
                        title={"Forgot Password?"}
                        extraStyle={styles.forgot}
                        onPress={handleForget}
                        containerStyle={{borderBottomWidth:1,borderBottomColor:"white"}}
                    /> */}
                    <MyButton
                        title={"Login"}
                        containerStyle={styles.btn}
                        onPress={handleLogin}
                        loading={loading}
                        txtStyle={{
                            color:"white",
                            fontFamily:fonts.medium
                        }}
                    />
                    <Link
                        mt={1}
                        onPress={handleForget}
                        _text={{
                            color:"black",
                            textDecoration:"none"
                        }}
                        style={{
                            alignSelf: "flex-end",
                        }}
                    >
                        Forgot Password?
                    </Link>
                    <View style={styles.borderViewContainer}>
                        <View style={styles.borderView}></View>
                        <Text style={styles.or}>  OR  </Text>
                        <View style={styles.borderView}></View>
                    </View>
                    <HStack justifyContent="center" space={4}>
                        <Button
                            _pressed={{backgroundColor:"white"}}
                            onPress={googleLogIn}
                            leftIcon={
                                <Image source={images.google} style={styles.icon} />
                            }
                            _text={{color:colors.appDefaultColor,fontWeight:'medium'}}
                            bg={"white"}
                            borderWidth={1}
                            borderColor={colors.borderColor}
                            borderRadius={10}
                            //flex={1}
                            //style={styles.socialBtn}
                        />
                        {
                            Platform.OS == "ios" &&
                            <Button
                                _pressed={{ backgroundColor: "white" }}
                                bg={"white"}
                                onPress={appleLogin}
                                borderWidth={1}
                                borderColor={colors.borderColor}
                                borderRadius={10}
                                leftIcon={
                                    <Image source={images.apple} style={[styles.icon, { tintColor: colors.black }]} />
                                }
                                _text={{ color: colors.appDefaultColor,fontWeight:"medium"}}
                            // backgroundColor: colors.darkGreyBtn, flex: 1 }}
                           />
                        }
                    </HStack>
                    <View style={{ flexDirection: "row", justifyContent: 'center',alignItems:"center" }}>
                        <Text style={styles.register}>Don't have an account?</Text>
                        <ClickableText
                            title={"Sign Up"}
                            extraStyle={[styles.or, { color: colors.black }]}
                            onPress={() => navigation.navigate("UserRegister", { tab })}
                        />
                         {/* <Link
                             onPress={() => navigation.navigate("UserRegister", { tab })}
                            _text={{
                                color: "white",
                                fontWeight:800
                            }}
                        >
                            Sign Up
                        </Link> */}
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
export default UserLogin