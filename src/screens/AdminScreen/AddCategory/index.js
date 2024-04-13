import { AlertDialog, Button, Input } from "native-base";
import React, { useEffect, useState } from "react";
import Util from "../../../common/util";
import firestore, { firebase } from '@react-native-firebase/firestore'
const AddCategory = ({visible,setMenuOpen,type}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categoryName,setCategoryName] = useState("")
  const onClose = () => {
    setIsOpen(false)
    setMenuOpen(false)
    setCategoryName("")
  };
  const cancelRef = React.useRef(null);
  useEffect(()=>{
    setIsOpen(visible)
  },[visible])
  const handleSubmit = async() => {
    try {
        const ref = firestore()
        .collection("Category")
        .doc()
        const id = ref.id
        await ref.set({
            categoryName,
            id,
            date: firebase.firestore.FieldValue.serverTimestamp(),

            //date:firestore().se
        })
        setCategoryName("")
        Util.showMessage("success","Category added!")
        onClose()
    } catch (error) {
        
    }
    onClose()
  }
  return( 
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{`Add Category`}</AlertDialog.Header>
          <AlertDialog.Body>
            <Input
                placeholder="Category Name"
                value={categoryName}
                onChangeText={txt=>setCategoryName(txt)}
                autoCapitalize="none"
                autoCorrect={false}
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="success" onPress={()=>{
                handleSubmit()
              }}>
                Submit
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>)
};
export default AddCategory
    