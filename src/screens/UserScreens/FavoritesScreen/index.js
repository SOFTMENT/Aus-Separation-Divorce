import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { spacing } from '../../../common/variables';
import CenteredLoader from '../../../components/CenteredLoader';
import Header from '../../../components/Header';
import NoResults from '../../../components/NoResults';
import UserProductCard from '../UserProductCard';
import styles from './styles';

export default function FavoritesScreen(props) {
  const {route, navigation} = props;
  const {favorites} = useSelector(state => state.user);
  const uid = auth().currentUser.uid;
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData] = useState([])
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [searchValue,setSearchValue] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    if(favorites)
    getFavoritesData();
  }, [favorites]);
  const getFavoritesData = async () => {
    try {
      setLoading(true);
      console.log(favorites.entries())
      const favouritesData = [];
      for (const [index, obj] of favorites.entries()) {
        const docSnap = await firestore()
          .collection('Listing')
          .doc(obj.id)
          .get();
        //console.log(docSnap.exists)
        if (docSnap.exists) {
          favouritesData[index] = docSnap.data();
        }
      }
      if (favouritesData.length == 0) setNoData(true);
      else setNoData(false);
      setFilteredData(favouritesData)
      setData(favouritesData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const renderCard = ({item}) => {
    return <UserProductCard item={item} favorites={favorites} navigation={navigation}/>
  };
  const keyExtractor = item => {
    return item.id;
  };
  const handleSearch = txt => {
    setSearchValue(txt.trim())
    if(txt.trim().length == 0){
      if(data.length == 0)setNoData(true)
      else setNoData(false)
      setFilteredData(data)
    }
    else{
      const newData = data.filter(item=>item.title.toLowerCase().startsWith(txt.trim().toLowerCase()))
      if(newData.length == 0)setNoData(true)
      else{
        setNoData(false)
      }
      setFilteredData(newData)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container} >
      <Header 
        isSearch  
        searchValue={searchValue}
        handleSearch={handleSearch}
        navigation={navigation} 
        extraStyle={{paddingBottom: 0}} />
      <Text style={styles.pageTitle}>
        Wishlist
      </Text>
      {loading ? (
        <CenteredLoader />
      ) : noData ? (
        <NoResults />
      ) : (
        <FlatList
          style={{paddingHorizontal: spacing.medium, flex: 1}}
          data={filteredData}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      )}
      </View>
    </TouchableWithoutFeedback>
  );
}
