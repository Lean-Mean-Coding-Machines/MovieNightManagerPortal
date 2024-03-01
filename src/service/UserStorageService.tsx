import IUserAuthResponse from '../model/user/IUserAuthResponse';
import ICommunitySummary from '../model/community/ICommunitySummary';

const getUsername = (): string => {
  return localStorage.getItem('username') === null
    ? ''
    : localStorage.getItem('username')!.toString();
};

const setUsername = (name: string) => {
  localStorage.setItem('username', name);
};

const getUserId = (): number => {
  return localStorage.getItem('userId') === null
    ? 0
    : +localStorage.getItem('userId')!;
};

const setUserId = (id: number) => {
  localStorage.setItem('userId', id.toString());
};

const getSelectedCommunity = (): ICommunitySummary => {
  return localStorage.getItem('community') === null
    ? ({} as ICommunitySummary)
    : JSON.parse(localStorage.getItem('community')!);
};

const setSelectedCommunity = (community: ICommunitySummary) => {
  localStorage.setItem('community', JSON.stringify(community));
};

const getEnrolledCommunities = (): ICommunitySummary[] => {
  return localStorage.getItem('communities') === null
    ? []
    : JSON.parse(localStorage.getItem('communities')!);
};

const setEnrolledCommunities = (communities: ICommunitySummary[]) => {
  localStorage.setItem('communities', JSON.stringify(communities));
};

const setUserData = (res: IUserAuthResponse) => {
  setUsername(res.username);
  setUserId(res.userId);
};

const setCommunityData = (res: ICommunitySummary[]) => {
  setEnrolledCommunities(res);
  setSelectedCommunity(res.length ? res[0] : { id: 0, name: '' });
};

const clearUserData = () => {
  setUsername('');
  setUserId(0);
  setEnrolledCommunities([]);
  setSelectedCommunity({ id: 0, name: '' });
};

const setAuthToken = (res: IUserAuthResponse) => {
  localStorage.setItem('authToken', res.token);
};

const getAuthToken = () => {
  return localStorage.getItem('authToken') === null
    ? ''
    : localStorage.getItem('authToken')!.toString();
};

const UserStorageService = {
  setUserData,
  getUsername,
  setUsername,
  getUserId,
  setUserId,
  setCommunityData,
  getSelectedCommunity,
  setSelectedCommunity,
  getEnrolledCommunities,
  setEnrolledCommunities,
  clearUserData,
  setAuthToken,
  getAuthToken,
};

export default UserStorageService;
