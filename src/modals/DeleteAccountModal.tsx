import { Box, Button, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode, useContext } from 'react';
import '../assets/DeleteAccountModal.css';
import IMnmApiResponse from '../model/IMnmApiResponse';
import IUser from '../model/user/IUser';
import { UserContext } from '../context/UserContext';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

interface ModalType {
  children?: ReactNode;
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
  width: { xs: '80%', lg: '25%' },
  padding: '1rem 2rem 2rem 2rem',
  borderRadius: '1rem',
};

export default function DeleteAccountModal(props: ModalType) {
  const { userId } = useContext(UserContext);

  const api = useAxios();

  const { logoutUser } = useContext(UserContext);

  const deleteUserAccount = () => {
    api
      .delete<IMnmApiResponse<IUser>>(`/user/delete/${userId}`)
      .then(() => {
        logoutUser();
      })
      .catch((err) => {
        console.error('Error deleting user account:', err);
        toast.error(`Account deletion failed`);
      });
  };

  const handleSubmit = () => {
    props.toggle();
    deleteUserAccount();
  };
  return (
    <Modal
      open={props.isOpen}
      onClose={props.toggle}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        <form onSubmit={handleSubmit}>
          <div className='close-btn' onClick={props.toggle}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </div>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component='span'
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: 25, sm: 25, md: 30, lg: 30, xl: 30 },
                fontFamily: 'SoraBold',
              }}
            >
              Delete Account
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
            <div className='delete-desc'>
              {' '}
              Are you sure you want to delete your account?
            </div>

            <div className='btn-container'>
              <Button
                variant='outlined'
                id='cancel-btn'
                name='cancelBtn'
                sx={{
                  width: 100,
                  backgroundColor: 'primary',
                  borderRadius: 22,
                  ':hover': { backgroundColor: 'primary' },
                }}
                onClick={props.toggle}
              >
                Cancel
              </Button>

              <Button
                variant='contained'
                id='delete-btn'
                name='deleteBtn'
                type='submit'
                sx={{
                  width: 100,
                  backgroundColor: 'primary.main',
                  borderRadius: 22,
                  marginLeft: '10px',
                  ':hover': { backgroundColor: 'primary.dark' },
                }}
              >
                Delete
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
