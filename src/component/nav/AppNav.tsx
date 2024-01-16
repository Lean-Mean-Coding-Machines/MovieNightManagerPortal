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
import {useNavigate} from "react-router";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import {Link} from 'react-router-dom';

interface menuSettingAction {
    dropDownName: string,
    action: () => void
}

function AppNav() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const {username, logoutUser} = useContext(UserContext);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/profile')
    };

    const navigateToLogin = () => {
        navigate('/login')
    };

    const settings: menuSettingAction[] = [
        {dropDownName: 'Profile', action: navigateToProfile},
        {dropDownName: 'Sign Out', action: logoutUser}
    ];

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#015f76' }}>
            <Container sx={{"&.MuiContainer-root": { maxWidth: '100%' }}}>
                <Toolbar disableGutters sx={{display: 'flex'}}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        noWrap
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'white',
                            ':hover': {
                                color: '#f1f1f1'
                            },
                            textDecoration: 'none',
                        }}
                    >
                    {/* Mobile */}
                        <Box sx={{display: {xs: 'flex', sm: 'none'}}}>
                        <AdbIcon sx={{mr: 3, ':hover': { color: '#f1f1f1' }}}/>
                            MNM
                        </Box>
                    {/* Desktop */}
                        <Box sx={{display: {xs: 'none', sm: 'flex'}}}>
                        <AdbIcon sx={{mr: 3, ':hover': { color: '#f1f1f1' }}}/>
                            Movie Night Manager
                        </Box>
                    </Typography>
                        { !window.location.pathname.includes('/login') && (
                         username !== ""  ?
                         <Box sx={{flexGrow: 1}}>
                             <Tooltip title={
                                <>
                                {<Typography>
                                    Manage Profile
                                </Typography>
                                }
                                </>
                                } 
                            enterDelay={900}
                            >
                                 <IconButton onClick={handleOpenUserMenu} sx={{p: 0, float: 'right'}}>
                                     <Avatar 
                                         alt={username} 
                                         sx={{color:'#015f76', 
                                         background: '#fff',
                                         ':hover': {
                                             background: '#f1f1f1',
                                         }
                                         }}/>
                                 </IconButton>
                             </Tooltip>
                             <Menu
                                 sx={{mt: '45px'}}
                                 id="menu-appbar"
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
                                 {settings.map((setting) => (
                                    !(setting.dropDownName === 'Profile' && window.location.pathname.includes('/profile')) && (
                                        <MenuItem key={setting.dropDownName} onClick={setting.action}>
                                        <Typography textAlign="center">{setting.dropDownName}</Typography>
                                    </MenuItem>
                                    )

                                 ))}
                             </Menu>
                         </Box> :
                         <Box sx={{flexGrow: 1}}>
                             <Box sx={{float: 'right'}}>
                                 <Button 
                                     id='sign-in-btn'
                                     name='signInBtn'
                                     variant="outlined" 
                                     sx={{
                                         color: '#fff',
                                         borderColor: '#fff',
                                         ':hover': {
                                             color: '#f1f1f1',
                                             borderColor: '#f1f1f1'
                                         }
                                     }} 
                                     onClick={navigateToLogin}>
                                     Sign In
                                 </Button>
                             </Box>
                         </Box>   
                        )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppNav;