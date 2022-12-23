import { useNavigate } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, CircularProgress, Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import Grid2 from '@mui/material/Unstable_Grid2';
import MovieNightSegment from '../../component/MovieNightSegment';
import React, { useState } from 'react';
import NewNomintationModal from '../../modals/NewNomintationModal';
import useModal from '../../hooks/useModal';

export function HomePage() {
  const navigate = useNavigate();
  const navigateToLogin = () => {navigate('/login')};
  const navigateToProfile = () => {navigate('/profile')};

  const [appLoading, setAppLoading] = useState(true);

  const handleAppLoadingChange = (newState: boolean) => {setAppLoading(newState)};

  const { isOpen, toggle } = useModal();

  // Profile btn functionality
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='App' style={{ backgroundColor: 'ghostwhite', height: '100vh' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={appLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <nav className='profile-dropdown'>
        <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#1F1F1F' }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} PaperProps={{ elevation: 0,
          sx: {overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Pass in user profile name here */}
        <MenuItem> Signed in as Geevers </MenuItem>
        <Divider/>
        <MenuItem onClick={navigateToProfile}> Your Profile </MenuItem>
        <MenuItem> Your Nominations </MenuItem>
        <Divider/>
        {/* Need to include an ngif here when you're actually signed in */}
        <MenuItem onClick={navigateToLogin}> Login </MenuItem>
        <MenuItem onClick={navigateToLogin}> Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
      </nav>
      
      <Grid2 container>
        <Grid2 xs={12}>
          <div>
            <h1>Movie Night Manager</h1>
            <span></span>
          </div>
        </Grid2>
        <Grid2 xs={12}>
        <div>        
        <Button endIcon={<LocalMoviesIcon/>} onClick={toggle} variant='contained' sx={{width: 200,backgroundColor: '#1F1F1F',borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',},}} id='nomination-btn'>
          Nominate a film
        </Button>
        <NewNomintationModal isOpen={isOpen} toggle={toggle}></NewNomintationModal>
        </div>
          <MovieNightSegment handleAppLoadingChange={handleAppLoadingChange} />
        </Grid2>
      </Grid2>
    </div>
  );
}
