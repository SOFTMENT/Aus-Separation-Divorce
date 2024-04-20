import { Image, Platform, Pressable, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native"
import styles from "./styles"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../../common/variables";
import { useEffect, useState } from "react";
import { Button, Center, HStack, Icon } from "native-base";
import firestore, { firebase } from '@react-native-firebase/firestore';
import CenteredLoader from "../../../components/CenteredLoader";
import colors from "../../../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from "../../../components/Header";
const AdvertiserOnboardCategory = ({navigation}) => {
    const inset = useSafeAreaInsets();
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        getCategories()
    },[])
    // Custom comparison function
    function compare(a, b) {
        if (a.name === "Other") return 1; // "Other" should come last
        if (b.name === "Other") return -1; // "Other" should come last
        return a.name.localeCompare(b.name); // Sort alphabetically for other names
    }
    const getCategories = () => {
        firestore()
        .collection("Categories")
        .get()
        .then((data)=>{
            let localData = []
            data.docs.map(doc=>{
                localData.push({...doc.data(),id:doc.id})
            })
            localData.sort(compare);
            setCategories(localData)
        })
    }
    const handlePress = item => {
        try {
            navigation.navigate("AdvertiserOnboardSubcategory",{item})
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <ScrollView
            bounces={false}
            style={[
            styles.container,
            // {
            //     paddingTop:
            //     Platform.OS == 'ios' ? inset.top : inset.top + spacing.small,
            // },
            ]}
        >
             <Header back title={"Choose your category"} normalBack navigation={navigation}/>
            {
                loading?
                <CenteredLoader/>:
                categories.map((item,index)=>{
                   return(
                    <Pressable key={index} onPress={()=>handlePress(item)}>
                        <HStack style={styles.card}  alignItems={"center"}>
                        <Center p={2} borderWidth={1} borderColor={colors.borderColor} borderRadius={30}>
                            <Image
                                source={{uri:item.icon}}
                                style={styles.icon}
                            />
                        </Center>
                        <Text style={styles.catText}>
                            {item.name}
                        </Text>
                        <Icon
                            name="chevron-forward-outline"
                            as={Ionicons}
                            position={"absolute"}
                            right={5}
                        />
                        </HStack>
                    </Pressable>
                   )
                })
            }
        </ScrollView>
    )
}
export default AdvertiserOnboardCategory