import firestore from '@react-native-firebase/firestore'
import { FlatList, HStack, Icon, Skeleton, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Platform, Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { spacing } from '../../../common/variables'
import Header from '../../../components/Header'
import styles from './styles'
import Util from '../../../common/util'
const radius = 10 * 1000
export default function CategoryScreen(props) {
    const { navigation, route } = props
    const [categories, setCategories] = useState([]);
    const inset = useSafeAreaInsets()
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        getCategories()
    },[])
    function compare(a, b) {
        if (a.name === 'Other') return 1; // "Other" should come last
        if (b.name === 'Other') return -1; // "Other" should come last
        return a.name.localeCompare(b.name); // Sort alphabetically for other names
      }
    const getCategories = async() => {
        try {
            const categoriesSnapshot = await firestore().collection('Categories').get();
            const categoriesData = [];
            setLoading(true)
            await Promise.all(categoriesSnapshot.docs.map(async categoryDoc => {
              const categoryId = categoryDoc.id;
              const subcategoriesSnapshot = await firestore().collection('Categories').doc(categoryId).collection('Subcategories').count().get();
              const userCountSnap = await firestore().collection("Users").where("category","==",categoryDoc.data().name).count().get()
              const subCategoryCount = subcategoriesSnapshot.data().count;
              const userCount =  userCountSnap.data().count
              console.log("user",userCount)
              categoriesData.push({
                ...categoryDoc.data(),
                id: categoryId,
                subCategoryCount: subCategoryCount,
                userCount
              });
            }))
            setCategories(categoriesData.sort(compare))
        } catch (error) {}
        finally{
            setLoading(false)
        }
    };
    const renderItem = ({item}) => {
        return(
            <Pressable style={styles.card} onPress={()=>navigation.navigate("AdvertisersByCategory",{name:item.name})}>
                <FastImage
                    source={{uri:item.image}}
                    style={styles.image}
                    //resizeMode='contain'
                />
                <HStack p={2} flex={1} justifyContent={"space-between"} alignItems={"center"}>
                    <VStack >
                        <Text style={styles.heading}>{item.name}</Text>
                        <Text style={styles.subTitle}>{item.subCategoryCount} Subcategories</Text>
                        <Text style={styles.subTitle}>{item.userCount} Advertisers</Text>
                    </VStack>
                    <Icon
                        as={Ionicons}
                        name={'chevron-forward'}
                        color={'#B0B0B0'}
                        size={'md'}
                    />
                </HStack>
            </Pressable>
        )
    }
    const keyExtractor = item => item.id
    return(
        <View style={[styles.container,
            {
                paddingTop:
                  Platform.OS == 'ios' ? inset.top : inset.top + spacing.small,
              }
        ]}>
            <View style={styles.main}>
                <Text style={styles.fTitle}>Explore by Category</Text>
                <Skeleton
                    borderWidth={1}
                    borderColor="coolGray.200"
                    endColor="warmGray.300"
                    width={Util.getWidth(92)}
                    h={100}
                    borderRadius={10}
                    mt={5}
                    isLoaded={!loading}></Skeleton>
                <Skeleton
                    borderWidth={1}
                    borderColor="coolGray.200"
                    endColor="warmGray.300"
                    width={Util.getWidth(92)}
                    h={100}
                    borderRadius={10}
                    mt={5}
                    isLoaded={!loading}></Skeleton>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            </View>
        </View>
    )
}