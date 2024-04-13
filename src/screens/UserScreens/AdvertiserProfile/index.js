import firestore from '@react-native-firebase/firestore';
import { HStack, Icon, IconButton, ScrollView, useDisclose, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, useDispatch, useSelector } from 'react-redux';
import images from '../../../assets/images';
import Helper from '../../../common/Helper';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import PhotoPicker from '../../../components/PhotoPicker';
import { setUserData } from '../../../store/userSlice';
import colors from '../../../theme/colors';
import styles from './styles';
import { spacing } from '../../../common/variables';
import UpdateNameDialog from '../../../components/UpdateNameDialog';

const AdvertiserProfile = props => {
  const {navigation, userData, state} = props;
  const {profilePic, name, uid} = userData;
  const {favorites, orderCount} = useSelector(state => state.user);
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen,setMenuOpen] = useState(false)
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

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <Header
        navigation={navigation}
        title="My Profile"
        // rightIcon={"logout"}
        // onRightIconPress={logout}
      />
      <HStack mx={5} mt={5} alignItems={"center"}>
        <VStack alignItems={"center"}>
          <TouchableOpacity
            onPress={handleProfile}
            style={{borderWidth: 5, borderColor: colors.appDefaultColor, borderRadius: 200}}>
            <FastImage
              source={profileImage ? profileImage:(profilePic?{uri:profilePic}:images.defaultUser)}
              defaultSource={images.defaultUser}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity >
          <TouchableOpacity  onPress={handleProfile}>
            <Text style={styles.tap}>Tap to edit</Text>
          </TouchableOpacity>
        </VStack>
        <VStack ml={5}>
          <HStack alignItems={"center"} 
        >
            <Text style={styles.name}>{userData.name}</Text>
            <IconButton 
              onPress={()=>setMenuOpen(true)}
              icon={
              <Icon
                as={MaterialCommunityIcons}
                name='pen'
                color={colors.appDefaultColor}
              />
            }/>
          </HStack>
          <HStack alignItems={'center'} width={"100%"}>
            <Text style={styles.email}>Email</Text>
            <Text numberOfLines={2} style={[styles.email, styles.emailLight]}>
              {userData.email}
            </Text>
          </HStack>
        </VStack>
      </HStack>
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
      <UpdateNameDialog visible={menuOpen} setMenuOpen={setMenuOpen} title={"Name"}/>
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
