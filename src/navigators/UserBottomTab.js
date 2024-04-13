import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fonts from '../../assets/fonts';
import { fontSizes } from '../common/variables';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import SearchScreen from '../screens/SearchScreen';
import AdvertiserDetail from '../screens/UserScreens/ListingDetail';
import UserHome from '../screens/UserScreens/AdvertiserHome';
import AdvertiserOrderDetails from '../screens/UserScreens/AdvertiserOrderDetails';
import AdvertiserOrders from '../screens/UserScreens/AdvertiserOrders';
import AdvertiserProfile from '../screens/UserScreens/AdvertiserProfile';
import CategoryScreen from '../screens/UserScreens/CartegoryScreen';
import FavoritesScreen from '../screens/UserScreens/FavoritesScreen';
import PaymentScreen from '../screens/UserScreens/PaymentScreen';
import ServiceProviderProfiles from '../screens/UserScreens/ServiceProviderProfiles';
import colors from '../theme/colors';
import HomeIcon from '../assets/svgs/home.svg'
import LocationSelectorScreen from '../screens/UserScreens/LocationSelectorScreen';
import MyListingScreenUser from '../screens/UserScreens/MyListingScreenUser';
import ListingDetail from '../screens/UserScreens/ListingDetail';
import ListingBySupplier from '../screens/UserScreens/ListingBySupplier';
import NotificationScreen from '../screens/NotificationScreen';
import UserSearchHistory from '../screens/UserScreens/UserSearchHistory';
const Tab = createBottomTabNavigator();
const AdHomeStack = createNativeStackNavigator()
const AdOrderStack = createNativeStackNavigator()
const InboxStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const FavoriteStack = createNativeStackNavigator()
const MyFavoriteStack = () => {
    return(
        <FavoriteStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <FavoriteStack.Screen name='Favorite' component={FavoritesScreen}/>
            <FavoriteStack.Screen name='ListingDetail' component={ListingDetail}/>
        </FavoriteStack.Navigator>
    )
}
const MyProfileStack = () => {
    return(
        <ProfileStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <ProfileStack.Screen name='ProfileScreen' component={AdvertiserProfile}/>
            <ProfileStack.Screen name='NotificationScreen' component={NotificationScreen}/>
        </ProfileStack.Navigator>
    )
}
const MyInboxStack = () => {
    return(
        <InboxStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <InboxStack.Screen name='Inbox' component={Inbox}/>
            <InboxStack.Screen name='PersonalChat' component={Chat}/>
        </InboxStack.Navigator>
    )
}
const MyAdHomeStack = () => {
    return(
        <AdHomeStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <AdHomeStack.Screen name='AdHome' component={UserHome}/>
            <AdHomeStack.Screen name='MyListingScreenUser' component={MyListingScreenUser}/>
            <AdHomeStack.Screen name='LocationSelectorScreen' component={LocationSelectorScreen}/>
            <AdHomeStack.Screen name='ListingDetail' component={ListingDetail}/>
            <AdHomeStack.Screen name='ListingBySupplier' component={ListingBySupplier}/>
            <AdOrderStack.Screen name='PersonalChat' component={Chat}/>
            <AdHomeStack.Screen name='CategoryScreen' component={CategoryScreen}/>
            <AdHomeStack.Screen name='PaymentScreen' component={PaymentScreen}/>
            <AdHomeStack.Screen name='SearchScreen' component={SearchScreen}/>
            <AdHomeStack.Screen name='ServiceProviderProfiles' component={ServiceProviderProfiles}/>
            <AdHomeStack.Screen name='UserSearchHistory' component={UserSearchHistory}/>
        </AdHomeStack.Navigator>
    )
}
const MyAdOrderStack = () => {
    return(
        <AdOrderStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <AdOrderStack.Screen name='AdOrder' component={AdvertiserOrders}/>
            
            <AdOrderStack.Screen name='AdvertiserOrderDetails' component={AdvertiserOrderDetails}/>
        </AdOrderStack.Navigator>
    )
}
function UserBottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                //tabBarHideOnKeyboard:true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.black,
                    borderTopWidth: 0,
                    paddingBottom:Platform.OS == 'android' ? 7:15,
                    height:Platform.OS =="android"?60:70,
                    shadowOffset: {
                        width: 20,
                        height: 20,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 24,
                },
                tabBarIconStyle : {
                    
                },
                tabBarLabelStyle : {
                    fontFamily:fonts.bold,
                    fontSize:fontSizes.extraExtraSmall
                },
                tabBarActiveTintColor: colors.appDefaultColor,
                tabBarInactiveTintColor: "white",
            }}
        >
            <Tab.Screen name="Home" component={MyAdHomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                                <HomeIcon width={size} height={size} fill={color}/>
                            </View>
                        )
                    }
                }}
            />

            <Tab.Screen name="FavoritesScreen" component={MyFavoriteStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                            <Icon
                                as={MaterialCommunityIcons}
                                name='heart'
                                color={color}
                                size={size}
                            />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Chats" component={MyInboxStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                            <Icon
                                as={MaterialCommunityIcons}
                                name='email'
                                color={color}
                                size={size}
                            />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Setting" component={MyProfileStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                            <Icon
                                as={MaterialCommunityIcons}
                                name='account'
                                color={color}
                                size={size}
                            />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    );
}
export default UserBottomTab
const styles = StyleSheet.create({
    activeBackground:{padding:5,paddingHorizontal:10,borderRadius:20}
})