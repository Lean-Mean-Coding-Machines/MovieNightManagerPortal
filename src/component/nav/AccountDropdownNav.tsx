import {Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router";
import {UserContext} from "../../context/UserContext";
import Button from "@mui/material/Button";
import * as React from "react";

export default function AccountDropdownNav() {
    const {username, logoutUser} = useContext(UserContext);
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login')
    };
    const navigateToProfile = () => {
        navigate('/profile')
    };
    const navigateToHome = () => {
        navigate('/')
    };

    // Profile btn functionality
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getUserLoggedInMenu = () => {
        return (
            <>
                <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ml: 2}}
                                    aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}>
                            <Avatar sx={{width: 32, height: 32, backgroundColor: '#1F1F1F'}}></Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
                      PaperProps={{
                          elevation: 0,
                          sx: {
                              overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
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
                      transformOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem>{username}</MenuItem>
                    <Divider/>
                    <MenuItem onClick={navigateToProfile}>View Profile</MenuItem>
                    <MenuItem onClick={logoutUser}>Sign Out</MenuItem>
                </Menu>
            </>
        );
    };

    return (
        <nav className='profile-dropdown'>
            <Button sx={{float:'left'}} onClick={navigateToHome}>MnM Logo</Button>
            {
                username !== "" ?
                    getUserLoggedInMenu() :
                    <a href="#" onClick={navigateToLogin}>Sign In</a>
            }
        </nav>
    );
}