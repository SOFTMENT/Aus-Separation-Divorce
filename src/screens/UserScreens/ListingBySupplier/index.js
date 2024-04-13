import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import { FlatList, HStack, Icon, Link, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import images from '../../../assets/images';
import { spacing } from '../../../common/variables';
import AvatarIcon from '../../../components/AvatarIcon';
import Header from '../../../components/Header';
import { setFavorites } from '../../../store/userSlice';
import colors from '../../../theme/colors';
import styles from './styles';

export default function ListingBySupplier(props) {
  const {route, navigation} = props;
  const {supplierId,supplierData} = route.params;
  const {latitude, longitude} = useSelector(
    state => state.user.currentPosition,
  );
  const {favorites} = useSelector(state => state.user);
  const [listings, setListings] = useState([]);
  const uid = auth().currentUser.uid;

  const dispatch = useDispatch();
  useEffect(() => {
    getFavorites();
    getListingBySupplier()
  }, []);
  const getListingBySupplier = () => {
    try {
      firestore()
        .collection('Listing')
        .where('supplierId', '==', supplierId)
        .get()
        .then(snapShot => {
          const newArray = snapShot.docs.map(doc => ({...doc.data()}));
          setListings(newArray ?? []);
        });
    } catch (error) {}
  };
  const handleFav = async (id, isSelected) => {
    if (isSelected) {
      firestore()
        .collection('Users')
        .doc(uid)
        .collection('Favorites')
        .doc(id)
        .delete()
        .then(() => {
          getFavorites();
          //Util.showMessage("error","Space removed from favourite!","")
        });
    } else {
      firestore()
        .collection('Users')
        .doc(uid)
        .collection('Favorites')
        .doc(id)
        .set({
          id: id,
          favCreated: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          getFavorites();
          //Util.showMessage("success","Space marked as favourite!","")
        });
    }
  };
  const getFavorites = async () => {
    try {
      const uid = auth().currentUser.uid;
      const result = await firestore()
        .collection('Users')
        .doc(uid)
        .collection('Favorites')
        .get();
      let favs = [];
      result.forEach(doc => {
        favs.push({
          ...doc.data(),
          favCreated: doc.data().favCreated.toDate().toDateString(),
        });
      });
      dispatch(setFavorites(favs));
    } catch (error) {}
  };
  const handleChat = () => {
    const lastMessage = {
      senderUid: supplierId,
    };
    navigation.navigate('PersonalChat', {lastMessage});
  };
  const renderCard = ({item}) => {
    const isSelected = favorites.find(fav => fav.id == item.id);
    return (
      <TouchableOpacity
        style={{flex: 0.5, margin: 5}}
        onPress={() => navigation.navigate('ListingDetail', {item})}>
        <TouchableOpacity
          onPress={() => handleFav(item.id, isSelected)}
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: colors.white,
            justifyContent: 'center',
            aligmItems: 'center',
            padding: 5,
            borderRadius: 100,
            top: 4,
            right: 4,
          }}>
          <Icon
           as={MaterialCommunityIcons}
           name={isSelected?"heart":"heart-outline"}
           color={isSelected?colors.appPrimary:"black"}
           size={"lg"}
          />
        </TouchableOpacity>
        <FastImage
          source={{uri: item.listingImages[0]}}
          style={styles.img}
          resizeMode="contain"
          defaultSource={images.imagePlaceholder}
        />
        <VStack direction={'column'} mt={2}>
          <Text style={styles.title}>{item.title}</Text>
        </VStack>
      </TouchableOpacity>
    );
  };
  const keyExtractor = item => {
    return item.id;
  };
  return (
    <View
      style={styles.container}>
      <Header 
        rightIsSupplier={true}
        back 
        navigation={navigation} extraStyle={{paddingBottom: 0}} rightIcon={'dots-vertical'}
        rightIsComponent={true}/>
      {supplierData && (
        <VStack alignSelf={'center'} alignItems={'center'}>
          <AvatarIcon
            size={80}
            uri={supplierData?.profilePic}
            style={{borderWidth: 1, borderColor: 'white'}}
          />
          <Text style={styles.name}>{supplierData?.name}</Text>
          <Text style={styles.supplier}>
            {' '}
            Joined {format(supplierData?.createdAt.toDate(), 'Lo MMMM')}
          </Text>
        </VStack>
      )}
      <HStack
        bgColor={colors.appDefaultColor}
        p={2}
        px={6}
        my={4}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text style={styles.product}>Products</Text>
        <Link
          _text={{color: colors.white}}
          onPress={() => handleChat()}>
          Message
        </Link>
      </HStack>
      <FlatList
        style={{paddingHorizontal: spacing.medium, flex: 1}}
        data={listings}
        numColumns={2}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
