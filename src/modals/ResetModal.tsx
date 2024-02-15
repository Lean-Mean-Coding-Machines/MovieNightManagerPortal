import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ChangeEvent, FormEvent, useState } from "react";

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
  background: '#f6f6f6',
  width: {xs: '80%', lg: '30%'},
  padding: '1rem 1rem 2rem 3rem',
  borderRadius: '1rem',
}

export default function ResetModal(props: ModalType) {

  const [emailFormData, setFormData] = useState({email: ''});
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...emailFormData,
      [name]: value,
    });
  };
  
  // Need to Expand upon this when Email Submission Post is created
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.toggle();
  };

  return (
        <Modal
            open={props.isOpen}
            onClose={props.toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >  
        <form onSubmit={handleSubmit}>
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
                    <TextField 
                    required
                    label='Email'
                    id='email-reset-input'
                    name="emailResetInput"
                    sx={{ width: '15rem'}}
                    value={emailFormData.email}
                    onChange={handleChange}
                    />
              </div>
                <div style={{ marginTop: '35px', marginRight: '15px'}}>
                  <Button 
                  variant='contained'
                  type="submit" 
                  id="send-btn"
                  name='sendBtn'
                  sx={{
                  width: 100,
                  backgroundColor: 'primary',
                  borderRadius: 22,
                  ':hover': {backgroundColor: 'primary',},
                  }} 
                  >Send
                  </Button>
                </div>
          </Box>    
      </Box> 
          </form>   
    </Modal>
  );
}
