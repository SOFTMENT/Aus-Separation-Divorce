import { format } from "date-fns";
import { Checkbox, HStack, Modal, View } from "native-base";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import DatePicker from "react-native-date-picker";
import fonts from "../../assets/fonts";
import { fontSizes, spacing } from "../common/variables";
import { workingTime } from "../config/appConfig";
import colors from "../theme/colors";
import MyButton from "./MyButton";
const WorkingTimeModal = (props) => {
    const { showModal, setShowModal, handleWorkingTime } = props
    const [allState,setAllState] = useState({})
    const updateState = (isSelected,index,data) => {
        if(isSelected)
        {
            setAllState((prev)=>{
                return {...prev,[index]:data}
            })
        }
        else{
           if(allState){
            const data = allState
            delete data[index]
            setAllState(allState)
           }
        }
    }
    const closeModal = () => {
        setAllState({})
        handleWorkingTime({})
    }
    const submit = () => {
        handleWorkingTime(allState)
    }
    return (
        <Modal isOpen={showModal} onClose={closeModal} size="xl">
            <Modal.Content backgroundColor={colors.backgroundColor}>
                <Modal.CloseButton onPress={closeModal}/>
                <Modal.Header backgroundColor={colors.backgroundColor} _text={{color:"white"}}>Choose Working Time</Modal.Header>
                <Modal.Body backgroundColor={colors.backgroundColor}>
                    {/* <Button onPress={()=>setShow(true)}>Click</Button> */}
                    {
                        workingTime.map(item => {
                            return (
                                <TimeComponent item={item} key={item.index} updateState={updateState}/>
                            )
                        })
                    }

                </Modal.Body>
                <Modal.Footer backgroundColor={colors.backgroundColor}>
                    <MyButton
                        title={"Confirm"}
                        onPress={submit}
                    />
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
export default WorkingTimeModal
const TimeComponent = ({ item,updateState}) => {
    const [startShow, setStartShow] = useState(false)
    const [endShow, setEndShow] = useState(false)
    const [startTime, setStartTime] = useState(new Date(new Date().setHours(9,0,0,0)))
    const [endTime, setEndTime] = useState(new Date(new Date().setHours(20,0,0,0))) 
    const handleCheck = (isSelected) => {
        updateState(isSelected,item.index,{
            ...item,
            startTime:format(startTime,"p"),
            endTime:format(endTime,"p")
        })
    }
    return (
        <View>
            <HStack key={item.index} justifyContent={"space-between"} flex={1} alignItems="center" space={4} my={1}>
                <Text style={[styles.day,{flex:2}]}>{item.day}</Text>
                <HStack flex={3} justifyContent={"space-between"} alignItems={"center"} space={3}>
                    <Pressable style={styles.time} onPress={() => setStartShow(true)}>
                        <Text style={styles.timeTxt}>{format(startTime,"p")}</Text>
                    </Pressable>
                    <Text style={styles.day}>To</Text>
                    <Pressable style={styles.time} onPress={() => setEndShow(true)}>
                        <Text style={styles.timeTxt}>{format(endTime,"p")}</Text>
                    </Pressable>
                </HStack>
                <View flex={1} alignItems={"flex-end"}>
                    <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" onChange={handleCheck}/>
                </View>
            </HStack>
            <DatePicker
                modal
                open={startShow}
                date={startTime}
                onConfirm={(date) => {
                    setStartShow(false)
                    setStartTime(date)
                }}
                onCancel={() => {
                    setStartShow(false)
                }}
                maximumDate={new Date()}
                mode="time"
            />
            <DatePicker
                modal
                open={endShow}
                date={endTime}
                onConfirm={(date) => {
                    setEndShow(false)
                    setEndTime(date)
                }}
                onCancel={() => {
                    setEndShow(false)
                }}
                maximumDate={new Date()}
                mode="time"
            />
        </View>
    )
}
const styles = StyleSheet.create({
    time: {
        padding: spacing.extraSmall,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: spacing.extraSmall,
        //backgroundColor: 'red'
    },
    timeTxt:{
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.medium,
        color:"white"
    },
    day:{
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.semiBold,
        color:"white"
    }
})