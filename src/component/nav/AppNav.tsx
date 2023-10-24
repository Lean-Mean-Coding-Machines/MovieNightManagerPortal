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

interface menuSettingAction {
    setting: string,
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
        {setting: 'My Profile', action: navigateToProfile},
        {setting: 'Sign Out', action: logoutUser}
    ];

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#03C4C7' }}>
            <Container sx={{"&.MuiContainer-root": { maxWidth: '100%' }}}>
                <Toolbar disableGutters sx={{display: 'flex'}}>
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        noWrap
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'white',
                            ':hover': {
                                color: '#54276F'
                            },
                            textDecoration: 'none',
                        }}
                    >
                    {/* Mobile */}
                        <Box sx={{display: {xs: 'flex', sm: 'none'}}}>
                        <AdbIcon sx={{mr: 3, ':hover': { color: '#54276F' }}}/>
                            MNM
                        </Box>
                    {/* Desktop */}
                        <Box sx={{display: {xs: 'none', sm: 'flex'}}}>
                        <AdbIcon sx={{mr: 3, ':hover': { color: '#54276F' }}}/>
                            Movie Night Manager
                        </Box>
                    </Typography>

                    {
                        username !== ""  ?
                            <Box sx={{flexGrow: 1}}>
                                <Tooltip title="Open Profile">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0, float: 'right'}}>
                                        <Avatar alt={username}/>
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
                                        <MenuItem key={setting.setting} onClick={setting.action}>
                                            <Typography textAlign="center">{setting.setting}</Typography>
                                        </MenuItem>
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
                                            color: 'white',
                                            borderColor: 'white',
                                            ':hover': {
                                                color: '#54276F',
                                                borderColor: '#54276F'
                                            }
                                        }} 
                                    onClick={navigateToLogin}>Sign In
                                    </Button>
                                </Box>
                            </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppNav;