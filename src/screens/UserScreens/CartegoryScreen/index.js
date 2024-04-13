import Slider from '@react-native-community/slider'
import firestore from '@react-native-firebase/firestore'
import { distanceBetween, geohashQueryBounds } from "geofire-common"
import { uniqBy } from 'lodash'
import { Actionsheet, Button, Center, FlatList, HStack, Icon, Select, useDisclose } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Platform, Text, View } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import { spacing } from '../../../common/variables'
import CenteredLoader from '../../../components/CenteredLoader'
import Header from '../../../components/Header'
import MyButton from '../../../components/MyButton'
import NoResults from '../../../components/NoResults'
import { propertyAllCategories, propertyCategories } from '../../../config/appConfig'
import colors from '../../../theme/colors'
import SpaceCard from '../SpaceCard'
import styles from './styles'
const radius = 10 * 1000
export default function CategoryScreen(props) {
    const { navigation, route } = props
    const { title, isNearby } = route.params
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [noData, setNoData] = useState(false)
    const { latitude, longitude } = useSelector(state => state.user.currentPosition)
    const [category, setCategory] = useState(isNearby ? propertyAllCategories[0].label : title)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [allFilter,setAllFilter] = useState({
        actualCategory:isNearby ? propertyAllCategories[0].label : title,
        actualHeight:0,
        actualWidth:0
    })
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    useEffect(() => {
        if (isNearby) {
            getDataNearBy()
        }
        else
            getDataByCategories()
    }, [allFilter])
    const getDataNearBy = async () => {
        const bounds = geohashQueryBounds([latitude, longitude], radius)
        const promises = [];
        // const collectionRef = collection(db, 'PupsForSale')
        // console.log(bounds.length)
        for (const b of bounds) {
            const query =
                firestore()
                    .collection('Space')
                    .orderBy('geohash')
                    .startAt(b[0])
                    .endAt(b[1]);
            promises.push(query.get())
        }
        setLoading(true)
        Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];
            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const lat = doc.get('location.lat');
                    const lng = doc.get('location.lng');
                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match
                    const distanceInKm = distanceBetween([lat, lng], [latitude, longitude]);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= radius) {
                        matchingDocs.push(doc);
                    }
                }
            }
            return matchingDocs;
        }).then((matchingDocs) => {
            const newArray = uniqBy(matchingDocs.map((doc) => ({ ...doc.data() })), (item) => item.id)
            setData(newArray)
            if (newArray.length == 0) setNoData(true)
            else setNoData(false)
        }).finally(() => {
            setLoading(false)
        })
    }
    const getDataByCategories = async () => {
        //console.log("heree")
        try {
            setLoading(true)
            let spaceRef = firestore().collection("Space")
            if (allFilter.actualCategory != "All") {
                spaceRef = spaceRef.where("category", "==", allFilter.actualCategory)
            }
            if (allFilter.actualWidth > 0) {
                spaceRef = spaceRef.where("width", "==", allFilter.actualWidth.toString())
            }
            if (allFilter.actualHeight > 0) {
                spaceRef = spaceRef.where("height", "==", allFilter.actualHeight.toString())
            }
            //console.log("heree1")
            await spaceRef
                .get()
                .then(snapshot => {
                    console.log("heree1")
                    const localData = []
                    snapshot.docs.map(doc => {
                        localData.push(doc.data())
                    })
                    console.log("--",localData)
                    if (localData.length == 0) setNoData(true)
                    else
                    {
                        setNoData(false)
                        setData(localData)
                    }
                })
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    const clearFilter = () => {
        setAllFilter({
            actualCategory:"All",
            actualWidth:0,
            actualHeight:0
        })
        onClose()
    }
    const handleFilter = () => {
        setAllFilter({
            actualCategory:category,
            actualWidth:width,
            actualHeight:height
        })
        onClose()
    }
    const handleClose = () => {
        setCategory(allFilter.actualCategory)
        setWidth(allFilter.actualWidth)
        setHeight(allFilter.actualHeight)
        onClose()
    }
    const renderCard = ({ item }) => {
        return <SpaceCard data={item} navigation={navigation} />
    }
    const keyExtractor = (item) => {
        return item.id
    }
    return (
        <View style={styles.container}>
            <Header
                title={isNearby ? "Nearby You" : (allFilter.actualCategory=="All"?"Spaces":allFilter.actualCategory)}
                back
                navigation={navigation}
                rightIcon={isNearby ? null : "tune-vertical-variant"}
                onRightIconPress={onOpen}
            />
            {
                loading ?
                    <CenteredLoader /> :
                    (
                        noData ?
                            <NoResults />
                            :
                            <FlatList
                                data={data}
                                renderItem={renderCard}
                                keyExtractor={keyExtractor}
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                            />
                    )
            }
            <Actionsheet isOpen={isOpen} onClose={handleClose} >
                <Actionsheet.Content p={5}>
                    <HStack alignItems={"center"} w={"100%"} justifyContent={"space-between"}>
                        <Text style={styles.fTitle}>Filters</Text>
                        <Button variant={"link"} colorScheme="secondary" onPress={clearFilter}>
                            Clear
                        </Button>
                    </HStack>
                    <HStack w={"100%"} space={2}>
                        {
                            allFilter.actualCategory && allFilter.actualCategory != "All" &&
                            <Center borderColor={colors.appPrimary} borderWidth={1} borderRadius={20} p={2}>
                                <Text style={styles.filterText}>{allFilter.actualCategory}</Text>
                            </Center>
                        }
                        {
                            allFilter.actualHeight > 0 &&
                            <Center borderColor={colors.appPrimary} borderWidth={1} borderRadius={20} p={2}>
                                <Text style={styles.filterText}>Height : {allFilter.actualHeight} Feet</Text>
                            </Center>
                        }
                        {
                            allFilter.actualWidth > 0 &&
                            <Center borderColor={colors.appPrimary} borderWidth={1} borderRadius={20} p={2}>
                                <Text style={styles.filterText}>Width : {allFilter.actualWidth} Feet</Text>
                            </Center>
                        }
                    </HStack>
                    <Text style={styles.subTitle}>Category</Text>
                    <Select
                        //_actionSheet={{ useRNModal: true }}
                        accessibilityLabel="Select Category"
                        placeholder="Category"
                        //px={spacing.medium}
                        w={"100%"}
                        py={Platform.OS == "ios" ? 4 : 2}
                        borderRadius={spacing.small}
                        borderWidth={1}
                        borderColor={colors.borderColor}
                        dropdownIcon={<Icon name="chevron-down" as={MaterialCommunityIcons} size="md" marginRight={3} />}
                        selectedValue={category}
                        color={"black"}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                        {
                            propertyAllCategories.map((item) => {
                                return (
                                    <Select.Item key={item.id} value={item.label} label={item.label} />
                                )
                            })
                        }
                    </Select>
                    <HStack justifyContent={"space-between"} alignItems="center" w={"100%"}>
                        <Text style={styles.subTitle}>Height</Text>
                        <Text>{height} feet</Text>
                    </HStack>
                    <Slider
                        style={{ width: "100%" }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor={colors.appPrimary}
                        maximumTrackTintColor="#E8E6EA"
                        thumbTintColor={colors.appPrimary}
                        onValueChange={value => setHeight(Math.round(value))}
                        value={height}
                    //thumbSize={100}
                    />
                    <HStack justifyContent={"space-between"} alignItems="center" w={"100%"}>
                        <Text style={styles.subTitle}>Width</Text>
                        <Text>{width} feet</Text>
                    </HStack>
                    <Slider
                        style={{ width: "100%" }}
                        minimumValue={0}
                        maximumValue={100}
                        value={width}
                        minimumTrackTintColor={colors.appPrimary}
                        maximumTrackTintColor="#E8E6EA"
                        thumbTintColor={colors.appPrimary}
                        onValueChange={value => setWidth(Math.round(value))}
                    //thumbSize={100}
                    />
                    <MyButton
                        title="Apply"
                        onPress={() => handleFilter()}
                    />
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    )
}