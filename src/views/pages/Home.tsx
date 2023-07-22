import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from 'react';
import NewNominationModal from '../../modals/NewNominationModal';
import useModal from '../../hooks/useModal';
import AccountDropdownNav from '../../component/nav/AccountDropdownNav';
import MovieNightSegment from '../../component/MovieNightSegment';
import IMovieNightSegment from '../../model/IMovieNightSegment';
import useAxios from "../../hooks/useAxios";
import IMnmApiResponse from "../../model/IMnmApiResponse";

export function HomePage() {

  const [appLoading, setAppLoading] = useState(true);

  const handleAppLoadingChange = (newState: boolean) => { setAppLoading(newState) };

  const { isOpen, toggle } = useModal();

  const [segment, setSegment] = useState<IMovieNightSegment>({} as IMovieNightSegment);

  const api = useAxios();

  const getMovieNightSegment = () => {
      api.get<IMnmApiResponse<IMovieNightSegment>>("/segment/current")
          .then(
              (res) => {
                  if (res.data.status.success && res.data.data != null) {
                      setSegment(res.data.data);
                  }
                  handleAppLoadingChange(false);
              },
              (err) => console.log(err))
          .catch((err) => console.log(err.message));
  }
  
  useEffect(() => {
      getMovieNightSegment();
  });

  return (
    <>
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
            <NewNominationModal isOpen={isOpen} toggle={toggle} segment={segment} segmentRefresh={getMovieNightSegment}></NewNominationModal>
          </div>
          {/* Movie Night Segment */}
          <MovieNightSegment handleAppLoadingChange={handleAppLoadingChange} segment={segment}/>
        </Grid2>
      </Grid2>
    </>
  );
}
