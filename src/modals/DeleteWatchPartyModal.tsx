import { Box, Button, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode, useContext } from 'react';
import '../assets/DeleteAccountModal.css';
import IMnmApiResponse from '../model/IMnmApiResponse';
import IUser from '../model/user/IUser';
import { UserContext } from '../context/UserContext';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';
import IWatchParty from '../model/watchParty/IWatchParty';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  modalName?: string;
  watchParty: IWatchParty;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'block',
  background: '#f6f6f6',
  width: { xs: '80%', lg: '30%' },
  padding: '1rem 2rem 2rem 2rem',
  borderRadius: '1rem',
};

export default function DeletWatchPartyModal(props: ModalType) {
  const { userId } = useContext(UserContext);

  const api = useAxios();

  // TODO: Attach delete watch party API
  // const deleteWatchParty = () => {
  //   api
  //     .delete<IMnmApiResponse<IUser>>(`/user/delete/${userId}`)
  //     .then(() => {

  //     })
  //     .catch((err) => {
  //       console.error('Error deleting user account:', err);
  //       toast.error(`Account deletion failed`);
  //     });
  // };
  if (props.modalName === 'Delete Watch Party') {
    const chosenWatchDate = new Date(props.watchParty.chosenWatchDate)
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');

    return (
      <Modal
        open={props.isOpen}
        onClose={props.toggle}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Box sx={{ marginTop: '15px' }}>
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
                {props.modalName}
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
              <div className='delete-desc'>
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {`Are you sure you want to delete your Watch Party for\u00A0`}
                  <b>{chosenWatchDate}</b>?
                </p>
                <div>
                  <b>{`This will also delete all nominations as well.`}</b>
                </div>
              </div>

              <div className='btn-container'>
                <Button
                  variant='outlined'
                  id='cancel-btn'
                  name='cancelBtn'
                  sx={{
                    width: '10rem',
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
                  sx={{
                    width: '10rem',
                    backgroundColor: 'primary.main',
                    borderRadius: 22,
                    marginLeft: '10px',
                    ':hover': { backgroundColor: 'primary.dark' },
                  }}
                  onClick={() => {
                    props.toggle();
                  }}
                >
                  Delete
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  } else {
    return <></>;
  }
}
