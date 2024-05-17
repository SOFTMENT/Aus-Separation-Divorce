import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Icon, useDisclose } from 'native-base'
import React, { useState } from "react"
import { Alert, Linking, Platform, Share, Text, TouchableOpacity, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import Util from '../../common/util'
import { navigateAndReset } from '../../navigators/RootNavigation'
import LoaderComponent from '../LoaderComponent'
import PopupMessage from '../PopupMessage'
import styles from "./styles"
import SubscriptionModal from '../../screens/AdvertiserScreens/SubscriptionModal'
export default AccountMenuList = (props) => {
    const { navigation, isUser } = props
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const {isOpen, onToggle, onClose, onOpen} = useDisclose();
    const {userData, isLive} = useSelector(state => state.user);
    const deleteAccount = async() => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to Delete your account?",
            [
                {
                    text: "No",
                    onPress: () => {

                    }
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            const uid = auth().currentUser.uid
                           //  await auth().currentUser.delete()
                           await AsyncStorage.removeItem("userType")
                            await firestore()
                            .collection("Users")
                            .doc(uid)
                            .delete()
                            await auth().currentUser.delete()
                            // if (auth().currentUser.providerData[0].providerId == "google.com") {
                            //     //await GoogleSignin.revokeAccess();
                            //     await GoogleSignin.signOut();
                            // }
                            // await auth()
                            //     .signOut()
                            Util.showMessage("success","Account Deleted")
                            navigateAndReset("OnboardingScreen")
                           } catch (error) {
                                Util.showMessage("error","Error",error.message)
                           }
                    }
                }
            ]
        )
    }
    const logout = async () => {
        try {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text: "No",
                        onPress: () => {

                        }
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            await AsyncStorage.removeItem("userType")
                            if (auth().currentUser.providerData[0].providerId == "google.com") {
                                //await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                            }
                            auth()
                                .signOut()
                                .then(() => navigateAndReset("OnboardingScreen"));
                        }
                    }
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }
    const switchUser = async () => {
        try {
            await AsyncStorage.removeItem("userType")
            // if (auth().currentUser.providerData[0].providerId == "google.com") {
            //     //await GoogleSignin.revokeAccess();
            //     await GoogleSignin.signOut();
            // }
            auth()
                .signOut()
                .then(() => navigateAndReset("OnboardingScreen"));
        } catch (error) {
            console.log(error)
        }
    }
    const shareApp = async() => {
        try {
            const result = await Share.share({
              message: 'Check out this awesome app!', // Message to be shared
              url: Platform.OS == "ios"?"https://apps.apple.com/us/app/australian-separation-divorce/id6497652602":""
              // You can also include additional options like title, subject, etc.
            });
            
            if (result.action === Share.sharedAction) {
              console.log('App shared successfully');
            } else if (result.action === Share.dismissedAction) {
              console.log('Share cancelled');
            }
          } catch (error) {
            console.error('Error sharing app:', error.message);
          }
    }
    const rateUs = () => {
        if (Platform.OS != 'ios') {
            //To open the Google Play Store
            Linking.openURL(`market://details?id=com.hjmt.ausseprationdivorce`).catch(err =>
                alert('Please check for the Google Play Store')
            );
        } else {
            //To open the Apple App Store
            Linking.openURL(
                `itms-apps://itunes.apple.com/us/app/apple-store/6497652602?mt=8`
            ).catch(err => alert('Please check for the App Store'));
        }
    }
    const handleSuccess = () => {
        setSuccessPopup(false)
    }
    const handleSubscription = () => {
        onOpen()
    }
    const userMenu = [
        
        {
            id: "Settings",
            label: "About Us",
            subMenu: [
                {
                    label: "Share App",
                    icon: "share-circle",
                    onClick: shareApp,
                    asMaterial:true
                },
               
                {
                    label: "Rate App",
                    icon: "star-half-full",
                    onClick: rateUs,
                    asMaterial:true
                },
            ]
        },
        {
            id: "other",
            label: "Legal Agreements",
            subMenu: [
                {
                    label: "Privacy Policy",
                    icon: "file-document-edit",
                    asMaterial:true,
                    onClick: () => {
                        navigation.navigate("PDFViewer",{title:"Privacy Policy",uri:'https://firebasestorage.googleapis.com/v0/b/aus-sepration-divorce.appspot.com/o/Documents%2FAS%26D%20Privacy%20Policy.pdf?alt=media&token=4162c64c-da26-417a-940c-d07505ba8983'})
                    }
                },
                {
                    label: "Terms & Conditions",
                    icon: "text-box",
                    asMaterial:true,
                    onClick: () => {
                        navigation.navigate("PDFViewer",{title:"Terms & Conditions",uri:'https://firebasestorage.googleapis.com/v0/b/aus-sepration-divorce.appspot.com/o/Documents%2FAS%26D%20Terms%20and%20conditions.pdf?alt=media&token=d0c36a1f-1b9d-4c5d-b3d1-f8a5e4213acb'})
                    }
                },
                {
                    label: "Switch profile",
                    icon: "log-out",
                    onClick: () => {
                        switchUser()
                    }
                },
            ]
        }

    ]
    const menu = [
        
        {
            id: "Settings",
            label: "About Us",
            subMenu: [
                {
                    label: "Subscription",
                    icon: "share-circle",
                    onClick: handleSubscription,
                    asMaterial:true
                },
                {
                    label: "Share App",
                    icon: "share-circle",
                    onClick: shareApp,
                    asMaterial:true
                },
               
                {
                    label: "Rate App",
                    icon: "star-half-full",
                    onClick: rateUs,
                    asMaterial:true
                },
            ]
        },
        {
            id: "other",
            label: "Legal Agreements",
            subMenu: [
                {
                    label: "Privacy Policy",
                    icon: "file-document-edit",
                    asMaterial:true,
                    onClick: () => {
                        navigation.navigate("PDFViewer",{title:"Privacy Policy",uri:'https://firebasestorage.googleapis.com/v0/b/aus-sepration-divorce.appspot.com/o/Documents%2FAS%26D%20Privacy%20Policy.pdf?alt=media&token=4162c64c-da26-417a-940c-d07505ba8983'})
                    }
                },
                {
                    label: "Terms & Conditions",
                    icon: "text-box",
                    asMaterial:true,
                    onClick: () => {
                        navigation.navigate("PDFViewer",{title:"Terms & Conditions",uri:'https://firebasestorage.googleapis.com/v0/b/aus-sepration-divorce.appspot.com/o/Documents%2FAS%26D%20Terms%20and%20conditions.pdf?alt=media&token=d0c36a1f-1b9d-4c5d-b3d1-f8a5e4213acb'})
                    }
                },
                {
                    label: "Logout",
                    icon: "log-out",
                    onClick: () => {
                        logout()
                    }
                },
                {
                    label: "Delete Account",
                    icon: "delete",
                    asMaterial:true,
                    //subLabel:`AED ${balance?.toString()}`,
                    onClick: () => {
                        deleteAccount()
                    },
                    //disabled:true
                },
            ]
        }

    ]
    const activeMenu =userData?menu:userMenu
    return (
        <View>
            {
                activeMenu.map((item) => {
                    return (
                        <View key={item.id}>
                            {item.label&& <Text style={styles.settingsText}>{item.label}</Text>}
                            {
                                item.subMenu.map((subItem,index) => {
                                    if(subItem.label != "Subscription"||(subItem.label == "Subscription" && isLive &&  userData?.subscriptionId))
    
                                    return (
                                        <TouchableOpacity
                                            style={[styles.subMenu,index==item.subMenu.length-1&&{borderBottomWidth:0}]}
                                            onPress={subItem.onClick}
                                            key={subItem.label}
                                            disabled={loaderVisibility || subItem.disabled}
                                        >
                                            {/* <View style={{padding:4,justifyContent:"center",alignItems:'center',backgroundColor:'black',borderRadius:30}}>
                                            <Icon
                                                // style={styles.subMenuImage}
                                                name={subItem.icon}
                                                as={subItem.asMaterial?MaterialCommunityIcons: Ionicons}
                                                size={"md"}
                                                color="white"
                                            />
                                            </View> */}
                                            <View style={styles.subMenuContainer}>
                                                <Text style={styles.subMenuTitle}>{subItem.label}</Text>
                                                {
                                                    subItem.subLabel ?
                                                    <View style={styles.subsubView}>
                                                        <Text style={styles.subsubtitle}>{subItem.subLabel}</Text>
                                                        {
                                                            subItem.subImage &&
                                                            <Icon
                                                                // style={styles.subMenuImage}
                                                                name={"log-out"}
                                                                as={Ionicons}
                                                                size={"sm"}
                                                                color="#414245"
                                                            />
                                                        }
                                                    </View>:
                                                     <Icon
                                                     // style={styles.subMenuImage}
                                                     name={"chevron-forward-outline"}
                                                     as={Ionicons}
                                                     size={"sm"}
                                                     color="#B0B0B0"
                                                 />
                                                }
                                               
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
            <SubscriptionModal
                isOpen={isOpen}
                onClose={onClose}
            />
            <LoaderComponent visible={loaderVisibility} />
            <PopupMessage visible={successPopup} title="Payment Successful" subtitle="Great" onPress={handleSuccess}/>
        </View>
    )
}