import {Box, Button, CardMedia, IconButton, Modal, Typography, useMediaQuery, useTheme} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import INomination from "../model/nomination/INomination";
import { useState } from "react";
import '../assets/MovieDetailsModal.css';

interface ModalType {
    isOpen: boolean,
    toggle: () => void,
    nomination: INomination,
    modalName?: string,
  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: {xs: '50%', lg: '50%'},
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    background: '#f6f6f6',
    width: {xs: '80%', lg: '50%'},
    height: {xs: '90%', lg: '70%'},
    padding: '1rem 2rem 2rem 2rem',
    borderRadius: '1rem',
    overflowY:'auto',
  }


export default function MovieDetailsModal(props: ModalType) {

  const [expandText, setExpandText] = useState(false);

  const expandHandler = () => {
    setExpandText(!expandText);
}

  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  const poster = `https://image.tmdb.org/t/p/w500${props.nomination.posterPath}`;

  if (props.modalName === 'movieDetails') {
    return (
        <Modal
            open={props.isOpen}
            onClose={props.toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                
                <div style={{ float: 'right', marginTop: '13px'}} onClick={props.toggle}>
                    <IconButton>
                        <CloseIcon/>
                    </IconButton>
                </div>

            <Box sx={{marginTop: '20px'}}>
                <Box component='span'
                      sx={{
                          fontWeight: 'bold',
                          fontSize: {xs: 20, sm: 25, md: 25, lg: 25, xl: 25},
                          fontFamily: 'SoraBold',
                      }}>
                    {props.nomination.movieTitle}
                  <div>

                  <Typography variant="body2" color="textSecondary" style={{marginBottom: '10px'}}>       
                  <span style={{display:'flex'}}>
                     <li style={{listStyleType: 'none', marginRight:'5px'}}> {props.nomination.releaseDate?.split('-')[0]} </li>
                      <li>
                        <span style={{marginLeft:'-8px'}}>
                        {`${Math.floor(props.nomination.runtime / 60)}h ${props.nomination.runtime % 60}m`}
                        </span>
                      </li>
                    </span>               
                  </Typography>
                  </div>

                </Box>

                <Box sx={{display:'flex', justifyContent:'center', borderRadius:'4px'}}>
                    <CardMedia
                      component="img"
                      sx={{height: '300px', width: '200px', marginBottom:'10px'}}
                      image={poster !== 'https://image.tmdb.org/t/p/w500null' ? poster : '/missingPoster.png'}
                      title={props.nomination.movieTitle}
                    />
                </Box>
                        
                {(props.nomination.genres.length > 0 && props.nomination.genres[0] !== "") &&
                  <div className="genres-container">

                    {props.nomination.genres.map((genre, index) => (
                      <span className="genre" key={index}>{` ${genre} `}</span>
                    ))}
                  </div>
                }

                <div className={`${props.nomination.movieOverview?.length > 350 && !expandText ? "details-card-container" : ""}`}>
                    <Typography className={`${props.nomination.movieOverview?.length > 350 && !expandText ? "long-overview-desc" : "short-overview-desc"}`}>
                        {props.nomination.movieOverview}
                    </Typography>
                </div>

                  { !desktopView && ( 
                      <div>
                      {/* TODO: Need to determine why expand class styles are being overwritten */}
                      { (props.nomination.movieOverview?.length > 350 && !expandText) && 
                          <Button 
                              id={`read-more-btn ${props.nomination.id}`}
                              name="readMoreBtn"
                              className="expand-text-btn" 
                              onClick={expandHandler}
                          >
                          Read More
                          </Button> 
                      }
                      { expandText && 
                          <Button 
                              id={`read-less-btn ${props.nomination.id}`}
                              name="readLessBtn"
                              className="expand-text-btn" 
                              onClick={expandHandler}
                          >
                          Read Less
                          </Button> 
                      }
                   </div>
                  )}
    
                <div className="close-btn-container">
                  <Button 
                    variant='contained'
                    id="close-btn"
                    name='closeBtn'
                    sx={{
                    width: 100,
                    backgroundColor: 'primary',
                    borderRadius: 22,
                    cursor:'pointer',
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
  } else {
    return <>
    </>
  }
}