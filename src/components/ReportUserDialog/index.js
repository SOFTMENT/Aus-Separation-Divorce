import { AlertDialog, Button, Input } from "native-base";
import React, { useEffect, useState } from "react";
import Util from "../../common/util";

const ReportUserDialog = ({visible,setMenuOpen,type}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value,setValue] = useState("")
  const onClose = () => {
    setIsOpen(false)
    setMenuOpen(false)
  };
  const cancelRef = React.useRef(null);
  useEffect(()=>{
    setIsOpen(visible)
  },[visible])
  const handleSubmit = () => {
    if(!value){
      Util.showMessage("error","Please add a comment.")
      return
    }
    Util.showMessage("error","We have recieved your report!")
    onClose()
  }
  return( 
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{`Report`}</AlertDialog.Header>
          <AlertDialog.Body>
            <Input
                placeholder="Comment"
                value={value}
                onChangeText={(txt)=>setValue(txt)}
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handleSubmit}>
                Submit
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>)
};
export default ReportUserDialog
    