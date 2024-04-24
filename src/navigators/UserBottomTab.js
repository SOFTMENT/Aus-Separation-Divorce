import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import fonts from '../../assets/fonts';
import CategoryIcon from '../assets/svgs/category.svg';
import HomeIcon from '../assets/svgs/home.svg';
import ProfileIcon from '../assets/svgs/profile.svg';
import SearchIcon from '../assets/svgs/search.svg';
import { fontSizes } from '../common/variables';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import UserProfile from '../screens/UserScreens/UserProfile';
import ListingDetail from '../screens/UserScreens/ListingDetail';
import LocationSelectorScreen from '../screens/UserScreens/LocationSelectorScreen';
import UserHome from '../screens/UserScreens/UserHome';
import colors from '../theme/colors';
import CategoryScreen from '../screens/UserScreens/CartegoryScreen';
import AdvertisersByCategory from '../screens/UserScreens/AdvertisersByCategory';
import PDFViewer from '../screens/PDFViewer';
const Tab = createBottomTabNavigator();
const AdHomeStack = createNativeStackNavigator()
const AdOrderStack = createNativeStackNavigator()
const InboxStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const CategoryStack = createNativeStackNavigator()
const SearchStack = createNativeStackNavigator()

const MySeachStack = () => {
    return(
        <SearchStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <SearchStack.Screen name='SearchScreen' component={SearchScreen}/>
            <SearchStack.Screen name='ListingDetail' component={ListingDetail}/>

            {/* <ProfileStack.Screen name='NotificationScreen' component={NotificationScreen}/> */}
        </SearchStack.Navigator>
    )
}
const MyCategoryStack = () => {
    return(
        <CategoryStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <CategoryStack.Screen name='CategoryScreen' component={CategoryScreen}/>
            <CategoryStack.Screen name='AdvertisersByCategory' component={AdvertisersByCategory}/>
            <CategoryStack.Screen name='ListingDetail' component={ListingDetail}/>

            {/* <ProfileStack.Screen name='NotificationScreen' component={NotificationScreen}/> */}
        </CategoryStack.Navigator>
    )
}
const MyProfileStack = () => {
    return(
        <ProfileStack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <ProfileStack.Screen name='ProfileScreen' component={UserProfile}/>
            <ProfileStack.Screen name='NotificationScreen' component={NotificationScreen}/>
            <ProfileStack.Screen name='PDFViewer' component={PDFViewer}/>
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
            <AdHomeStack.Screen name='UserHome' component={UserHome}/>
            <AdHomeStack.Screen name='LocationSelectorScreen' component={LocationSelectorScreen}/>
            <AdHomeStack.Screen name='ListingDetail' component={ListingDetail}/>
            <AdOrderStack.Screen name='PersonalChat' component={Chat}/>
            <AdHomeStack.Screen name='AdvertisersByCategory' component={AdvertisersByCategory}/>
        </AdHomeStack.Navigator>
    )
}

function UserBottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                //tabBarHideOnKeyboard:true,
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: colors.white,
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
                    fontFamily:fonts.regular,
                    fontSize:fontSizes.extraExtraSmall
                },
                tabBarActiveTintColor: colors.appPrimary,
                tabBarInactiveTintColor: "#8B8B8B",
            }}
        >
            <Tab.Screen name="Home" component={MyAdHomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        console.log(color)
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                                <HomeIcon width={size} height={size} fill={color}/>
                            </View>
                        )
                    }
                }}
            />

            <Tab.Screen name="Search" component={MySeachStack}
                options={{
                    title:"Search",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                             <SearchIcon width={size} height={size} fill={color}/>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="CategoryStack" component={MyCategoryStack}
                options={{
                    title:'Category',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                            <CategoryIcon width={size} height={size} fill={color}/>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Setting" component={MyProfileStack}
                options={{
                    title:'Profile',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View style={[styles.activeBackground,{backgroundColor:colors.appDefaultColor == color?"white":"transparent"}]}>
                            <ProfileIcon width={size} height={size} fill={color}/>
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