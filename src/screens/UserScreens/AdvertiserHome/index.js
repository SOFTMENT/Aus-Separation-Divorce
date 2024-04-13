import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { HStack, Icon, ScrollView, useDisclose } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  AppState,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs'
import branch from 'react-native-branch'
import functions from '@react-native-firebase/functions'
import Geolocation from 'react-native-geolocation-service';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { handleLocation } from '../../../common/LocationHelper';
import { spacing } from '../../../common/variables';
import AvatarIcon from '../../../components/AvatarIcon';
import LocationRequiredModal from '../../../components/LocationRequiredModal';
import PhotoPicker from '../../../components/PhotoPicker';
import {
  setCurrentLocation,
  setCurrentPosition,
  setFavorites,
} from '../../../store/userSlice';
import styles from './styles';
import images from '../../../assets/images';
import LoaderComponent from '../../../components/LoaderComponent';
const radius = 10 * 1000;
let unsubscribe = ()=> {}
export default function UserHome(props) {
  const {navigation} = props;
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const [loaderVisibility,setLoaderVisibility] = useState(false)
  const {latitude, longitude} =
    useSelector(state => state.user.currentPosition) ?? {};
  const location = useSelector(state => state.user.currentLocation) ?? {};
  useEffect(() => {
    subscribeBranchIO()
    getFavorites();
    handleLocation(handleLocationAcceptance, handleLocationRejection);
    const sub = AppState.addEventListener('change', () => {
      handleLocation(handleLocationAcceptance, handleLocationRejection);
    });
    //navigation.navigate('LocationSelectorScreen',{fromAdHome:true})
    return () => {
      //focusListener.remove();
      unsubscribe()
      sub.remove();
    };
  }, []);
  const subscribeBranchIO = async() => {
      // Listener
  unsubscribe = branch.subscribe({
    onOpenComplete:({error,params,uri})=>{
      if (!error) {
        // Handle the deep link data here
        const customData = params['key1'];
        // Perform actions based on the deep link data
        const id = params['$canonical_identifier']
        
        if(id){
          if(customData == 'user'){
            try {
              firestore()
              .collection("Users")
              .doc(id.split('/')[1])
              .get()
              .then(doc=>{
                const item = doc.data()
                if(doc.exists)
                navigation.navigate("ListingBySupplier",{supplierId:item.id,supplierData:item})
              })
            } catch (error) {
              
            }
          }
          else
          {
            try {
              firestore()
              .collection("Listing")
              .doc(id.split('/')[1])
              .get()
              .then(doc=>{
                const item = doc.data()
                if(doc.exists)
                navigation.navigate("ListingDetail",{item})
              })
            } catch (error) {
              
            }
          }
        }
      }
    }
  });

  // let latestParams = await branch.getLatestReferringParams() // Params from last open
  // let installParams = await branch.getFirstReferringParams() // Params from original install
  }
  const handleImage = index => {
    onToggle();
  };
  const selectImage = async img => {
    if(!img)
    return
    setLoaderVisibility(true)
    const data = await RNFS.readFile(decodeURI(img.uri), 'base64')
    //functions().useEmulator('localhost', 5001);
    functions()
    .httpsCallable('compareImagePhashes')({
      imageUrl:data,
      location:{latitude,longitude}
    })
    .then(async response => {
      setLoaderVisibility(false)
      await handleSearchHistory(response.data.similarityArray)
      navigation.navigate("MyListingScreenUser",{data:response.data.similarityArray})
    }).catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      setLoaderVisibility(false)
    })
  };
  const handleSearchHistory = async(hits) => {
    if(hits.length == 0)return
    try {
      const listingIds = hits.slice(0,1).map((hit)=>hit.id)
      setLoaderVisibility(true)
      await firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("SearchHistory")
      .add({
        searchTime:firebase.firestore.FieldValue.serverTimestamp(),
        listingIds,
      })
    } catch (error) {
      
    }
    finally{
      setLoaderVisibility(false)
    }
  }
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
  const [loading, setLoading] = useState(true);
  const [locationModal, setLocationModal] = useState(false);
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
  const currentPosition = useSelector(state=>state.user.currentPosition)
  const {name, profilePic} = userData;
  const handleLocationRejection = () => {
    setLoading(false);
    setLocationModal(true);
  };
  const handleNotNow = () => {
    setLocationModal(false);
  };
  const handleLocationAcceptance = () => {
    setLocationModal(false);
    Geolocation.getCurrentPosition(
      value => {
        const location = {
          latitude: value.coords.latitude,
          longitude: value.coords.longitude,
        };
        dispatch(setCurrentPosition(location));
        getAddressFromCoordinates(location.latitude, location.longitude);
      },
      error => {},
      {
        enableHighAccuracy: true,
      },
    );
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`,
      );
      const json = await response.json();
      dispatch(setCurrentLocation(json.results[0]?.formatted_address));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS == 'ios' ? inset.top : inset.top + spacing.small,
        },
      ]}>
      <View style={styles.topView}>
        <Pressable
          style={[styles.searchBox, {marginRight: 10}]}
          backgroundColor={'gray.800'}
          onPress={() => navigation.navigate('LocationSelectorScreen')}>
          <Icon
            as={MaterialCommunityIcons}
            size="lg"
            name="map-marker-radius"
            mr={5}
            color={'black'}
          />
          <Text style={styles.placeholder}>Search new location</Text>
        </Pressable>
        <AvatarIcon
          size={60}
          uri={profilePic}
          style={{borderColor: 'gray'}}
          defaultSource={images.defaultUser}
          //borderWidth={1}
        />
        {/* {Util.getNameInitial(name)}
                </Avatar> */}
      </View>
      <Text style={styles.currentLocation}>{`Current Location:`}</Text>
      <Text style={styles.currentLocationBold}>{location}</Text>
      <TouchableOpacity style={{alignSelf: 'center',width:"100%"}} onPress={()=>{handleImage()}}>
        <Text style={styles.tapToSeeText}>Tap to SiteSii</Text>
        <View style={styles.logoBorder}>
          <Image
            source={images.logo}
            style={styles.tapToSee}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.borderViewContainer}>
        <View style={styles.borderView}></View>
        <Text style={styles.or}> OR </Text>
        <View style={styles.borderView}></View>
      </View>
      <HStack alignItems={'center'} space={2}>
        <Pressable
          style={styles.searchBox}
          backgroundColor={'gray.800'}
          //onPress={handleRec}
          onPress={() => navigation.navigate('SearchScreen',{currentPosition})}
          >
          <Icon
            as={MaterialCommunityIcons}
            color={'black'}
            size="lg"
            name="magnify"
            mr={5}
          />
          <Text style={styles.placeholder}>Search Keywords</Text>
        </Pressable>
        {/* <Pressable style={styles.filterView} backgroundColor={"gray.800"} onPress={onOpen}>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name='filter-variant'
                    />
                </Pressable>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>

                    </Actionsheet.Content>
                </Actionsheet> */}
      </HStack>
      <LocationRequiredModal
        handleNotNow={handleNotNow}
        visible={locationModal}
        closeModal={() => setLocationModal(false)}
        handleLocation={() =>
          handleLocation(
            handleLocationAcceptance,
            handleLocationRejection,
            true,
          )
        }
      />
       <PhotoPicker
        isOpen={isOpen}
        onClose={onClose}
        isVideo={false}
        setImage={selectImage}
        isTF={true}
      />
      <LoaderComponent visible={loaderVisibility} title={"Searching..."}/>
    </ScrollView>
  );
}
