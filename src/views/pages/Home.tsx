import {
  Box,
  Button,
  Fab,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import NewNominationModal from '../../modals/NewNominationModal';
import useModal from '../../hooks/useModal';
import AddIcon from '@mui/icons-material/Add';
import INomination from '../../model/nomination/INomination';
import NominationCard from '../../component/nomination/NominationCard';
import { UserContext } from '../../context/UserContext';
import NewWatchPartyModal from '../../modals/WatchPartyModal';
import NewCommunityModal from '../../modals/NewCommunityModal';
import '../../assets/HomePage.css';
import useAxios from '../../hooks/useAxios';
import IWatchParty from '../../model/watchParty/IWatchParty';
import IMnmApiResponse from '../../model/IMnmApiResponse';
import ICommunitySummary from '../../model/community/ICommunitySummary';
import { LoadingSpinner } from '../../component/LoadingSpinner';
import useLoadingSpinner from '../../hooks/useLoadingSpinner';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletWatchPartyModal from '../../modals/DeleteWatchPartyModal';

export function HomePage() {
  const api = useAxios();

  const theme = useTheme();

  const { toggleLoading, loading } = useLoadingSpinner();

  const { isOpen, toggle, modalName } = useModal();

  const userContext = useContext(UserContext);

  const [watchParty, setWatchParty] = useState<IWatchParty>({} as IWatchParty);

  const modalTextName = userContext.selectedCommunity.id
    ? 'Watch Party'
    : 'Community';

  const [manageWatchPartyActive, setManageWatchPartyActive] = useState(Boolean);

  const getWatchParty = (selectedCommunity: number) => {
    if (selectedCommunity > 0) {
      api
        .get<IMnmApiResponse<IWatchParty>>(
          '/segment/current/' + selectedCommunity
        )
        .then(
          (res) => {
            if (res.data.status.success) {
              setWatchParty(
                res.data.data ? res.data.data : ({} as IWatchParty)
              );
            }
          },
          (err) => console.log(err)
        )
        .catch((err) => console.log(err.message));
    }
  };

  const getCommunity = () => {
    api
      .get<IMnmApiResponse<ICommunitySummary[]>>(
        '/community/summary/user/' + userContext.userId
      )
      .then(
        (res) => {
          if (res.data.data) {
            const community = res.data.data;
            userContext.setCommunityData(community);
            userContext.setCommunities(community);
          }
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    toggleLoading(true);
    if (userContext.userId > 0) {
      getCommunity();
      getWatchParty(userContext.selectedCommunity.id);
    }
    toggleLoading(false);
  }, []);

  useEffect(() => {
    getWatchParty(userContext.selectedCommunity.id);
  }, [userContext.selectedCommunity.id]);

  if (watchParty.chosenWatchDate) {
    const chosenWatchDate = new Date(watchParty.chosenWatchDate)
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');

    return (
      <>
        <LoadingSpinner loadingState={loading} />

        {!loading && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className='center-text'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {' '}
                  {`Watch Party Nominations for ${chosenWatchDate}`}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginLeft: '8px',
                      padding: '5px 10px 0 10px',
                    }}
                  >
                    <div style={{ paddingLeft: '5px' }}>
                      <Tooltip
                        title={<>{<Typography>Edit Watch Party</Typography>}</>}
                      >
                        <EditIcon
                          sx={{
                            backgroundColor: 'primary.main',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '5px',
                            ':hover': { backgroundColor: 'primary.dark' },
                          }}
                          onClick={() => {
                            setManageWatchPartyActive(true);
                            toggle(modalTextName);
                          }}
                        ></EditIcon>
                      </Tooltip>
                    </div>

                    <div style={{ paddingLeft: '10px' }}>
                      <Tooltip
                        title={
                          <>{<Typography>Delete Watch Party</Typography>}</>
                        }
                      >
                        <DeleteIcon
                          sx={{
                            backgroundColor: 'primary.main',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '5px',
                            ':hover': { backgroundColor: 'primary.dark' },
                          }}
                          onClick={() => {
                            toggle('Delete Watch Party');
                          }}
                        ></DeleteIcon>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </h2>
              <Grid
                container
                rowSpacing={4}
                columnSpacing={5}
                sx={{
                  display: 'flex',
                  background: '#14181c',
                  paddingBottom: '5rem',
                  marginTop: '-18px',
                  paddingLeft: '40px',
                  flexDirection: 'row',
                  alignContent: 'center',
                  [theme.breakpoints.up('md')]: {
                    flexDirection: 'row',
                  },
                  [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                  },
                }}
              >
                {watchParty.nominations
                  .sort(
                    (a, b) =>
                      b.nominationLikes.length - a.nominationLikes.length
                  )
                  .map((nom: INomination, i) => (
                    <Grid item xs={10} md={6} lg={3} key={nom.id}>
                      <div className='card-ranking'>{i + 1}</div>
                      <NominationCard
                        watchPartyId={watchParty.id}
                        nomination={nom}
                        watchPartyRefresh={() =>
                          getWatchParty(userContext.selectedCommunity.id)
                        }
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
            {/* Hides Nominate btn if user isn't logged in */}
            {userContext.username && (
              <Tooltip title={<>{<Typography>Nominate a Movie</Typography>}</>}>
                <Fab
                  onClick={() => {
                    toggle('newNomination');
                  }}
                  sx={{
                    visibility: isOpen ? 'hidden' : 'visible',
                    color: '#fff',
                    backgroundColor: 'primary.main',
                    position: 'fixed',
                    bottom: '64px',
                    right: '10%',
                    // Desktop
                    [theme.breakpoints.up('md')]: {
                      bottom: '64px',
                      right: '10%',
                    },
                    // Mobile
                    [theme.breakpoints.down('sm')]: {
                      right: '5%',
                      bottom: '3%',
                    },
                    ':hover': { backgroundColor: 'primary.dark' },
                  }}
                  aria-label='add'
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}

            {/* Modals */}
            <NewNominationModal
              isOpen={isOpen}
              toggle={toggle}
              watchParty={watchParty}
              watchPartyRefresh={() =>
                getWatchParty(userContext.selectedCommunity.id)
              }
              modalName={modalName}
            />

            <NewCommunityModal
              isOpen={isOpen}
              toggle={toggle}
              modalName={modalName}
            />

            <NewWatchPartyModal
              isOpen={isOpen}
              toggle={toggle}
              modalName={modalName}
              setWatchParty={setWatchParty}
              setManageWatchPartyActive={setManageWatchPartyActive}
              manageWatchPartyActive={manageWatchPartyActive}
            />

            <DeletWatchPartyModal
              isOpen={isOpen}
              toggle={toggle}
              modalName={modalName}
              watchParty={watchParty}
              watchPartyRefresh={() =>
                getWatchParty(userContext.selectedCommunity.id)
              }
            />
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <LoadingSpinner loadingState={loading} />

        {userContext.username && !watchParty.chosenWatchDate && !loading && (
          <div className='new-watch-party-container'>
            <div className='center-text'>
              {' '}
              {`Looks like you haven't created a ${modalTextName} yet`}
            </div>
            <div style={{ marginTop: '10px' }}>
              <Button
                onClick={() => {
                  setManageWatchPartyActive(false);
                  toggle(modalTextName);
                }}
                id='create-watch-party'
                name='createWatchPartyBtn'
                sx={{
                  width: '12rem',
                  height: '3rem',
                  marginTop: '4rem',
                  fontSize: 'larger',
                  color: '#fff',
                  backgroundColor: 'primary.main',
                  borderRadius: 22,
                  marginLeft: '10px',
                  ':hover': { backgroundColor: 'primary.dark' },
                }}
              >
                {' '}
                Create{' '}
              </Button>
            </div>
          </div>
        )}

        <NewWatchPartyModal
          isOpen={isOpen}
          toggle={toggle}
          modalName={modalName}
          setWatchParty={setWatchParty}
          manageWatchPartyActive={manageWatchPartyActive}
        />
        <NewCommunityModal
          isOpen={isOpen}
          toggle={toggle}
          modalName={modalName}
        />
      </>
    );
  }
}
