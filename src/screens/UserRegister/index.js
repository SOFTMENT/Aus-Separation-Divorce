import appleAuth from '@invertase/react-native-apple-authentication';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Button, Stack, useDisclose } from 'native-base';
import React, { useRef, useState } from 'react';
import { Image, Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from "../../assets/images";
import Util from '../../common/util';
import { spacing } from "../../common/variables";
import MyButton from "../../components/MyButton";
import MyTextInput from "../../components/MyTextInput";
import { navigateAndReset } from '../../navigators/RootNavigation';
import colors from '../../theme/colors';
import styles from "./styles";
import Header from '../../components/Header';
import MemberShipActionSheet from '../../components/MembershipActionSheet';
const UserRegister = (props) => {
    const { navigation, route } = props
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [countryCode, setCountryCode] = useState("+41")
    const phoneInput = useRef();
    const [loading, setLaoding] = useState(false)
    const { tab } = route.params ?? {}
    const inset = useSafeAreaInsets()
    
    const handleRegister = async() => {
        //console.log(tab, phone)
        if (!name.trim()) {
            Util.showMessage("error", "Oops!", "Please Enter Name")
            return
        }
        if (!email.trim()) {
            Util.showMessage("error", "Oops!", "Please Enter Email")
            return
        }
        // if (tab == 2 && phone.length == 0) {
        //     Util.showMessage("error", "Oops!", "Please Enter Phone Number")
        //     return
        // }
        if (!pass) {
            Util.showMessage("error", "Oops!", "Please Enter Password")
            return
        }
        if (pass.length < 6) {
            Util.showMessage("error", "Oops!", "Password must contain at least 6 digit")
            return
        }
        // if (!cnfPass) {
        //     Util.showMessage("error", "Oops!", "Please Confrirm Password")
        //     return
        // }
        // if (pass != cnfPass) {
        //     Util.showMessage("error", "Oops!", "Password and Confirm password doesn't match")
        //     return
        // }
        // if(tab == 2){
        //     onOpen()
        // }
        // else{
        //     createUser()
        // }
        createUser()
        // await handleMembership()
        // .then((data)=>{
        //     console.log(data)
        //     return
        // })
        // .catch(()=>{

        // })
    }
    const createUser = async () => {
        try {
            setLaoding(true)
            await auth().createUserWithEmailAndPassword(
                email, pass
            )
            const user = auth().currentUser
            await firestore()
                .collection('Users')
                .doc(user.uid)
                .set({
                    ...(tab == 2 && {membershipActive:false}),
                    name: name.trim() + " " + lastName.trim(),
                    email: email.trim(),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    // lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                    //userType: Util.getUserType(tab),
                    //...(tab == 2 && { accountStatus:false,balance:0 }),
                    accountStatus:false,balance:0,
                    profileCompleted: false,
                    // phoneVerified: false,
                    uid: user.uid,
                })
                if (user) {
                    await user.sendEmailVerification()
                    .then(() => {

                    })
                    Util.showMessage("success", "Registration successful", "A verification link has been sent to your email.(Check your spam in case the email is not in your inbox.")
                    navigateAndReset("LoginScreen",{tab})
                }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Util.showMessage("error", "Error", 'That email address is already in use!');
            }
            else if (error.code === 'auth/invalid-email') {
                Util.showMessage("error", "Error", 'That email address is invalid!');
            }
            else {
                Util.showMessage("error", "Error", 'Something Went Wrong');

            }
        }
        finally {
            setLaoding(false)
        }
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
        //sendNewProEmailAdmin(name, email)
        try {
            var body = new FormData()
            body.append('name', name)
            body.append('email', email)
            body.append('subject', "Welcome to Now Show")
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
    // }
    const appleLogin = async () => {
        try {
            setLaoding(true)
            // Start the sign-in request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identify token returned');
            }

            // Create a Firebase credential from the response
            const { identityToken, nonce, fullName } = appleAuthRequestResponse;
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
            setLaoding(false)
        }
    }
    const handleUser = async (fullName) => {
        const userData = auth().currentUser
        await firestore()
            .collection("Users")
            .doc(userData.uid)
            .get()
            .then(async(user) => {
                if (user.exists) {
                    if (user.data().isDeleted) {
                        if (auth().currentUser.providerData[0].providerId == "google.com") {
                            //await GoogleSignin.revokeAccess();
                            await GoogleSignin.signOut();
                        }
                        auth().signOut().then(() => {
                            Util.showMessage("error","Oops!","This account has been marked as deleted, please register with new email.")
                        })
                    }
                    else {
                            if((user.data().userType == Util.getUserType(tab)))
                            navigateAndReset("HomeScreen", { uid: user.data().uid })
                        else
                            {
                                //console.log("not user")
                                auth().signOut().then(() => {
                                    const val = Util.getUserType(tab)
                                    Util.showMessage("error",'Oops!',`This account is already associated with ${user.data().userType}.`)
                                })
                                .catch(error=>{
                                    console.log(error)
                                })
                            }
                    }
                }
                else {
                    setUserData(fullName)
                }
            })
    }
    const setUserData = async (fullName) => {
        const user = auth().currentUser
        //console.log(fullName)
        try {
            await firestore()
                .collection('Users')
                .doc(user.uid)
                .set({
                    name: fullName ? fullName : user.displayName,
                    email: user.providerData[0].email,
                    ...(tab == 2 && {membershipActive:false}),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    //lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                    userType: Util.getUserType(tab),
                    profileCompleted: false,
                    // phoneVerified: false,
                    uid: user.uid,
                    //...(tab == 2 && { accountStatus:false,balance:0 }),
                    accountStatus:false,balance:0,
                    // status: "pending"
                })
            // if (tab != 1)
            //     sendUnderReviewEmail(fullName ? fullName : user.displayName, user.email ? user.email : user.providerData[0].email)
            navigateAndReset("HomeScreen", { uid: user.uid })
        } catch (error) {
            Util.showMessage("error", "Error", error.message)
        }
    }
    const googleLogIn = async () => {
        try {
            setLaoding(true)
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const user = await auth().signInWithCredential(googleCredential);

            handleUser()
        } catch (error) {
            if (error.code == "auth/account-exists-with-different-credential") {
                Util.showMessage("error", "Error", "An account already exists with the same email address")
            }
            // else
            //     Util.showMessage("error", "Error", error?.message)
        }
        finally {
            setLaoding(false)
        }

    }
    return (
        <KeyboardAwareScrollView
            bounces={false}
            style={{ flex: 1,backgroundColor:colors.backgroundColor}}
            keyboardShouldPersistTaps={"handled"}
        // stickyHeaderHiddenOnScroll
        >
            <Image source={images.bgTopImage} width={"100%"}/>
            <Header back extraStyle={styles.header} navigation={navigation}/>
            <View
                style={styles.container}>
                <Text style={styles.login}>
                        {`Sign Up`}
                    </Text>
                    <Text style={styles.loginSmall}>
                        {`Let's create your account`}
                    </Text>

                <View style={styles.mainView}>
                    {/* <Text style={styles.areYou}>
                        Register
                    </Text> */}
                    {
                        tab == 1 ?
                        <View>
                            <MyTextInput
                                containerStyle={{ marginVertical: spacing.small }}
                                //iconName={"account-outline"}
                                placeholder={"First Name"}
                                value={name}
                                onChangeText={(txt) => setName(txt)}
                                subPlace={"Enter your first name"}

                            />
                            <MyTextInput
                                containerStyle={{ marginVertical: spacing.small }}
                                //iconName={"account-outline"}
                                placeholder={"Last Name"}
                                subPlace={"Enter your last name"}
                                value={lastName}
                                onChangeText={(txt) => setLastName(txt)}
                            />
                        </View>:
                        <MyTextInput
                            containerStyle={{ marginVertical: spacing.small }}
                            //iconName={"account-outline"}
                            placeholder={"Company Name"}
                            subPlace={"Enter your company name"}
                            value={name}
                            onChangeText={(txt) => setName(txt)}
                        />
                    }
                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.small }}
                        //iconName={"email-outline"}
                        placeholder="Email"
                        value={email}
                        onChangeText={(txt) => setEmail(txt.trim())}
                        subPlace={"Enter your email"}

                    />
                    

                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.small }}
                        //iconName={"lock-outline"}
                        isPass
                        placeholder={"Password"}
                        value={pass}
                        onChangeText={(txt) => setPass(txt)}
                        subPlace={"Enter password"}
                    />
                    <MyButton
                        title={"Sign up"}
                        containerStyle={styles.btn}
                        onPress={handleRegister}
                        loading={loading}
                        txtStyle={{color:'white'}}
                    />
                    {/* <View style={styles.borderViewContainer}>
                        <View style={styles.borderView}></View>
                        <Text style={styles.or}>  OR  </Text>
                        <View style={styles.borderView}></View>
                    </View>
                    <Stack direction={"column"} justifyContent="space-evenly" space={2}>
                        <Button
                            _pressed={{ backgroundColor: "white" }}
                            onPress={googleLogIn}
                            leftIcon={
                                <Image source={images.google} style={styles.icon} />
                            }
                            _text={{ color: colors.appDefaultColor,fontWeight:"medium"}}
                            bg={"white"}
                            borderWidth={1}
                            borderColor={'rgba(0, 0, 0, 0.17)'}
                            borderRadius={10}
                            flex={1}
                        //style={styles.socialBtn}
                        >Login with Google</Button>
                        {
                            Platform.OS == "ios" &&
                            <Button
                                _pressed={{ backgroundColor: "white" }}
                                flex={1}
                                bg={"white"}
                                onPress={appleLogin}
                                borderWidth={1}
                                borderColor={'rgba(0, 0, 0, 0.17)'}
                                borderRadius={10}
                                marginBottom={10}
                                leftIcon={
                                    <Image source={images.apple} style={[styles.icon, { tintColor: colors.black }]} />
                                }
                                _text={{ color: colors.appDefaultColor,fontWeight:"medium"}}
                            // backgroundColor: colors.darkGreyBtn, flex: 1 }}
                            >Login with Apple</Button>
                        }
                    </Stack> */}
                    {/* <View style={{ flexDirection: "row", justifyContent: 'center',alignItems:"center" }}>
                        <Text style={styles.register}>Already have an account?</Text>
                        <ClickableText
                            title={"Sign Up"}
                            extraStyle={[styles.or, { color: colors.appPrimaryDark }]}
                            onPress={() => navigation.navigate("UserRegister", { tab })}
                        />
                         <Link
                             onPress={() => navigation.navigate("UserLogin", { tab })}
                            _text={{
                                color: "white",
                                fontWeight:800
                            }}
                        >
                            Login
                        </Link>
                    </View> */}
                </View>
            </View>
           
        </KeyboardAwareScrollView>
    )
}
export default UserRegister