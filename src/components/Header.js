import {HStack, Icon, IconButton, Menu} from 'native-base';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../assets/fonts';
import {fontSizes, itemSizes, spacing} from '../common/variables';
import {navigateAndReset} from '../navigators/RootNavigation';
import ReportUserDialog from './ReportUserDialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Helper from '../common/Helper';
import Share from 'react-native-share'
import colors from '../theme/colors';
const Header = ({
  navigation,
  title,
  extraStyle,
  back,
  isSearch,
  handleSearch,
  searchValue,
  rightIcon,
  onRightIconPress,
  rightIconColor,
  onBackPress,
  rightIsComponent,
  rightIsSupplier,
  normalBack,
  titleStyle
}) => {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = useSelector(state=>state.user.userData)
  const handleBack = () => {
    try {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigateAndReset('OnboardingScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShare = async() => {
    try { 
      const imageLink = await Helper.imageUrlToBase64(userData.profilePic)
      Share.open({
        title:userData.name,
        message:userData.shareLink,
        url:imageLink
      })
} catch (error) {
    console.log(error)
}
    //userData.share
  }
  return (
    <View style={[styles.container, extraStyle, {paddingTop: Platform.OS == "ios"?insets.top:insets.top+15},normalBack&&{paddingLeft:0}]}>
      {back ? (
        normalBack?
        <IconButton
          onPress={onBackPress ? onBackPress : handleBack}
          _pressed={{backgroundColor: 'transparent'}}
          //style={{backgroundColor:"white",borderRadius:30}}
          icon={
            <Icon
              as={Ionicons}
              size="lg"
              name="arrow-back"
              color={colors.black}
            />
          }
        />:
        <IconButton
          onPress={onBackPress ? onBackPress : handleBack}
          _pressed={{backgroundColor: 'transparent'}}
          style={{backgroundColor:"white",borderRadius:30}}
          icon={
            <Icon
              as={Ionicons}
              size="lg"
              name="arrow-back"
              color={colors.appPrimary}
            />
          }
        />
      ) : (
        <View />
      )}
      {isSearch ? (
        <HStack flex={1} bgColor={colors.whiteDark} px={2} mt={Platform.OS=="ios"?0:4} py={Platform.OS=="ios"?3:1}borderRadius={20} w={'100%'} alignItems={"center"}>
          <Icon
            as={MaterialCommunityIcons}
            size="lg"
            name={'magnify'}
            color={'black'}
            mr={2}
          />
          <TextInput
            placeholder="Search wishlist"
            style={[styles.txtInput,{flex:1}]}
            autoCapitalize="none"
            autoComplete={'off'}
            onChangeText={handleSearch}
            value={searchValue}
          />
        </HStack>
      ) : (
        <Text style={[styles.title, back && {marginLeft: -5},titleStyle]}>{title}</Text>
      )}
      {rightIcon ? (
        rightIsComponent ? (
          <Menu
            closeOnSelect={true}
            placement="bottom right"
            trigger={triggerProps => {
              return (
                <Pressable {...triggerProps} style={{width:40,height:40,justifyContent:"center",alignItems:'center'}}>
                  <Icon
                    as={MaterialCommunityIcons}
                    size="lg"
                    name={"dots-vertical"}
                    color={'black'}
                />
                </Pressable>
              );
            }}>
              {rightIsSupplier && <Menu.Item borderBottomWidth={0.5} onPress={handleShare}>Share</Menu.Item>}
            <Menu.Item onPress={() => setMenuOpen(true)}>Report</Menu.Item>
          </Menu>
        ) : (
          <IconButton
            //bgColor={"red.100"}
            // style={{backgroundColor:"black",borderRadius:30}}
            onPress={onRightIconPress}
            _pressed={{backgroundColor: 'transparent'}}
            icon={
              <Icon
                as={Ionicons}
                size="lg"
                name={rightIcon}
                color={'black'}
              />
            }
          />
        )
      ) : isSearch ? (
        <View />
      ) : (
        <View style={{margin: 18}} />
      )}
      <ReportUserDialog visible={menuOpen} setMenuOpen={setMenuOpen} type={"Product"}/>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: spacing.medium,
    //paddingTop: Platform.OS == 'ios' ? Util.getHeight(5) :spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    //flex:1,
    //textAlign:"center",
    color: 'black',
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    flex: 1,
    marginLeft: 40,
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: itemSizes.item30,
    height: itemSizes.item30,
    tintColor: 'white',
  },
  txtInputContainer: {backgroundColor:colors.whiteDark},
  txtInput: {
    color: 'black',
    fontFamily: fonts.regular,
    
  },
});
