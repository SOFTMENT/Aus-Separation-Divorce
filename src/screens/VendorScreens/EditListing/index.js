import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { geohashForLocation } from 'geofire-common';
import {
  Icon,
  ScrollView,
  Select,
  VStack,
  useDisclose
} from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Helper from '../../../common/Helper';
import Util from '../../../common/util';
import { spacing } from '../../../common/variables';
import Header from '../../../components/Header';
import LoaderComponent from '../../../components/LoaderComponent';
import MyButton from '../../../components/MyButton';
import MyTextInput from '../../../components/MyTextInput';
import PhotoPicker from '../../../components/PhotoPicker';
import colors from '../../../theme/colors';
import styles from './styles';
import { useSelector } from 'react-redux';
export default function EditListing(props) {
  const {navigation, route} = props;
  const {item} = route.params
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const [locationAllState, setLocationAllState] = useState({
    address: item.location.address,
    location: {latitude:item.location.lat,longitude:item.location.lng},
  });
  const ref = useRef();
  const [loaderTitle,setLoaderTitle] = useState("Uploding...")
  useEffect(() => {
    ref.current?.setAddressText(item.location.address);
  }, []);
  const [about, setAbout] = useState(item.about);
  const [title, setTitle] = useState(item.title);
  const [images, setImages] = useState(item.listingImages);
  const [index, setIndex] = useState(0);
  const categories = useSelector(state=>state.user.categories)
  const [category, setCategory] = useState(item.category);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const handleImage = index => {
    setIndex(index);
    onToggle();
  };
  useEffect(()=>{
    console.log(locationAllState)
  },[locationAllState])
  const clearData = () => {
    setTitle('')
    setAbout('')
    setImages([])
    setIndex(0)
    setCategory(categories[0])
    setLocationAllState({
        address: null,
        location: {},
    })
  }
  const selectImage = img => {
    if(img){
      if (images?.[index] != undefined) {
        setImages(images.map((imgg, i) => (index == i ? img : imgg)));
      } else setImages([...images, img]);
    }
   
  };
  const handleAddSpace = async () => {
    console.log(locationAllState)

    if (!images[0]) {
      Util.showMessage('error', 'First image is compulsory');
    } else if (!title) {
      Util.showMessage('error', 'Please provide a valid title');
    } else if (!about) {
      Util.showMessage('error', 'Please provide a valid description');
    } else if (!locationAllState.address) {
      Util.showMessage('error', 'Please add a valid location');
    } else {
      try {
        setLoaderVisibility(true);
        const uid = auth().currentUser.uid;
        const hash = geohashForLocation([
          locationAllState.location.latitude,
          locationAllState.location.longitude,
        ]);
        const ref = firestore().collection('Listing').doc(item.id);
        Promise.all(images.map((image,ind)=>{
            return Helper.uploadImage(
                `ListingImage/${item.id}_${ind+1}.png`,
                image,
              );
        }))
        .then( async listingImages=>{
            await ref.update({
            listingImages,
            title,
            about,
            category,
            geohash: hash,
            _geoloc:{
              lat: locationAllState?.location?.latitude ?? '',
              lng: locationAllState?.location?.longitude ?? '',
            },
            location: {
                address: locationAllState.address,
                lat: locationAllState?.location?.latitude ?? '',
                lng: locationAllState?.location?.longitude ?? '',
            },
            });
           Util.showMessage('success', 'Success', 'Listing updated successfully');
           clearData()
           navigation.goBack()
        })
        .finally(()=>{
            setLoaderVisibility(false)
        })
        
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const handleClose = index => {
    setImages(images.filter((img, i) => index != i));
  };
  const handleDelete = () => {
    const uid = auth().currentUser.uid;
    try {
      setLoaderTitle("Deleting listing...")
      setLoaderVisibility(true)
      Promise.all(item.listingImages.map((image,ind)=>{
        var imgRef = storage().ref(`ListingImage/${item.id}_${ind+1}.png`);
        return new Promise(async(resolve,reject)=>{
          const res = await imgRef.delete()
          return resolve(res)
        })  
        .then(async()=>{
          const ref = firestore().collection('Listing').doc(item.id);
          await ref.delete()
          setLoaderVisibility(false)
          setLoaderTitle("Uploading...")
          Util.showMessage("success","Listing Deleted!")
          navigation.goBack()
        })
        .catch((error)=>{
          console.log(error)
        })
    }))
    } catch (error) {
      
    }
  }
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      nestedScrollEnabled={false}
      bounces={false}
      keyboardShouldPersistTaps={'handled'}>
      <Header navigation={navigation} title="Edit Listing" back rightIcon={"trash-outline"} onRightIconPress={handleDelete}/>
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.thumbnailView}
          onPress={() => handleImage(0)}
        >
          {images[0] ? (
            <FastImage
              source={images[0]?.uri?{uri:images[0].uri}:{uri: images[0]}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          ) : (
            <VStack alignItems={'center'}>
              <Text style={styles.updateText} numberOfLines={1}>
                {images[0] ? images[0].name : 'Add Picture'}
              </Text>
              <Text style={styles.subtitle}>
                {'JPEG or PNG, no larger than 10 MB.'}
              </Text>
            </VStack>
          )}
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          {images.length >1 && images.slice(1).map((img, index) => {
            return (
              <TouchableOpacity
                style={styles.addmore}
                onPress={() => handleImage(index + 1)}>
                <TouchableOpacity
                  onPress={() => handleClose(index)+1}
                  style={{
                    position: 'absolute',
                    zIndex: 1000,
                    // backgroundColor:"rgba(0,0,0,0.5)",
                    // padding:5,
                    top: 2,
                    right: 2,
                  }}>
                  <Icon
                    name="close-circle-outline"
                    as={MaterialCommunityIcons}
                    size="md"
                    color={'white'}
                  />
                </TouchableOpacity>
                <FastImage
                  source={img?.uri?{uri:img.uri}:{uri: img}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })}
          {images[0] && images.length < 10 && (
            <TouchableOpacity style={styles.addmore} onPress={handleImage}>
              <Icon name="plus" as={MaterialCommunityIcons} size="3xl" />
            </TouchableOpacity>
          )}
        </ScrollView>
        <MyTextInput
          containerStyle={{marginTop:20}}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Name'}
          value={title}
          onChangeText={txt => setTitle(txt)}
          //keyboardType={"number-pad"}
        />
        <Text style={styles.title}>Listing location</Text>
        <GooglePlacesAutocomplete
          ref={ref}
          //keyboardShouldPersistTaps={'always'}
          textInputProps={{
            //   onChangeText: (txt) => setAddress(txt),
            //   value: address,
            placeholderTextColor: 'gray',
            //value:address,
            defaultValue:locationAllState.address
          }}
          fetchDetails={true}
          styles={{
            textInput:{
              borderRadius: 20,
              backgroundColor:colors.whiteDark
            }
          }}
          //styles={styles.autoCompleteStyles}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            console.log(data.description)
            setLocationAllState({...locationAllState,address:data.description,
                location:{
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                }
            });
          }}
          query={{
            key: 'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY',
            language: 'en',
            //components: 'country:us',
          }}
        />
         <Text style={styles.title}>Select listing category</Text>
        <Select
          _actionSheet={{useRNModal: true}}
          accessibilityLabel="Select Category"
          placeholder="Category"
          //px={spacing.medium}
          bgColor={colors.whiteDark}
          py={Platform.OS == 'ios' ? 4 : 2}
          borderRadius={spacing.large}
          borderWidth={0}
          dropdownIcon={
            <Icon
              bgColor={'white'}
              name="chevron-down"
              as={MaterialCommunityIcons}
              size="md"
              marginRight={3}
            />
          }
          selectedValue={category}
          color={'black'}
          onValueChange={itemValue => setCategory(itemValue)}>
          {categories.map((item,index) => {
            return (
              <Select.Item
                key={index}
                value={item}
                label={item}
              />
            );
          })}
        </Select>
        
        {/* <Text style={styles.title}>Brief Description</Text> */}
        <MyTextInput
          numberOfLines={2}
          containerStyle={{marginTop:20}}
          txtInputStyle={{height: 100,textAlignVertical: 'top'}}
          multiline={true}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Description'}
          value={about}
          onChangeText={txt => setAbout(txt)}
          //keyboardType={"number-pad"}
        />
       
       
        <MyButton
          title={'Update Listing'}
          containerStyle={{
            marginTop: 20,
          }}
          txtStyle={
            {
                color:"white"
            }
          }
          onPress={handleAddSpace}
        />
      </View>
      <PhotoPicker
        isOpen={isOpen}
        onClose={onClose}
        isVideo={false}
        setImage={selectImage}
        isTF={true}
      />
      <LoaderComponent
        visible={loaderVisibility}
        title={loaderTitle}
      />
    </KeyboardAwareScrollView>
  );
}
