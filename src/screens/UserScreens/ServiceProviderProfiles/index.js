import firestore from '@react-native-firebase/firestore';
import { HStack, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
    FlatList, Text, View
} from 'react-native';
import Helper from '../../../common/Helper';
import linkingUtil from '../../../common/linkingUtil';
import AvatarIcon from '../../../components/AvatarIcon';
import CenteredLoader from '../../../components/CenteredLoader';
import Header from '../../../components/Header';
import MyButton from '../../../components/MyButton';
import NoResults from '../../../components/NoResults';
import styles from "./styles";
const ServiceProviderProfiles = ({ navigation }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [noData, setNoData] = useState(false)
    useEffect(() => {
        getProviders()
     }, [])
     const getProviders = async () => {
         try {
             setLoading(true)
             const localData = []
             const snapShot = 
                 await firestore()
                 .collection("Users")
                 .where("serviceProfileCompleted","==",true)
                 .where("membershipActive","==",true)
                 .get()
                snapShot.forEach(doc=>{
                    localData.push(doc.data())
                })
             if (localData.length == 0) setNoData(true)
             else{
                setData(localData)
                setNoData(false)
             }
             
         } catch (error) {
 
         }
         finally {
             setLoading(false)
         }
     }
    const openURL = (link) => {
        console.log(link)
        linkingUtil.openBrowser(link)
    }
    const renderItem = ({item}) => (
        <HStack 
            alignItems={"center"}
            justifyContent={"space-between"}
            flex={1} 
            marginX={5} 
            p={4} 
            borderBottomWidth={1} 
            borderBottomColor={"gray.200"}
        >
            <AvatarIcon
                uri={item.profilePic}
                size={70}
            />
            <VStack p={2} flex={1}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.text}>{item.service}</Text>
            </VStack>
            <MyButton
                title={"Hire Now"}
                onPress={()=>openURL(item.portfolioLink)}
                // onPress={validateLogin}
                containerStyle={styles.btn}
                txtStyle={styles.btnTxt}
            />
        </HStack>
    );
    const keyExtractor = item => item.uid
    return (
        <View style={styles.mainContainer}>
            <Header title={"Service Providers"} back navigation={navigation}/>
            {
                loading ?
                    <CenteredLoader /> :
                    (
                        noData ?
                            <NoResults />
                            :
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                            />
                    )
            }
        </View>
    );
};
export default ServiceProviderProfiles;




