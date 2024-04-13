import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { spacing } from '../../../common/variables';
import CenteredLoader from '../../../components/CenteredLoader';
import Header from '../../../components/Header';
import NoResults from '../../../components/NoResults';
import UserProductCard from '../UserProductCard';
import styles from './styles';
const UserSearchHistory = props => {
  const {route, navigation} = props;
  const [value, setValue] = useState('');
  const [hits, setHits] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const {favorites,userData} = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    getData()
  },[])
  const getData = async() => {
    try {
      const ids = []
      setLoading(true)
      await firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("SearchHistory")
      .orderBy("searchTime","desc")
      .get()
      .then((res)=>{
        res.docs.map(doc=>{
          console.log(doc.data().listingIds)
          ids.push(...doc.data().listingIds)
        })
      })
      const uniqueIds = new Map();
      ids.map((id)=>{
        if(!uniqueIds.get(id)){
          uniqueIds.set(id,id)
        }
      })
      const uniqueIdsArr = [...uniqueIds.keys()]
      if(uniqueIdsArr.length == 0){
        setNoData(true)
        setLoading(false)
      }
      else{
        await getAllListing(uniqueIdsArr)
      }
    } catch (error) {
      
    }
  }
  const getAllListing = async (ids) => {
    try {
      const localData = []
     for(let id of ids){
      const res = await firestore().collection("Listing").doc(id).get()
      localData.push(res.data())
     }
     setLoading(false)
     if(localData.length == 0)setNoData(true)
     else{
      setNoData(false)
      setHits(localData)
    }
    } catch (error) {
      
    }
  }
  const renderCard = ({item}) => {
    return (
      <UserProductCard
        item={item}
        favorites={favorites}
        navigation={navigation}
      />
    );
  };
  const keyExtractor = item => {
    return item.id;
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Search History" back />
      <View style={styles.mainView}>
        {loading ? (
          <CenteredLoader />
        ) : noData ? (
          <NoResults />
        ) : (
          <FlatList
            style={{paddingHorizontal: spacing.medium, flex: 1}}
            data={hits}
            numColumns={2}
            renderItem={renderCard}
            keyExtractor={keyExtractor}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};
export default UserSearchHistory;
