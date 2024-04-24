import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {distanceBetween, geohashQueryBounds} from 'geofire-common';
import {startCase, uniqBy} from 'lodash';
import {
  Center,
  HStack,
  Icon,
  Link,
  ScrollView,
  Skeleton,
  useDisclose,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  AppState,
  FlatList,
  Image,
  Linking,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../../assets/images';
import {handleLocation} from '../../../common/LocationHelper';
import Util from '../../../common/util';
import {spacing} from '../../../common/variables';
import AvatarIcon from '../../../components/AvatarIcon';
import LocationRequiredModal from '../../../components/LocationRequiredModal';
import {propertyCategories} from '../../../config/appConfig';
import {setCurrentPosition, setFavorites} from '../../../store/userSlice';
import colors from '../../../theme/colors';
import NearbyHome from './NearbyHome';
import styles from './styles';
import branch from 'react-native-branch';
const radius = 1000 * 10;
export default function UserHome(props) {
  const {navigation} = props;
  const {latitude, longitude} =
    useSelector(state => state.user.currentPosition) ?? {};
  // const {data:favData,error,isLoading} = getFavorites()
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nearbyData, setNearByData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [disableLoad, setDisableLoad] = useState(false);
  const [nearLoading, setNearLoading] = useState(false);
  useEffect(() => {
    // getFavorites()
    subscribeBranchIO()
    getCategories();
    handleLocation(handleLocationAcceptance, handleLocationRejection);
    const sub = AppState.addEventListener('change', () => {
      setDisableLoad(true)
      handleLocation(handleLocationAcceptance, handleLocationRejection);
    });
    // focusListener = props.navigation.addListener('didFocus', () => {
    //     handlePermissionCheck();
    //     });

    return () => {
      //focusListener.remove();
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
                navigation.navigate("ListingDetail",{item})
              })
            } catch (error) {
              
            }
          }
          // else
          // {
          //   try {
          //     firestore()
          //     .collection("Listing")
          //     .doc(id.split('/')[1])
          //     .get()
          //     .then(doc=>{
          //       const item = doc.data()
          //       if(doc.exists)
          //       navigation.navigate("ListingDetail",{item})
          //     })
          //   } catch (error) {
              
          //   }
          // }
        }
      }
    }
  });

  // let latestParams = await branch.getLatestReferringParams() // Params from last open
  // let installParams = await branch.getFirstReferringParams() // Params from original install
  }
  function compare(a, b) {
    if (a.name === 'Other') return 1; // "Other" should come last
    if (b.name === 'Other') return -1; // "Other" should come last
    return a.name.localeCompare(b.name); // Sort alphabetically for other names
  }
  const getCategories = () => {
    try {
      firestore()
        .collection('Categories')
        .get()
        .then(res => {
          let localData = [];
          res.docs.map(doc => {
            localData.push({...doc.data(), id: doc.id});
          });
          localData.sort(compare);
          setCategories(localData);
        });
    } catch (error) {}
  };
  // const getFavorites = async() => {
  //     try {
  //         const uid = auth().currentUser.uid
  //         const result = await firestore().collection("Users").doc(uid).collection("Favorites").get()
  //         let favs = []
  //         result.forEach(doc => {
  //             favs.push({...doc.data(),favCreated:doc.data().favCreated.toDate().toDateString()})
  //         })
  //         dispatch(setFavorites(favs))
  //     } catch (error) {

  //     }
  // }
  // const getTopData = async () => {
  //     try {
  //         const uid = auth().currentUser.uid
  //         setTopDataLoading(true)
  //         await firestore()
  //             .collection("Space")
  //             .orderBy("createTime", "desc")
  //             .limit(10)
  //             .get()
  //             .then(snapshot => {
  //                 let localData = []
  //                 snapshot.docs.map(doc => {
  //                     localData.push(doc.data())
  //                 })
  //                 console.log(localData)
  //                 setData(localData)
  //             })
  //         setTopDataLoading(false)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  const [loading, setLoading] = useState(true);
  const [locationModal, setLocationModal] = useState(false);
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
  const {isOpen, onOpen, onClose} = useDisclose();
  const {name, profilePic} = userData;
  const handleLocationRejection = () => {
    setLoading(false);
    setLocationModal(true);
  };
  const handleNotNow = () => {
    setLocationModal(false);
    getTopData();
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
        getAllData(location);
      },
      error => {},
      {
        enableHighAccuracy: true,
      },
    );
  };
  const getNearbyData = async location => {
    const bounds = geohashQueryBounds(
      [location.latitude, location.longitude],
      radius,
    );
    const promises = [];
    // const collectionRef = collection(db, 'PupsForSale')
    // console.log(bounds.length)
    for (const b of bounds) {
      const query = firestore()
        .collection('Users')
        .where('membershipActive', '==', true)
        .orderBy('geohash')
        .startAt(b[0])
        .endAt(b[1])
        .limit(10);
      promises.push(query.get());
    }
    setNearLoading(true);
    Promise.all(promises)
      .then(snapshots => {
        const matchingDocs = [];
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get('location.lat');
            const lng = doc.get('location.lng');
            console.log('vaibhav', lat);
            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween(
              [lat, lng],
              [location.latitude, location.longitude],
            );
            const distanceInM = distanceInKm * 1000;
            console.log(distanceInM)
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
        setNearByData(newArray);
        if (newArray.length == 0) setNoData(true);
        else setNoData(false);
      })
      .finally(() => {
        setNearLoading(false);
        setDisableLoad(false)
      });
  };
  const getAllData = location => {
    //getTopData()
    getNearbyData(location);
  };
  const renderNearby = ({item}) => {
    return <NearbyHome item={item} navigation={navigation} />;
  };
  const ListHeaderComponent = () => {
    return (
      <View>
        <Text style={[styles.name, {marginTop: 20}]}>Explore by Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}
          bounces={false}>
          {categories.map(item => {
            let val = item.image
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryView}
                onPress={()=>navigation.navigate("AdvertisersByCategory",{name:item.name})}
                >
                <FastImage
                  source={{
                    uri: item.image,
                  }}
                  style={styles.categoryImage} 
                />
                <View style={styles.categoryTextView}>
                  <Text style={styles.category}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <HStack alignItems={'center'} justifyContent={'space-between'} mt={5}>
          <Text style={[styles.name]}>Nearby</Text>
        </HStack>
      </View>
    );
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS == 'ios' ? inset.top : inset.top + spacing.small,
        },
      ]}>
      <View style={styles.topView}>
        <AvatarIcon
          size={60}
          uri={profilePic}
          style={{borderColor: 'gray'}}
          defaultSource={images.defaultUser}
          //borderWidth={1}
        />
        <View style={{marginLeft:10}}>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name}>{startCase(name)}</Text>
        </View>
        
        {/* {Util.getNameInitial(name)}
                </Avatar> */}
      </View>
      <HStack alignItems={'center'} space={2}>
        <Pressable
          style={styles.searchBox}
          onPress={() => navigation.navigate('Search')}>
          <Icon as={MaterialCommunityIcons} size="lg" name="magnify" mr={5} />
          <Text style={styles.placeholder}>Search</Text>
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
      {/* <Skeleton 
                borderWidth={1} 
                borderColor="coolGray.200" 
                endColor="warmGray.300" 
                width={Util.getWidth(100)-(2*spacing.medium)}
                h={200}
                borderRadius={10}
                isLoaded={!topDataLoading}
            >
                <FlatList
                    horizontal
                    data={data}
                    keyExtractor={keyExtractor}
                    renderItem={renderHighlight}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                />
            </Skeleton> */}
        <Skeleton
            borderWidth={1}
            borderColor="coolGray.200"
            endColor="warmGray.300"
            width={Util.getWidth(50) - 2 * spacing.medium}
            h={100}
            borderRadius={10}
            isLoaded={!nearLoading || disableLoad}>
          <FlatList
            renderItem={renderNearby}
            keyExtractor={item => item.id}
            data={[...nearbyData]}
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: 10}}
            ListHeaderComponent={<ListHeaderComponent />}
            ListEmptyComponent={ <Center h={100}>
            <Text style={styles.noSpaces}>No advertisers near you</Text>
          </Center>}
          
          />
        </Skeleton>
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
    </View>
  );
}
