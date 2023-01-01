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
import AccountDropdownNav from '../../component/nav/AccountDropdownNav';

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

export function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();
  const navigateHome = () => { navigate('/') };
  const navigateToLogin = () => { navigate('/login') };
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
      <AccountDropdownNav />

      <h1 style={{ marginLeft: 15 }}>Settings</h1>
      <h4 style={{ marginLeft: 15, marginBottom: 25 }}>Manage your account settings and preferences</h4>
      <hr style={{ color: '#000000', backgroundColor: '#000000', height: .1, borderColor: '#000000', width: 625, marginLeft: 15 }} />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
        <Tabs orientation="vertical" TabIndicatorProps={{ sx: { backgroundColor: '#1F1F1F' } }} value={value} onChange={handleChange} aria-label="Profile Tab Group" sx={{ borderColor: '#1F1F1F', marginTop: 4 }}>
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

