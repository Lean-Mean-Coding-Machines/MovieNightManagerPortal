import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './views/pages/LoginPage';
import { HomePage } from './views/pages/Home';
import { ProfilePage } from './views/pages/ProfilePage';

import './assets/styles.css';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/profile' element={<ProfilePage />}/>
    </Routes>
  );
}

export default App;
