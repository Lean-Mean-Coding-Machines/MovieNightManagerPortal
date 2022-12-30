import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Profile from '../../component/UserProfile/Profile';
import Password from '../../component/UserProfile/Password';
import Email from '../../component/UserProfile/Email';
import { Avatar, Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import DeleteAccountModal from '../../modals/DeleteAccountModal';
import useModal from '../../hooks/useModal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export  function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();
  const navigateHome = () => {navigate('/')};
  const navigateToLogin = () => {navigate('/login')};
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

   // Profile btn functionality
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };

// Toggles Delete Modal open and close
  const { isOpen, toggle } = useModal();

  return (
    <>
    <nav>
    <Button onClick={navigateHome}>MnM Logo</Button>
    <div className='profile-dropdown'>
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
        <MenuItem> Your Nominations </MenuItem>
        <Divider/>
        <MenuItem onClick={navigateToLogin}> Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
    </div>
  </nav>


<h1 style={{marginLeft: 15}}>Settings</h1>
  <h4 style={{marginLeft: 15, marginBottom: 25}}>Manage your account settings and preferences</h4>
  <hr style={{color: '#000000',backgroundColor: '#000000',height: .1,borderColor : '#000000', width: 625, marginLeft: 15}}/>    
  <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs orientation="vertical" TabIndicatorProps={{ sx: { backgroundColor: '#1F1F1F'} }} value={value} onChange={handleChange} aria-label="Profile Tab Group" sx={{  borderColor: '#1F1F1F', marginTop: 4 }}>
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Email" {...a11yProps(1)} />
        <Tab label="Password" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Profile toggle={toggle}></Profile>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Email></Email>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <Password></Password>
      </TabPanel>
    </Box>

        {/* Delete Account Modal */}
    <DeleteAccountModal isOpen={isOpen} toggle={toggle} ></DeleteAccountModal>
    </>
  );
}

