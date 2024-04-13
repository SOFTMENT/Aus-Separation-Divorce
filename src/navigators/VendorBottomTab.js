import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, View } from 'native-base';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../assets/fonts';
import HomeIcon from '../assets/svgs/home.svg';
import { fontSizes } from '../common/variables';
import Chat from '../screens/Chat';
import Inbox from '../screens/Inbox';
import AccountDetailsScreen from '../screens/VendorScreens/AccountDetailsScreen';
import MyListingScreen from '../screens/VendorScreens/MyListingScreen';
import VendorHome from '../screens/VendorScreens/VendorHome';
import VendorProfile from '../screens/VendorScreens/VendorProfile';
import colors from '../theme/colors';
import AddListing from '../screens/VendorScreens/AddListing';
import EditListing from '../screens/VendorScreens/EditListing';
import NotificationScreen from '../screens/NotificationScreen';
import VendorAllListing from '../screens/VendorScreens/VendorAllListing';
import VendorListingDetail from '../screens/VendorScreens/VendorListingDetail';
const Tab = createBottomTabNavigator();
const VendorSpacesStack = createNativeStackNavigator();
const InboxStack = createNativeStackNavigator();
const VendorHomeStack = createNativeStackNavigator();
const VendorAddListing = createNativeStackNavigator();
const VendorProfileStack = createNativeStackNavigator();
const MyVendorProfileStack = () => {
  return (
    <VendorProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <VendorProfileStack.Screen
        name="VendorProfile"
        component={VendorProfile}
      />
            <VendorProfileStack.Screen name='NotificationScreen' component={NotificationScreen}/>

      <VendorProfileStack.Screen
        name="VendorAccountDetail"
        component={AccountDetailsScreen}
      />
    </VendorProfileStack.Navigator>
  );
};
const MyVendorAddListing = () => {
  return (
    <VendorAddListing.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <VendorAddListing.Screen name="AddListing" component={AddListing} />
    </VendorAddListing.Navigator>
  );
};
const MyVendorHomeStack = () => {
  return (
    <VendorHomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <VendorHomeStack.Screen name="HomeScreen" component={VendorHome} />
      <VendorHomeStack.Screen name="PersonalChat" component={Chat} />
      <VendorHomeStack.Screen name="MyListingScreen" component={MyListingScreen} />
      <VendorHomeStack.Screen name="VendorAllListing" component={VendorAllListing} />
      <VendorHomeStack.Screen name="EditListing" component={EditListing} />
      <VendorHomeStack.Screen name='LocationSelectorScreen' component={LocationSelectorScreen}/>

    </VendorHomeStack.Navigator>
  );
};
const MyInboxStack = () => {
  return (
    <InboxStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <InboxStack.Screen name="Inbox" component={Inbox} />
      <InboxStack.Screen name="PersonalChat" component={Chat} />
      <InboxStack.Screen name='VendorListingDetail' component={VendorListingDetail}/>

    </InboxStack.Navigator>
  );
};
function VendorBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        //tabBarHideOnKeyboard:true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.black,
          borderTopWidth: 0,
          paddingBottom: Platform.OS == 'android' ? 7 : 15,
          height: Platform.OS == 'android' ? 60 : 70,
          shadowOffset: {
            width: 20,
            height: 20,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
        tabBarIconStyle: {},
        tabBarLabelStyle: {
          fontFamily: fonts.bold,
          fontSize: fontSizes.extraExtraSmall,
        },
        tabBarActiveTintColor: colors.appDefaultColor,
        tabBarInactiveTintColor: "white",
      }}>
      <Tab.Screen
        name="Home"
        component={MyVendorHomeStack}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  {
                    backgroundColor:
                      colors.appDefaultColor == color ? 'white' : 'transparent',
                  },
                ]}>
                <HomeIcon width={size} height={size} fill={color} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="AddListings"
        component={MyVendorAddListing}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  {
                    backgroundColor:
                      colors.appDefaultColor == color ? 'white' : 'transparent',
                  },
                ]}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="plus-box-multiple"
                  color={color}
                  size={size}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Chats"
        component={MyInboxStack}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  {
                    backgroundColor:
                      colors.appDefaultColor == color ? 'white' : 'transparent',
                  },
                ]}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="forum"
                  color={color}
                  size={size}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={MyVendorProfileStack}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <View
                style={[
                  styles.activeBackground,
                  {
                    backgroundColor:
                      colors.appDefaultColor == color ? 'white' : 'transparent',
                  },
                ]}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="account"
                  color={color}
                  size={size}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default VendorBottomTab;
const styles = StyleSheet.create({
  activeBackground: {padding: 5, paddingHorizontal: 10, borderRadius: 20},
});
