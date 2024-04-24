import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import axios from 'axios';
import {Button, Center, HStack, Icon, Link, ScrollView, View, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import fonts from '../../../../assets/fonts';
import images from '../../../assets/images';
import Helper from '../../../common/Helper';
import {fontSizes, spacing} from '../../../common/variables';
import Header from '../../../components/Header';
import MyButton from '../../../components/MyButton';
import {setFavorites} from '../../../store/userSlice';
import colors from '../../../theme/colors';
import styles from './styles';
import ImageView from 'react-native-image-viewing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Util from '../../../common/util';
import Carousel from 'react-native-reanimated-carousel';
export default function VendorHome(props) {
  const {route, navigation} = props;
  // const {item} = route.params;
  const {favorites, userData} = useSelector(state => state.user);
  const uid = auth().currentUser.uid;
  const [supplierData, setSupplierData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const openImageSlider = index => {
    setSelectedIndex(index);
    setImageSlider(true);
  };
  const [imageSlider, setImageSlider] = useState(false);
  // useEffect(()=>{
  //     firestore()
  //     .collection("Users")
  //     .doc(item.supplierId)
  //     .get()
  //     .then(doc=>{
  //         // notifySupplier(doc.data().fcmToken)
  //         setSupplierData(doc.data())
  //     })
  // },[])
  // const notifySupplier = async(fcmToken) => {
  //    if(!fcmToken)return
  //    console.log(fcmToken)
  //    axios({
  //     method:"post",
  //     url:"https://fcm.googleapis.com/fcm/send",
  //     headers:{
  //         "Content-Type":"application/json",
  //         "Authorization":`key=AAAANw3r-Ao:APA91bGVtL8cL1_UBi23cRxICx_EtFlll6cLMgi2tfEv5uYq-1--CdETb4rB63czJ-bxacfoD9y4nTNNP8spT6lg1hGFP5HIOrzE1HEE4tf4t7VFC9NFfymGZ4w9lHsxcsF3c6WTQusr`
  //     },
  //     data:{
  //         to:fcmToken,
  //             notification:{
  //                 title:"Hey",
  //                 body:`Someone just viewed your one of the listing(${item.title}).`
  //             }
  //     }
  //    })
  //    .then(res=>{
  //     console.log(res.data)
  //    })
  //    .catch(err=>{
  //     console.log(err)
  //    })
  // }
  // const handleFav = async () => {
  //   setFavIsSelected(!favIsSelected);
  //   if (isSelected) {
  //     firestore()
  //       .collection('Users')
  //       .doc(uid)
  //       .collection('Favorites')
  //       .doc(item.id)
  //       .delete()
  //       .then(() => {
  //         getFavorites();
  //         //Util.showMessage("error","Space removed from favourite!","")
  //       });
  //   } else {
  //     firestore()
  //       .collection('Users')
  //       .doc(uid)
  //       .collection('Favorites')
  //       .doc(item.id)
  //       .set({
  //         id: item.id,
  //         favCreated: firebase.firestore.FieldValue.serverTimestamp(),
  //       })
  //       .then(() => {
  //         // getFavorites();
  //         //Util.showMessage("success","Space marked as favourite!","")
  //       });
  //   }
  //};
  // const handleContact = () => {
  //   // const lastMessage = {
  //   //   senderUid: item.supplierId,
  //   //   regarding: `This conversation is related to your listing named '${item.title}'`,
  //   //   imageUri: item.advertiserImages[0],
  //   //   listingId: item.id,
  //   // };
  //   // navigation.navigate('PersonalChat', {lastMessage});
  //   const url = `tel:${item.contact}`;

  //   // Open the phone call
  //   Linking.openURL(url);
  // };
  // const handleShare = async () => {
  //   try {
  //     const imageLink = await Helper.imageUrlToBase64(item.advertiserImages[0]);
  //     Share.open({
  //       title: item.name,
  //       message: item.shareUrl,
  //       url: imageLink,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   //let {channel, completed, error} = await buo.showShareSheet(shareOptions, linkProperties, controlParams)
  // };
  // const handleDirection = () => {
  //   // Construct the URL based on the platform
  //   let url;
  //   if (Platform.OS === 'ios') {
  //     // Apple Maps URL format
  //     url = `http://maps.apple.com/maps?daddr=${item.location.lat},${item.location.lng}`;
  //   } else {
  //     // Google Maps URL format
  //     url = `http://maps.google.com/maps?q=${item.location.lat},${item.location.lng}`;
  //   }

  //   // Open the map with the specified coordinates
  //   Linking.openURL(url);
  // } 
  const renderCarousel = ({ item }) => {
    return (
        <FastImage
            source={{ uri: item }}
            style={styles.image}
        />
    )
}
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <Header
       // back
        title={userData.title}
        navigation={navigation}
        rightIcon={'create'}
        rightIsComponent={false}
        onRightIconPress={()=>{
          navigation.navigate("EditAdvertiser",{item:{...userData,id:uid}})
        }}
        extraStyle={{backgroundColor:"#C4E7E5"}}
        //normalBack={true}
      />
       <Carousel
                //style={{marginTop:-8}}
                width={Util.getWidth(100)}
                height={Util.getHeight(25)}
                //autoPlay={true}
                data={userData.advertiserImages}
                renderItem={renderCarousel}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
            />
     
     <View style={styles.imageContainer}>
         <FastImage
          source={
            userData?.profilePic
              ? {uri: userData.profilePic}
              : images.defaultUser
          }
          style={styles.profileImage}
          resizeMode="contain"
          defaultSource={images.imagePlaceholder}
        />
        <HStack justifyContent={"space-between"} flex={1}>
        <VStack ml={5}>
        <Text style={styles.title}>{userData.name}</Text>
        <Text style={[styles.subtitle,{fontSize:fontSizes.extraExtraSmall}]}>{userData.email}</Text>
        </VStack>
        {/* <Button p={1} backgroundColor={"#d6ecea"} _text={{color:colors.appPrimary}}>
          Share Profile
        </Button> */}
        </HStack>
         </View>
        {/* <HStack space={2} alignItems={'center'}>
          {userData.advertiserImages.length > 1 && (
            <TouchableOpacity
              style={[styles.imageContainerSmall, {flex: 1}]}
              onPress={() => openImageSlider(1)}>
              <FastImage
                source={{uri: userData.advertiserImages[1]}}
                style={[styles.imageSmall]}
                resizeMode="contain"
                defaultSource={images.imagePlaceholder}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '100%',
              flexWrap: 'wrap',
            }}>
            {userData.advertiserImages.length > 1 &&
              userData.advertiserImages.slice(2).map((img, index) => {
                return (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.imageContainerSmall,
                        {width: '45%', margin: 2},
                        index == 3 &&
                        userData.advertiserImages.length > 6 && {opacity: 0.4},
                      ]}
                      onPress={() => openImageSlider(index)}>
                      <FastImage
                        source={{uri: img}}
                        style={styles.imageSmall}
                        resizeMode="contain"
                        defaultSource={images.imagePlaceholder}
                      />
                    </TouchableOpacity>
                    {index == 3 && userData.advertiserImages.length > 6 && (
                      <Text style={styles.moreText}>
                        {userData.advertiserImages.slice(5).length} More
                      </Text>
                    )}
                  </>
                );
              })}
          </View>
        </HStack> */}
      {/* </View> */}
      <HStack mx={5} alignItems={'center'} mt={4}>
        <Center bgColor={colors.appPrimary} p={1} borderRadius={5} mr={2}>
          <Icon as={Ionicons} name={'call'} color={colors.white} size={'md'} />
        </Center>
        <Text style={styles.subtitle}>{userData?.contact??""}</Text>
      </HStack>
      <HStack mx={5} alignItems={'center'} mt={2}>
        <Center bgColor={colors.appPrimary} p={1} borderRadius={5} mr={2}>
          <Icon
            as={Ionicons}
            name={'location'}
            color={colors.white}
            size={'md'}
          />
        </Center>
        <Text style={styles.subtitle}>{userData.location.address}</Text>
      </HStack>
      {/* <Link
        isUnderlined
        _text={{
            color: '#1976D2',
            fontFamily: fonts.medium,
        }}
        ml={5}
        onPress={handleDirection}>
        Get Direction
      </Link> */}
      <View style={{padding: spacing.large, paddingTop: 0, flex: 1}}>
        <Text style={styles.des}>Description</Text>
        <View style={styles.desView}>
          <Text style={styles.about}>{userData.about}</Text>
        </View>
        {/* <MyButton
          title={'Contact'}
          //txtStyle={{color: 'white'}}
          containerStyle={{
            marginTop: 20,
            // borderRadius: 18,
            // backgroundColor: 'black',
          }}
          onPress={handleContact}
        /> */}
      </View>
      <ImageView
        images={userData.advertiserImages.map(img => {
          return {uri: img};
        })}
        imageIndex={selectedIndex}
        visible={imageSlider}
        onRequestClose={() => setImageSlider(false)}
      />
    </ScrollView>
  );
}
