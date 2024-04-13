import { find, remove } from "lodash";
import { Modal } from "native-base";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import fonts from "../../assets/fonts";
import images from "../assets/images";
import { responsiveSize } from "../common/util";
import { itemSizes, spacing } from "../common/variables";
import { proGoals } from "../config/appConfig";
import colors from "../theme/colors";
import MyButton from "./MyButton";
const SkillSetModal = (props) => {
    const { showModal, setShowModal, handleSkills } = props
    const [skills,setSkills] = useState([])
    const closeModal = () => {
        setSkills([])
        handleSkills([])
    }
    const submit = () => {
        handleSkills(skills)
    }
    const handleSkill = (name,isSelected) => {
        if(isSelected){
            setSkills((prev)=>{
                let newSkills = prev
                console.log(prev)
                remove(newSkills,(skill)=>skill == name)
                return [...newSkills]
            })
        }
        else{
            setSkills((prev)=>{
                return [...prev,name]
            })
        }
    }
    return (
        <Modal isOpen={showModal} onClose={closeModal} size="xl">
            <Modal.Content backgroundColor={colors.backgroundColor}>
                <Modal.CloseButton onPress={closeModal}/>
                <Modal.Header backgroundColor={colors.backgroundColor} _text={{color:"white"}}>Choose Skills</Modal.Header>
                <Modal.Body backgroundColor={colors.backgroundColor}>
                {
                        proGoals.map(item => {
                            const isSelected = find(skills,(skill)=>skill == item.name)
                            return (
                                <TouchableOpacity
                                    key={item.index}
                                    onPress={() => handleSkill(item.name,isSelected)}
                                    style={[styles.userBox, isSelected && { borderColor: "#D9D9D9" }]}>
                                    <Text
                                        style={[styles.typeText, isSelected && { color: "#D9D9D9" }]}>
                                        {item.name}
                                    </Text>
                                    {
                                        isSelected &&
                                        <Image
                                            source={images.checked}
                                            style={styles.checked}
                                            resizeMode="contain"
                                        />
                                    }
                                </TouchableOpacity>
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
export default SkillSetModal
const styles = StyleSheet.create({
    userTypeView:{
        flexDirection:'column',
        //justifyContent:"space-between",
        alignItems:'center',
    },
    userBox:{
        padding:spacing.mediumLarge,
        width:"100%",
        //height:Util.getWidth(25),
        borderColor:"#686767",
        borderWidth:2,
        borderRadius:spacing.medium,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:spacing.small
    },
    typeText:{
        color:"#686767",
        fontFamily:fonts.semiBold,
        fontSize:responsiveSize(12),
        //marginTop:spacing.small
    },
    checked:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        position:"absolute",
        //top:8,
        right:8,
        tintColor:"#D9D9D9"
    },
})