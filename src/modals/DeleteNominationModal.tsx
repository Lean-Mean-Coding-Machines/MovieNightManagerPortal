import { Box, Button, CardMedia, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import INomination from "../model/nomination/INomination";

interface ModalType {
    isOpen: boolean,
    toggle: () => void,
    nomination: INomination,
    modalName?: string,
    deleteNomination: () => void
  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    background: '#f6f6f6',
    width: {xs: '80%', lg: '30%'},
    padding: '1rem 2rem 2rem 2rem',
    borderRadius: '1rem',
  }

// TODO: Configure styling for mobile/web, attach to api details call when created

export default function DeleteNominationModal(props: ModalType) {

    const poster = `https://image.tmdb.org/t/p/w500${props.nomination.posterPath}`;

    if (props.modalName === 'deleteNomination') {
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
                    Delete Nomination?
                </Box>
            </Box>
            <Box sx={{textAlign: 'center', marginTop: '10px'}}>

                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <CardMedia
                      component="img"
                      sx={{height: '300px', width: '200px'}}
                      image={poster !== 'https://image.tmdb.org/t/p/w500null' ? poster : '/missingPoster.png'}
                      title={props.nomination.movieTitle}
                    />

                </Box>
               <div style={{marginTop:'35px'}}>  Are you sure you wish to delete <b>"{props.nomination.movieTitle}"</b>?</div>
      
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
                  onClick={()=>{props.toggle();props.deleteNomination()}}
                  >Delete
                  </Button>

                </div>
          </Box>    
      </Box> 
        </Modal>
    )} 
    else {
    return <>
    </>
  }
}