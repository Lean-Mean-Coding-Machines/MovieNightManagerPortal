import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import NewNomintationModal from '../../modals/NewNomintationModal';
import useModal from '../../hooks/useModal';
import AccountDropdownNav from '../../component/nav/AccountDropdownNav';
import MovieNightSegment from '../../component/MovieNightSegment';

export function HomePage() {

  const [appLoading, setAppLoading] = useState(true);

  const handleAppLoadingChange = (newState: boolean) => { setAppLoading(newState) };

  const { isOpen, toggle } = useModal();

  return (
    <Box className='App' style={{ backgroundColor: 'ghostwhite', height: '100vh' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={appLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <AccountDropdownNav />

      <Grid2 container>
        <Grid2 xs={12}>
          <Box component='h1'>
            Movie Night Manager
          </Box>
        </Grid2>
        <Grid2 xs={12}>
          <div>
            <Button endIcon={<LocalMoviesIcon />} onClick={toggle} variant='contained' sx={{ width: 200, backgroundColor: '#1F1F1F', borderRadius: 22, ':hover': { backgroundColor: '#1F1F1F', }, }} id='nomination-btn'>
              Nominate a film
            </Button>
            <NewNomintationModal isOpen={isOpen} toggle={toggle}></NewNomintationModal>            
          </div>
          {/* Movie Night Segment */}
          <MovieNightSegment handleAppLoadingChange={handleAppLoadingChange}/>
        </Grid2>
      </Grid2>
    </Box>
  );
}
