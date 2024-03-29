import { Outlet, Route, Routes } from 'react-router-dom';
import { LoginPage } from './views/pages/LoginPage';
import { HomePage } from './views/pages/Home';
import { ProfilePage } from './views/pages/ProfilePage';
import TermsPage from './views/pages/TermsPage';
import PrivacyPage from './views/pages/PrivacyPage';
import './assets/styles.css';
import Layout from './views/pages/Layout';
import ContactPage from './views/pages/ContactPage';
import { CommunityPage } from './views/pages/CommunityPage';

interface WithNavLayoutProps {
  children?: React.ReactNode;
}

const WithNavLayout = ({ children }: WithNavLayoutProps) => (
  <Layout>
    <Outlet />
    {children}
  </Layout>
);

export function App() {
  return (
    <Routes>
      <Route element={<WithNavLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/terms' element={<TermsPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/communities' element={<CommunityPage />} />
      </Route>
    </Routes>
  );
}

export default App;
