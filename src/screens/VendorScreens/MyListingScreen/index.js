import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../../components/Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {distanceBetween, geohashQueryBounds} from 'geofire-common';
import {useSelector} from 'react-redux';
import {uniqBy} from 'lodash';
import CenteredLoader from '../../../components/CenteredLoader';
import NoResults from '../../../components/NoResults';
import {Center, FlatList, HStack, Icon, Link, VStack} from 'native-base';
import FastImage from 'react-native-fast-image';
import {spacing} from '../../../common/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import MyButton from '../../../components/MyButton';
import images from '../../../assets/images';

const radius = 60;
const MyListingScreen = props => {
  const {navigation} = props;
  const [listings, setListings] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const {latitude, longitude} = useSelector(
    state => state.user.currentPosition,
  );
  const address = useSelector(
    state => state.user.currentLocation,
  );
  const {name} = useSelector(state=>state.user.userData)
  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused)
    getDataNearBy();
  }, [isFocused]);
  const getDataNearBy = async () => {
    const bounds = geohashQueryBounds([latitude, longitude], radius);
    const promises = [];
    // const collectionRef = collection(db, 'PupsForSale')
    // console.log(bounds.length)
    for (const b of bounds) {
      const query = firestore()
        .collection('Listing')
        .where('supplierId', '==', auth().currentUser.uid)
        .orderBy('geohash')
        .orderBy('createTime','desc')
        .startAt(b[0])
        .endAt(b[1]);
      promises.push(query.get());
    }
    setLoading(true);
    Promise.all(promises)
      .then(snapshots => {
        const matchingDocs = [];
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get('location.lat');
            const lng = doc.get('location.lng');
            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween(
              [lat, lng],
              [latitude, longitude],
            );
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radius) {
              matchingDocs.push(doc);
            }
          }
        }
        return matchingDocs;
      })
      .then(matchingDocs => {
        const newArray = uniqBy(
          matchingDocs.map(doc => ({...doc.data()})),
          item => item.id,
        );
        setListings(newArray);
        if (newArray.length == 0) setNoData(true);
        else setNoData(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const renderCard = ({item}) => {
    return (
      <View style={{flex:0.5,margin:5}}>
          <FastImage
            defaultSource={images.imagePlaceholder}
            source={{uri: item.listingImages[0]}}
            style={styles.img}
            resizeMode="contain">
            <TouchableOpacity
              onPress={()=>navigation.navigate("EditListing",{item})}
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
                name="create"
                as={Ionicons}
                size="md"
                color={colors.appDefaultColor}
              />
            </TouchableOpacity>
          </FastImage>
        <VStack direction={"column"} mt={2}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.name}>{name}</Text>
        </VStack>
      </View>
    );
  };
  const keyExtractor = item => {
    return item.id;
  };
  return (
    <View style={styles.container}>
      <Header
        rightIcon={'add'}
        onRightIconPress={() => {
          navigation.navigate('AddListings');
        }}
        back
        navigation={navigation}
        title={'My Listings'}
      />
      {loading ? (
        <CenteredLoader />
      ) : noData ? (
        <Center flex={1} p={3}>
          <Text style={styles.noItem}>
            {`No product found for location: \n${address}`}
          </Text>
          <Link 
            onPress={()=>navigation.navigate('AddListings',)}
            _text={{
            color:colors.appDefaultColor,
            textDecoration:"none",
            fontWeight:"medium"
          }}>
            Add Product
          </Link>
        </Center>
      ) : (
        <View style={{flex:1}}>
          {/* <Text style={[styles.address,{color:colors.appDefaultColor}]}>{"Showing listings around :"}</Text> */}
          <Text style={styles.address}>{address}</Text>
          <FlatList
          style={{paddingHorizontal: spacing.medium, flex: 1,marginVertical:5}}
          data={listings}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
        </View>
      )}
    </View>
  );
};
export default MyListingScreen;
