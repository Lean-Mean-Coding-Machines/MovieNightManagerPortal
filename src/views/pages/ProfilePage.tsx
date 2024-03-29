import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteAccountModal from '../../modals/DeleteAccountModal';
import useModal from '../../hooks/useModal';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import useAxios from '../../hooks/useAxios';
import IMnmApiResponse from '../../model/IMnmApiResponse';
import IUser from '../../model/user/IUser';
import INomination from '../../model/nomination/INomination';
import '../../assets/ProfilePage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfileNomCard from '../../component/nomination/ProfileNomCard';
import useLoadingSpinner from '../../hooks/useLoadingSpinner';
import { LoadingSpinner } from '../../component/LoadingSpinner';

const emptyUser: IUser = {
  id: 0,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  nominations: [],
  nominationLikes: [],
};

export function ProfilePage() {
  const { userId } = useContext(UserContext);

  // Toggles Delete Modal & Edit Modal open and close
  const { isOpen, toggle } = useModal();

  const { toggleLoading, loading } = useLoadingSpinner();

  const [user, setUser] = useState(emptyUser);

  const api = useAxios();

  let DesktopSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
  };

  let mobileSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  const getUserDetails = () => {
    toggleLoading(true);
    api
      .get<IMnmApiResponse<IUser>>(`/user/details/${userId}`)
      .then(
        (res) => {
          if (res.data.status.success && res.data.data != null) {
            setUser(res.data.data);
          }
          toggleLoading(false);
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err.message));
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (userId) {
        getUserDetails();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <LoadingSpinner loadingState={loading} />
      {!loading && (
        <>
          <h1 style={{ marginLeft: 15, color: '#fff' }}> Profile</h1>
          <hr />

          <h3>Info</h3>

          <div className='profile-info-container'>
            <Box
              component='form'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete='on'
            >
              <TextField
                disabled
                id='first-name-outlined-disabled'
                name='firstNameInputDisabled'
                label='First Name'
                value={user.firstName}
              />
              <TextField
                disabled
                name='lastNameInputDisabled'
                id='last-name-outlined-disabled'
                label='Last Name'
                value={user.lastName}
              />
              <TextField
                disabled
                name='userNameInputDisabled'
                id='username-outlined-disabled'
                label='Username'
                value={user.username}
              />
              <TextField
                disabled
                id='email-outlined-disabled'
                name='emailInputDisabled'
                label='Email'
                value={user.email}
              />

              <Button
                variant='contained'
                id='delete-btn'
                name='deleteBtn'
                sx={{
                  marginTop: '15px',
                  width: '100%',
                  backgroundColor: 'primary.main',
                  borderRadius: 22,
                  ':hover': { backgroundColor: 'primary.dark' },
                }}
                onClick={toggle}
              >
                Delete Account
              </Button>
            </Box>
          </div>

          <hr />

          <h3>Nominations</h3>
          {/* Slider is actually a carousel */}
          {desktopView ? (
            <div className='desktop-slider-container'>
              {user.nominations.length > 6 ? (
                <Slider {...DesktopSettings}>
                  {user.nominations.map((nom: INomination, index) => (
                    <ProfileNomCard key={index} nomination={nom} />
                  ))}
                </Slider>
              ) : (
                <Stack direction='row' spacing={3}>
                  {user.nominations.map((nom: INomination, index) => (
                    <ProfileNomCard key={index} nomination={nom} />
                  ))}
                </Stack>
              )}
            </div>
          ) : (
            <div className='mobile-slider-container'>
              <Slider {...mobileSettings}>
                {user.nominations.map((nom: INomination, index) => (
                  <ProfileNomCard key={index} nomination={nom} />
                ))}
              </Slider>
            </div>
          )}

          {user.nominations.length === 0 && (
            <div style={{ color: '#fff', marginLeft: '60px' }}>
              {' '}
              You haven't added any movie nominations yet
            </div>
          )}

          {/* Modals */}
          <DeleteAccountModal isOpen={isOpen} toggle={toggle} />
        </>
      )}
    </>
  );
}
