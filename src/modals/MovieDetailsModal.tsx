import { Box, Button, CardMedia, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import INomination from "../model/nomination/INomination";

interface ModalType {
    isOpen: boolean,
    toggle: () => void,
    nomination: INomination,
  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    background: '#f6f6f6',
    width: {xs: '80%', lg: '50%'},
    padding: '1rem 2rem 2rem 2rem',
    borderRadius: '1rem',
  }

// TODO: Configure styling for mobile/web, attach to api details call when created

export default function MovieDetailsModal(props: ModalType) {

  const poster = `https://image.tmdb.org/t/p/w500${props.nomination.posterPath}`;

    return (
        <Modal
            open={props.isOpen}
            onClose={props.toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <div style={{ float: 'right', 
                              marginTop: '-5px'
                            }} 
                     onClick={props.toggle}
                 >
                    <IconButton>
                        <CloseIcon/>
                    </IconButton>
                </div>
            <Box sx={{textAlign: 'center', marginTop: '10px'}}>
                <Box component='span'
                      sx={{
                          fontWeight: 'bold',
                          fontSize: {xs: 20, sm: 25, md: 25, lg: 25, xl: 25},
                          fontFamily: 'SoraBold',
                      }}>
                    {props.nomination.movieTitle}
                <Typography variant="body2" color="textSecondary" style={{marginBottom: '10px'}}>
                                ({props.nomination.releaseDate.split('-')[0]})
                            </Typography>
                </Box>
                
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <CardMedia
                      component="img"
                      sx={{height: '300px', width: '200px'}}
                      image={poster !== 'https://image.tmdb.org/t/p/w500null' ? poster : '/missingPoster.png'}
                      title={props.nomination.movieTitle}
                    />

                </Box>
                    <div style={{marginTop:'10px'}}>{props.nomination.movieOverview}</div>
      
                <div style={{ marginTop: '35px', marginRight: '15px'}}>
                  <Button 
                  variant='contained'
                  id="close-btn"
                  name='closeBtn'
                  sx={{
                  width: 100,
                  backgroundColor: 'primary',
                  borderRadius: 22,
                  ':hover': {backgroundColor: 'primary'},
                  }} 
                  onClick={props.toggle}
                  >Close
                  </Button>
                </div>
          </Box>    
      </Box> 
        </Modal>
    )

}