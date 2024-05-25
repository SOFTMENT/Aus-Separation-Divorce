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
import MyButton from "../../../components/MyButton";
const AdvertiserOnboardSubcategory = ({navigation,route}) => {
    const {item} = route.params
    const inset = useSafeAreaInsets();
    const [categories,setCategories] = useState([])
    const [selectedSubategories,setSelectedSubCategories] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        getCategories()
    },[])
    // Custom comparison function
    function compare(a, b) {
        if (a.name === "Other") return 1; // "Other" should come last
        if (b.name === "Other") return -1; // "Other" should come last
        if (a.name === "Family Dispute Resolution") return -1; // "Other" should come last
        if (b.name === "Family Dispute Resolution") return 1; // "Other" should come last
        return a.name.localeCompare(b.name); // Sort alphabetically for other names
    }
    const getCategories = () => {
        setLoading(true)
        firestore()
        .collection("Categories")
        .doc(item.id)
        .collection("Subcategories")
        .get()
        .then((data)=>{
            let localData = []
            data.docs.map(doc=>{
                localData.push({...doc.data(),id:doc.id})
            })
            localData.sort(compare);
            setCategories([...localData])
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    function modifyCategories(subcategory) {
            const localCategories = [...selectedSubategories]
            if (!selectedSubategories.includes(subcategory)) {
                localCategories.push(subcategory);
            }
            else{
                const index = selectedSubategories.indexOf(subcategory);
                if (index !== -1) {
                    localCategories.splice(index, 1);
                }
            }
            setSelectedSubCategories(localCategories)

         
    }
    const handleDone = () => {
        const obj = {
            category:item.name,
            categoryId:item.id,
            subcategories:selectedSubategories,
        }
        navigation.navigate("AddAdvertiserProfile",{obj})
    }
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
        <ScrollView
            bounces={false}
            style={[
            styles.container,
            ]}
            contentContainerStyle={{paddingBottom:10}}
        >
            <Header back title={item.name} normalBack navigation={navigation}/>
            {
                loading?
                <CenteredLoader/>:
                categories.map((item,index)=>{
                  const isSelected = selectedSubategories.includes(item.name)
                   return(
                    <Pressable onPress={()=>modifyCategories(item.name)} key={item.id}>
                        <HStack style={[styles.card,isSelected&&{backgroundColor:colors.appPrimaryLight}]} key={index} alignItems={"center"}>
                        {/* <Center p={2} borderWidth={1} borderColor={colors.borderColor} borderRadius={30}>
                            <Image
                                source={{uri:item.icon}}
                                style={styles.icon}
                            />
                        </Center> */}
                        <Text style={styles.catText}>
                            {item.name}
                        </Text>
                        
                            {
                                isSelected?
                                <Icon
                                position={"absolute"}
                                right={5}
                                name="checkbox-outline"
                                as={Ionicons} 
                                color={colors.appPrimary}
                                size={"lg"}
                                />:
                                <Icon
                                position={"absolute"}
                                right={5}
                                name="square-outline"
                                as={Ionicons} 
                                color={colors.borderColor}
                                size={"lg"}
                                />
                            }
                        </HStack>
                    </Pressable>
                   )
                })
            }
            
        </ScrollView>
        {
            !loading&&
            <Center style={{flex:0.1,margin:10,marginHorizontal:spacing.large}}>
                    <MyButton
                    title={"Done"}
                    onPress={handleDone}
                    //containerStyle={{flex:0.05,}}
                    />
                </Center>
        }
        </View>
    )
}
export default AdvertiserOnboardSubcategory