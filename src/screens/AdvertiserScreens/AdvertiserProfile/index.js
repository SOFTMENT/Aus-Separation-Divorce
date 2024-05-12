import firestore from '@react-native-firebase/firestore';
import {
  HStack,
  Icon,
  IconButton,
  ScrollView,
  useDisclose,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, useDispatch, useSelector } from 'react-redux';
import images from '../../../assets/images';
import Helper from '../../../common/Helper';
import AccountMenuList from '../../../components/AccountMenuList';
import PhotoPicker from '../../../components/PhotoPicker';
import UpdateNameDialog from '../../../components/UpdateNameDialog';
import { setUserData } from '../../../store/userSlice';
import colors from '../../../theme/colors';
import styles from './styles';

const AdvertiserProfile = props => {
  const {navigation, userData, state} = props;
  const {profilePic, name, uid} = userData;
  const {favorites, orderCount} = useSelector(state => state.user);
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (profileImage) {
      uploadImage();
    }
  }, [profileImage]);
  const uploadImage = async () => {
    try {
      const profileUrl = await Helper.uploadImage(
        `ProfilePic/${uid}`,
        profileImage,
      );
      updateUserData({
        profilePic: profileUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserData = obj => {
    firestore()
      .collection('Users')
      .doc(uid)
      .update(obj)
      .then(() => {
        // Util.showMessage('success', 'Success', 'Profile updated!');
        getUserData();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getUserData = () => {
    firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(res => {
        dispatch(setUserData(res.data()));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleProfile = () => {
    onToggle();
  };
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={[styles.container]}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* <Header
        navigation={navigation}
        title="My Profile"
        // rightIcon={"logout"}
        // onRightIconPress={logout}
      /> */}
      <View style={[styles.topView, {paddingTop: insets.top}]}>
        <IconButton
          style={{position: 'absolute', right: 20, top: 40}}
          onPress={() => setMenuOpen(true)}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="pen"
              color={colors.appPrimary}
            />
          }
        />
        <TouchableOpacity onPress={handleProfile} style={[styles.userProfile]}>
          <FastImage
            source={
              profileImage
                ? profileImage
                : profilePic
                ? {uri: profilePic}
                : images.defaultUser
            }
            defaultSource={images.defaultUser}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        <VStack ml={5} width={'70%'}>
          <Text style={styles.name}>{userData.name}</Text>
          <HStack alignItems={'center'} mt={1}>
            <Icon
              as={MaterialCommunityIcons}
              name="phone"
              color={colors.appPrimary}
              size={4}
              mr={2}
            />
            <Text numberOfLines={2} style={[styles.email, {color: '#676767'}]}>
              {userData?.contact ?? ''}
            </Text>
          </HStack>
          <HStack alignItems={'center'} mt={1}>
          <Icon
              as={MaterialCommunityIcons}
              name="email"
              color={colors.appPrimary}
              size={"sm"}
              mr={2}
            />
          <Text numberOfLines={2} style={[styles.email, {color: '#676767'}]}>
            {userData.email}
          </Text>
          </HStack>

          <HStack alignItems={'center'} mt={1}>
         <Icon
              as={MaterialCommunityIcons}
              name="map-marker"
              color={colors.appPrimary}
              size={"sm"}
              mr={2}
            />
         <Text numberOfLines={2} style={[styles.email, {color: '#676767'}]}>
            {userData.location.address}
          </Text>
         </HStack>
        </VStack>
      </View>

      {/* <VStack my={3} mx={9} >
          <HStack alignItems={'center'} width={"100%"} justifyContent={"space-between"}>
            <Text style={styles.email}>Contact number</Text>
            <Text numberOfLines={2} style={[styles.email, styles.emailLight]}>
              {userData.contact}
            </Text>
          </HStack>
          <HStack alignItems={'center'} width={"100%"} justifyContent={"space-between"}>
            <Text style={styles.email}>Email</Text>
           
          </HStack>
          <HStack alignItems={'center'} width={"100%"} justifyContent={"space-between"}>
            <Text style={styles.email}>Address</Text>
            <Text numberOfLines={2} style={[styles.email, styles.emailLight]}>
              {userData.location.address}
            </Text>
          </HStack>
        </VStack> */}
      {/* <HStack justifyContent={"space-evenly"} style={styles.orderView}>
                <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("Orders")}>
                    <VStack justifyContent={"center"} flex={1}>
                        <Text style={styles.value}>{orderCount}</Text>
                        <Text style={styles.title}>{"Orders"}</Text>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("FavoritesScreen")}>
                    <VStack justifyContent={"center"} flex={1}>
                        <Text style={styles.value}>{favorites.length}</Text>
                        <Text style={styles.title}>{"Favourites"}</Text>
                    </VStack>
                </TouchableOpacity>
            </HStack> */}
      <View style={{flex: 1}}>
        <AccountMenuList navigation={navigation} isUser={true} />
      </View>
      <PhotoPicker
        isOpen={isOpen}
        onClose={onClose}
        //isVideo={mode == "video"}
        setImage={setProfileImage}
        //isCover={mode == "image"}
      />
      <UpdateNameDialog
        visible={menuOpen}
        setMenuOpen={setMenuOpen}
        title={'Name'}
      />
    </ScrollView>
  );
};
const mapStateToProps = state => {
  return {
    state: state,
    userData: state.user.userData,
  };
};
export default connect(mapStateToProps)(AdvertiserProfile);
