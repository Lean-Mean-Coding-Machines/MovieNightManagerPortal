import { Box, Button, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../assets/DeleteAccountModal.css';
import useAxios from '../hooks/useAxios';

interface ModalType {
  isOpen: boolean;
  toggle: () => void;
  modalName?: string;
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

export default function DeleteCommunityModal(props: ModalType) {
  const api = useAxios();

  const handleSubmit = () => {
    props.toggle();
  };

  if (props.modalName === 'Delete Community') {
    return (
      <Modal
        open={props.isOpen}
        onClose={props.toggle}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <form onSubmit={handleSubmit}>
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
                    {`Are you sure you want to delete  ****Community name\u00A0`}
                    <b>{''}</b>?
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
                    type='submit'
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
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    );
  } else {
    return <></>;
  }
}
