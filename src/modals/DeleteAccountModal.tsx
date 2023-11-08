import { Box, Button, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";
import '../assets/DeleteAccountModal.css';

interface ModalType {
  children?: ReactNode,
  isOpen: boolean,
  toggle: () => void,
  modalName?: string,
  deleteUserAccount: () => void
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'block',
  background: '#f6f6f6',
  width: {xs: '80%', lg: '25%'},
  padding: '1rem 2rem 2rem 2rem',
  borderRadius: '1rem',
}

export default function DeleteAccountModal(props: ModalType) {
  return (
  <Modal
  open={props.isOpen}
  onClose={props.toggle}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
    <Box sx={{textAlign:'center'}}>

        <div style={{ float: 'right'}} 
             onClick={props.toggle}
         >
            <IconButton>
                <CloseIcon/>
            </IconButton>
        </div>
        <Box component='span'
              sx={{
                  fontWeight: 'bold',
                  fontSize: {xs: 25, sm: 25, md: 30, lg: 30, xl: 30},
                  fontFamily: 'SoraBold',
              }}>
            Delete Account
        </Box>
    </Box>
    <Box sx={{textAlign: 'center', marginTop: '10px'}}>

       <div style={{marginTop:'35px'}}>  Are you sure you want to delete your account?</div>

        <div style={{ marginTop: '35px', marginRight: '15px'}}>
          
          <Button 
            variant='outlined'
            id="cancel-btn"
            name='cancelBtn'
            sx={{
            width: 100,
            backgroundColor: 'primary',
            borderRadius: 22,
            ':hover': {backgroundColor: 'primary'},
            }} 
            onClick={props.toggle}
          >Cancel
          </Button>

          <Button 
            variant='contained'
            id="delete-btn"
            name='deleteBtn'
            sx={{
            width: 100,
            backgroundColor: 'primary',
            borderRadius: 22,
            marginLeft: '10px',
            ':hover': {backgroundColor: 'primary'},
          }} 
          onClick={()=>{
            props.toggle();
            props.deleteUserAccount();
          }}
          >Delete
          </Button>

        </div>
    </Box>    
  </Box> 
</Modal>
  );
}
