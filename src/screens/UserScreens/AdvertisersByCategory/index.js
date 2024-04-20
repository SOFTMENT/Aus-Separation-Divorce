import firestore from '@react-native-firebase/firestore';
import {
  Center,
  Skeleton
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Util from '../../../common/util';
import { spacing } from '../../../common/variables';
import NearbyHome from '../UserHome/NearbyHome';
import styles from './styles';
import Header from '../../../components/Header';
const radius = 1000000000 * 1000;
export default function AdvertisersByCategory(props) {
  const {navigation,route} = props;
  const {name} = route.params
  const {latitude, longitude} =
    useSelector(state => state.user.currentPosition) ?? {};
  // const {data:favData,error,isLoading} = getFavorites()
  const [data, setData] = useState([]);
  const inset =useSafeAreaInsets()
  const [loading,setLoading] = useState(false)
  useEffect(() => {
   getAllData()
  }, []);
  
  const getAllData = async() => {
    try {
      setLoading(true)
      const adSnap = await firestore().collection('Users').where('membershipActive', '==', true)
      .where("category","==",name)
      .get();
      const adData = [];
      adSnap.docs.map(async adDoc => {
        const adId = adDoc.id;
        adData.push({
          ...adDoc.data(),
          id: adId,
        });
      })
      setData(adData)
  } catch (error) {}
  finally{
    setLoading(false)
  }
  };
  const renderNearby = ({item}) => {
    return <NearbyHome item={item} navigation={navigation} />;
  };
  return (
    <View
      style={[
        styles.container,
       
      ]}>
       <Header
        back
        navigation={navigation}
       title={name}
        normalBack={true}
      />
      <Skeleton
          borderWidth={1}
          borderColor="coolGray.200"
          endColor="warmGray.300"
          width={Util.getWidth(50) - 2 * spacing.medium}
          h={100}
          borderRadius={10}
          isLoaded={!loading}>
          <FlatList
            renderItem={renderNearby}
            keyExtractor={item => item.id}
            data={data}
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: 10}}
            ListEmptyComponent={ <Center h={100}>
            <Text style={styles.noSpaces}>No advertisers found</Text>
          </Center>}
          />
        </Skeleton>
    </View>
  );
}
