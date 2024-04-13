import { useIsFocused } from '@react-navigation/native';
import { FlatList, HStack } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { spacing } from '../../../common/variables';
import CenteredLoader from '../../../components/CenteredLoader';
import Header from '../../../components/Header';
import NoResults from '../../../components/NoResults';
import styles from './styles';

import UserProductCard from '../UserProductCard';
import { Text } from 'react-native';
import colors from '../../../theme/colors';
import MyButton from '../../../components/MyButton';

const radius = 10 * 1000;
const MyListingScreenUser = props => {
  const {navigation,route} = props;
  const data = route.params.data
  const dispatch = useDispatch()
  const [listings, setListings] = useState(data);
  const [showAll,setShowAll] = useState(false)
  const [noData, setNoData] = useState(data.length == 0);
  const [loading, setLoading] = useState(false);
  const {latitude, longitude} = useSelector(
    state => state.user.currentPosition,
  );
  const {favorites} = useSelector(state => state.user);
  const {name} = useSelector(state=>state.user.userData)
  const isFocused = useIsFocused();

  // const getDataNearBy = async () => {
  //   const bounds = geohashQueryBounds([latitude, longitude], radius);
  //   const promises = [];
  //   // const collectionRef = collection(db, 'PupsForSale')
  //   // console.log(bounds.length)
  //   for (const b of bounds) {
  //     const query = firestore()
  //       .collection('Listing')
  //       .orderBy('geohash')
  //       .startAt(b[0])
  //       .endAt(b[1]);
  //     promises.push(query.get());
  //   }
  //   setLoading(true);
  //   Promise.all(promises)
  //     .then(snapshots => {
  //       const matchingDocs = [];
  //       for (const snap of snapshots) {
  //         for (const doc of snap.docs) {
  //           const lat = doc.get('location.lat');
  //           const lng = doc.get('location.lng');
  //           // We have to filter out a few false positives due to GeoHash
  //           // accuracy, but most will match
  //           const distanceInKm = distanceBetween(
  //             [lat, lng],
  //             [latitude, longitude],
  //           );
  //           const distanceInM = distanceInKm * 1000;
  //           if (distanceInM <= radius) {
  //             matchingDocs.push(doc);
  //           }
  //         }
  //       }
  //       return matchingDocs;
  //     })
  //     .then(matchingDocs => {
  //       const newArray = uniqBy(
  //         matchingDocs.map(doc => ({...doc.data()})),
  //         item => item.id,
  //       );
  //       setListings(newArray);
  //       if (newArray.length == 0) setNoData(true);
  //       else setNoData(false);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const renderCard = ({item}) => {
    return <UserProductCard item={item} favorites={favorites} navigation={navigation}/>
  };
  const keyExtractor = item => {
    return item.id;
  };
  return (
    <View style={styles.container}>
      <Header
        back
        navigation={navigation}
        title={'Results'}
      />
      {loading ? (
        <CenteredLoader />
      ) : noData ? (
        <NoResults />
      ) : (
        <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("UserSearchHistory")
        }}>
          <Text style={styles.recentSearch}>Show Search History</Text>
        </TouchableOpacity>
        <FlatList
          style={{paddingHorizontal: spacing.medium, flex: 1}}
          data={showAll?listings:listings.slice(0,1)}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
       {
         !showAll &&
         <HStack px={5}backgroundColor={colors.appDefaultColor} alignItems={"center"} justifyContent={"space-between"}>
            <Text style={styles.notRight}>Not the right listing?</Text>
            <MyButton
              onPress={()=>setShowAll(true)}
              title={"View all listings"}
              txtStyle={{color:colors.appDefaultColor}}
              containerStyle={{margin:0,backgroundColor:"white",width:"auto"}}
            />
         </HStack>
       }
        </View>
      )}
    </View>
  );
};
export default MyListingScreenUser;
