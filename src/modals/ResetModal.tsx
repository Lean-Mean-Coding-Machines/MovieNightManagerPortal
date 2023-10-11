import { Box, Button, FormControl, IconButton, Input, InputLabel, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

interface ModalType {
  isOpen: boolean;
  toggle: () => void;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'block',
  background: 'white',
  width: {xs: '80%', lg: '30%'},
  padding: '1rem 1rem 2rem 3rem',
  borderRadius: '1rem',
}

export default function ResetModal(props: ModalType) {
  return (
        <Modal
            open={props.isOpen}
            onClose={props.toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >     
        <Box sx={modalStyle}>
            <Box sx={{textAlign: 'center', marginTop: '10px'}}>
                  <Box component='span'
                        sx={{
                            fontWeight: 'bold',
                            fontSize: {xs: 20, sm: 25, md: 30, lg: 35, xl: 40},
                            fontFamily: 'SoraBold',
                        }}>
                      Forgot Your Password?
                  </Box>
                    <div style={{float: 'right', marginTop: '-5px'}} onClick={props.toggle}>
                        <IconButton>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div style={{ marginTop: 30}}>Please provide your account email address to receive an email to reset your password.</div>
      
              <div style={{ marginTop: '20px'}}>
                <FormControl variant='standard'>
                    <InputLabel htmlFor='standard-adornment-email-address'>
                      Email 
                    </InputLabel>
                    <Input sx={{ width: '15rem'}} id='email-reset-input'/>
                </FormControl>
              </div>
                <div style={{ marginTop: '35px', marginRight: '15px'}}>
                  <Button variant='contained' 
                  sx={{
                  width: 100,
                  backgroundColor: '#1F1F1F',
                  borderRadius: 22,
                  ':hover': {backgroundColor: '#1F1F1F',},
                  }} 
                  onClick={props.toggle}>Send
                  </Button>
                </div>
          </Box>    
      </Box> 
    </Modal>
  );
}
