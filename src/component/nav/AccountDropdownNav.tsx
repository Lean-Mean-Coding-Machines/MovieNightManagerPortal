import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AccountDropdownNav() {
  const navigate = useNavigate();
  const navigateToLogin = () => { navigate('/login') };
  const navigateToProfile = () => { navigate('/profile') };

  // Profile btn functionality
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className='profile-dropdown'>
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#1F1F1F' }}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} PaperProps={{
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
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* Pass in user profile name here */}
          <MenuItem> Signed in as Geevers </MenuItem>
          <Divider />
          <MenuItem onClick={navigateToProfile}> Your Profile </MenuItem>
          <MenuItem> Your Nominations </MenuItem>
          <Divider />
          {/* Need to include an ngif here when you're actually signed in */}
          <MenuItem onClick={navigateToLogin}> Login </MenuItem>
          <MenuItem onClick={navigateToLogin}> Sign Out</MenuItem>
        </Menu>
      </>
    </nav>
  );
}