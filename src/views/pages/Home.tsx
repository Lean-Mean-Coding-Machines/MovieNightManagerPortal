import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NominationCard from '../../component/NominationCard';
import IMovieNightSegment from '../../model/IMovieNightSegment';
import MovieNightSegmentService from '../../service/MovieNightSegmentService';
import NewNomintationModal from '../../modals/NewNomintationModal';
import useModal from '../../hooks/useModal';
import AccountDropdownNav from '../../component/nav/AccountDropdownNav';

export function HomePage() {
  const [appLoading, setAppLoading] = useState(true);

  const handleAppLoadingChange = (newState: boolean) => { setAppLoading(newState) };

  const { isOpen, toggle } = useModal();

  const [segment, setSegment] = useState<IMovieNightSegment | null | undefined>(null);

  useEffect(() => {
    MovieNightSegmentService.getCurrentSegment()
      .then(
        (res) => {setSegment(res.data.data); 
          handleAppLoadingChange(false);
        },
        (err) => console.log(err)).catch((err) => console.log(err.message));
  }, []);


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
          {!!segment ? (
            <Grid2 container>
              <Grid2 xs={12}>
                <h2>
                  {segment.nominationStartDate.toString().split('T').shift()?.replaceAll('-','/').slice(5) + '/' + segment.segmentEndDate.toString().slice(0,4)} -{' '}
                  {segment.segmentEndDate.toString().split('T').shift()?.replaceAll('-','/').slice(5) + '/' + segment.segmentEndDate.toString().slice(0,4)}
                </h2>
              </Grid2>
              <Grid2 style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                  {segment.nominations.map((nom) => (<NominationCard nomination={nom} />
                  ))}
                </Stack>
              </Grid2>
            </Grid2>
          ) : (<Grid2 container />)}
        </Grid2>
      </Grid2>
    </Box>
  );
}
