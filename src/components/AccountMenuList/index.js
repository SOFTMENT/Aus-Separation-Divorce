import firestore, { firebase } from '@react-native-firebase/firestore'
import axios from "axios"
import React, { useState } from "react"
import { Alert, Image, Linking, Text, TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import linkingUtil from "../../common/linkingUtil"
import { ACCOUNT_LINK, CREATE_ACCOUNT, PAYMENT_TRANSFER, SOFTMENT } from "../../config/Networksettings"
import AppConstant from "../../config/Constants"
import styles from "./styles"
import Util from '../../common/util'
import { Icon } from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import LoaderComponent from '../LoaderComponent'
import PopupMessage from '../PopupMessage'
import { setUserData } from '../../store/userSlice'
import colors from '../../theme/colors'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { navigateAndReset } from '../../navigators/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default AccountMenuList = (props) => {
    const { navigation, isUser } = props
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const { accountStatus, accountId, balance,userType } = useSelector(state => state.user.userData)
    const uid = auth().currentUser.uid
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
                            .update({
                               isDeleted:true,
                               status:"deleted"
                            })
                            if (auth().currentUser.providerData[0].providerId == "google.com") {
                                //await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                            }
                            await auth()
                                .signOut()
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
    const rateUs = () => {
        if (Platform.OS != 'ios') {
            //To open the Google Play Store
            Linking.openURL(`market://details?id=in.softment.sitesee`).catch(err =>
                alert('Please check for the Google Play Store')
            );
        } else {
            //To open the Apple App Store
            Linking.openURL(
                `itms-apps://itunes.apple.com/us/app/apple-store/6448141803?mt=8`
            ).catch(err => alert('Please check for the App Store'));
        }
    }
    const handleSuccess = () => {
        setSuccessPopup(false)
    }
    
   
    const driverMenu = [
        
        // {
        //     id: "about",
        //     label: "About Us",
        //     subMenu: [
        //         // {
        //         //     label:"Privacy Policy",
        //         //     icon:images.privacyPolicy
        //         // },
        //         // {
        //         //     label: "Terms & Conditions",
        //         //     icon: "file-document-outline",
        //         //     onClick: () => {
        //         //         linkingUtil.openBrowser("https://www.softment.in/about-us/")
        //         //     }
        //         // },
        //         // {
        //         //     label: "App Developer",
        //         //     icon: "code-tags",
        //         //     onClick: () => {
        //         //         linkingUtil.openBrowser(SOFTMENT)
        //         //     }
        //         // }
        //     ]
        // },
        {
            id: "other",
            label: "Legal Agreements",
            subMenu: [
                {
                    label: "Rate App",
                    icon: "star-half-full",
                    onClick: rateUs,
                    asMaterial:true
                },
                // {
                //     label: "Contact Us",
                //     icon: "email-outline",
                //     onClick: () => {
                //         linkingUtil.openMail(AppConstant.MAIL)
                //     }
                // },
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
        },


    ]
    const menu = [
        
        // {
        //     id: "about",
        //     label: "About Us",
        //     subMenu: [
        //         // {
        //         //     label:"Privacy Policy",
        //         //     icon:images.privacyPolicy
        //         // },
        //         {
        //             label: "Terms & Conditions",
        //             icon: "file-document-outline",
        //             onClick: () => {
        //                 //linkingUtil.openBrowser("https://www.cheap-skate.us/")
        //             }
        //         },
        //         // {
        //         //     label: "App Developer",
        //         //     icon: "code-tags",
        //         //     onClick: () => {
        //         //         linkingUtil.openBrowser(SOFTMENT)
        //         //     }
        //         // }
        //     ]
        // },
        {
            id: "Settings",
            label: "",
            subMenu: [
                
                {
                    label: "Notifications",
                    icon: "bell",
                    //onClick: rateUs,
                    asMaterial:true,
                    onClick:()=>{
                        navigation.navigate("NotificationScreen")
                    }
                },
                {
                    label: "Share App",
                    icon: "share-circle",
                    onClick: rateUs,
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
                        linkingUtil.openBrowser(SOFTMENT)
                    }
                },
                {
                    label: "Terms & Conditions",
                    icon: "text-box",
                    asMaterial:true,
                    onClick: () => {
                        linkingUtil.openBrowser(SOFTMENT)
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
    const activeMenu = menu
    return (
        <View>
            {
                activeMenu.map((item) => {
                    return (
                        <View key={item.id}>
                            {item.label&& <Text style={styles.settingsText}>{item.label}</Text>}
                            {
                                item.subMenu.map(subItem => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.subMenu}
                                            onPress={subItem.onClick}
                                            key={subItem.label}
                                            disabled={loaderVisibility || subItem.disabled}
                                        >
                                            <View style={{padding:4,justifyContent:"center",alignItems:'center',backgroundColor:'black',borderRadius:30}}>
                                            <Icon
                                                // style={styles.subMenuImage}
                                                name={subItem.icon}
                                                as={subItem.asMaterial?MaterialCommunityIcons: Ionicons}
                                                size={"md"}
                                                color="white"
                                            />
                                            </View>
                                            <View style={styles.subMenuContainer}>
                                                <Text style={styles.subMenuTitle}>{subItem.label}</Text>
                                                {
                                                    subItem.subLabel &&
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
                                                    </View>
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
            <LoaderComponent visible={loaderVisibility} />
            <PopupMessage visible={successPopup} title="Payment Successful" subtitle="Great" onPress={handleSuccess}/>
        </View>
    )
}