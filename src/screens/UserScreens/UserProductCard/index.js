import { Text, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { Icon, VStack } from "native-base";
import FastImage from "react-native-fast-image";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import images from "../../../assets/images";
import styles from './styles'
import React, { useEffect, useState } from "react";
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth  from '@react-native-firebase/auth'
import { setFavorites } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
const UserProductCard = ({item,navigation,favorites}) => {
    const isSelected = favorites.find(fav => fav.id == item.id);
    const dispatch = useDispatch()
    const [supplierData,setSupplierData] = useState(null)
    const [favIsSelected,setFavIsSelected] = useState(isSelected)
    useEffect(()=>{
    firestore()
    .collection("Users")
    .doc(item.supplierId)
    .get()
    .then(doc=>{
        setSupplierData(doc.data())
    })
    },[])
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
      const handleFav = async (id, isSelected) => {
        const uid = auth().currentUser.uid
        setFavIsSelected(!favIsSelected)
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
    return (
      <TouchableOpacity style={{flex:0.5,margin:5}} onPress={()=>navigation.navigate("ListingDetail",{item})}>
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
            name={favIsSelected ? 'heart' : 'heart-outline'}
            color={favIsSelected ? colors.appDefaultColor : 'black'}
            size={'lg'}
          /></TouchableOpacity>
          <FastImage
            source={{uri: item.listingImages[0]}}
            style={styles.img}
            resizeMode="contain"
            defaultSource={images.imagePlaceholder}  
          />
        <VStack direction={"column"} mt={2}>
          <Text style={styles.title}>{item.title}</Text>
          {supplierData&&<Text style={styles.name}>By {supplierData.name}</Text>}
        </VStack>
      </TouchableOpacity>
    );
}
export default UserProductCard