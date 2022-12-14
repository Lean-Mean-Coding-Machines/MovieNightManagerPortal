import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MovieNightSegment from '../../component/MovieNightSegment';
import React, { useState } from 'react';

export function HomePage() {
  const navigate = useNavigate();

  const navigateToLogin = () => {navigate('/login')};

  const [appLoading, setAppLoading] = useState(true);

  const handleAppLoadingChange = (newState: boolean) => {setAppLoading(newState)};

  return (
    <div className='App' style={{ backgroundColor: 'ghostwhite', height: '100vh' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={appLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <nav className='login-btn'>
        <Button onClick={navigateToLogin} variant='contained'>
          Login/Sign up
        </Button>
      </nav>
      <Grid2 container>
        <Grid2 xs={12}>
          <div>
            <h1>Movie Night Manager</h1>
            <span></span>
          </div>
        </Grid2>
        <Grid2 xs={12}>
          <MovieNightSegment handleAppLoadingChange={handleAppLoadingChange} />
        </Grid2>
      </Grid2>
    </div>
  );
}
