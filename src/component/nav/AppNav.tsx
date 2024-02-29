import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NewCommunityModal from '../../modals/NewCommunityModal';
import useModal from '../../hooks/useModal';
import { FormControl } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';

interface menuSettingAction {
  dropDownName: string;
  action: () => void;
}

export default function AppNav() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {
    username,
    logoutUser,
    communities,
    selectedCommunity,
    setSelectedCommunity,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const settings: menuSettingAction[] = [
    { dropDownName: 'Profile', action: navigateToProfile },
    { dropDownName: 'Sign Out', action: logoutUser },
  ];

  const [selectedCommunityVal, setSelectedCommunityVal] = useState(
    selectedCommunity.id + ''
  );

  const handleCommunityChange = (event: SelectChangeEvent) => {
    setSelectedCommunityVal(event.target.value);
    communities.findIndex(
      (community) => community.id === Number(event.target.value)
    );
    setSelectedCommunity(
      communities[
        communities.findIndex(
          (community) => community.id === Number(event.target.value)
        )
      ]
    );
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const { isOpen, toggle, modalName } = useModal();

  const toggleModal = (modalName: string) => {
    toggle(modalName);
  };

  useEffect(() => {
    if (selectedCommunity.id > 0) {
      setSelectedCommunityVal(selectedCommunity.id + '');
    }
  }, [selectedCommunity]);

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#015f76' }}>
        <Container sx={{ '&.MuiContainer-root': { maxWidth: '100%' } }}>
          <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography
              variant='h6'
              component={Link}
              to='/'
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'white',
                ':hover': {
                  color: '#f1f1f1',
                },
                textDecoration: 'none',
              }}
            >
              {/* Mobile */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <AdbIcon sx={{ mr: 3, ':hover': { color: '#f1f1f1' } }} />
                MNM
              </Box>
              {/* Desktop */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <AdbIcon sx={{ mr: 3, ':hover': { color: '#f1f1f1' } }} />
                Movie Night Manager
              </Box>
            </Typography>

            {!window.location.pathname.includes('/login') &&
              (username !== '' ? (
                <Box
                  sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}
                >
                  {/*TODO: Need to figure out mobile view for communities  */}
                  <Tooltip
                    title={<>{<Typography>Create Community</Typography>}</>}
                    placement='bottom-start'
                  >
                    <Button
                      variant='outlined'
                      sx={{
                        color: '#fff',
                        borderColor: '#fff',
                        marginRight: '15px',
                        height: '38px',
                        ':hover': {
                          color: '#f1f1f1',
                          borderColor: '#f1f1f1',
                        },
                        display: { xs: 'none', sm: 'inline-flex' },
                      }}
                      onClick={() => {
                        toggleModal('Community');
                      }}
                    >
                      <AddIcon />
                      <GroupsIcon />
                    </Button>
                  </Tooltip>

                  {/* #TODO: add tooltip for Select Communities, needs to use open/close state since it covers menu items  */}
                  {communities.length > 0 && (
                    <FormControl>
                      <Select
                        labelId='selected-community-dropdown-label'
                        id='selected-community-dropdown'
                        value={selectedCommunityVal}
                        onChange={handleCommunityChange}
                        sx={{
                          color: '#fff',
                          height: '38px',
                          marginRight: '15px',
                          width: '150px',
                          '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#fff !important',
                          },
                          '.MuiSvgIcon-root ': {
                            fill: '#fff !important',
                          },
                          '&:hover fieldset': {
                            borderColor: '#fff !important',
                          },
                          display: { xs: 'none', sm: 'inline-flex' },
                        }}
                      >
                        {communities.map((community) => (
                          <MenuItem
                            style={{ whiteSpace: 'normal' }}
                            sx={{ width: '150px' }}
                            value={community.id}
                            key={community.id}
                            selected={community.id === selectedCommunity.id}
                          >
                            <div
                              style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {community.name}
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  <Tooltip
                    title={<>{<Typography>Manage Profile</Typography>}</>}
                    enterDelay={900}
                  >
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar
                        id='profile-btn'
                        aria-label='ProfileBtn'
                        alt={username}
                        sx={{
                          color: '#015f76',
                          background: '#fff',
                          ':hover': {
                            background: '#f1f1f1',
                          },
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    onClick={handleCloseUserMenu}
                  >
                    {settings.map(
                      (setting) =>
                        !(
                          setting.dropDownName === 'Profile' &&
                          window.location.pathname.includes('/profile')
                        ) && (
                          <MenuItem
                            key={setting.dropDownName}
                            onClick={setting.action}
                          >
                            <Typography textAlign='center'>
                              {setting.dropDownName}
                            </Typography>
                          </MenuItem>
                        )
                    )}
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ float: 'right' }}>
                    <Button
                      id='sign-in-btn'
                      name='signInBtn'
                      variant='outlined'
                      sx={{
                        color: '#fff',
                        borderColor: '#fff',
                        ':hover': {
                          color: '#f1f1f1',
                          borderColor: '#f1f1f1',
                        },
                      }}
                      onClick={navigateToLogin}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Box>
              ))}
          </Toolbar>
        </Container>
      </AppBar>
      <>
        <NewCommunityModal
          isOpen={isOpen}
          toggle={toggle}
          modalName={modalName}
        ></NewCommunityModal>
      </>
    </>
  );
}
