import React, { useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthStore } from '../../store';
import AccountHomeTab from './AccountHomeTab';
import AccountProfileTab from './AccountProfileTab';
import AccountAddressTab from './AccountAddressTab';
import AccountDetailsTab from './AccountDetailsTab';
import AccountMyPropertyTab from './AccountMyPropertyTab';
import AccountFavoritePropertyTab from './AccountFavoritePropertyTab';
import AccountChangePasswordTab from './AccountChangePasswordTab';

const tabDefinitions = [
  { key: 'home', label: 'Home', icon: 'fas fa-home', Component: AccountHomeTab },
  { key: 'profile', label: 'Profile', icon: 'fas fa-user', Component: AccountProfileTab },
  { key: 'address', label: 'Address', icon: 'fas fa-map-marker-alt', Component: AccountAddressTab },
  { key: 'details', label: 'Account Details', icon: 'fas fa-id-card', Component: AccountDetailsTab },
  { key: 'my-properties', label: 'My Properties', icon: 'fas fa-list', Component: AccountMyPropertyTab },
  { key: 'favorites', label: 'Favorite Properties', icon: 'fas fa-heart', Component: AccountFavoritePropertyTab },
  { key: 'change-password', label: 'Change Password', icon: 'fas fa-lock', Component: AccountChangePasswordTab },
];

const aliasToKey = {
  favourites: 'favorites',
  favorite: 'favorites',
  fav: 'favorites',
  properties: 'my-properties',
  myproperties: 'my-properties',
  'account-details': 'details',
  accountdetails: 'details',
  changepassword: 'change-password',
  password: 'change-password',
  visits: 'home',
  visit: 'home',
};

const AccountSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { logout } = useAuthStore();

  const tabKeys = useMemo(() => tabDefinitions.map((tab) => tab.key), []);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    const raw = (searchParams.get('tab') || '').toLowerCase();
    const normalized = aliasToKey[raw] || raw || 'home';
    const nextIndex = tabKeys.indexOf(normalized);
    setSelectedIndex(nextIndex >= 0 ? nextIndex : 0);
  }, [searchParams, tabKeys]);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    const key = tabKeys[index] || 'home';
    const params = new URLSearchParams(searchParams);
    params.set('tab', key);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleLogout = async () => {
    await logout();
    toast.success('You have been logged out', { theme: 'colored' });
    navigate('/login');
  };

  return (
    <>
      <ToastContainer />
      <section className="account padding-y-120">
        <div className="container container-two">
          <Tabs selectedIndex={selectedIndex} onSelect={handleSelect}>
            <div className="row gy-4">
              <div className="col-12 col-lg-4 col-xl-3">
                <div className="account-sidebar search-sidebar account-sidebar--sticky">
                  <TabList className="nav side-tab flex-lg-column flex-row nav-pills me-lg-3 mb-0">
                    {tabDefinitions.map((tab) => (
                      <Tab className="nav-link" key={tab.key}>
                        <span className="icon">
                          <i className={tab.icon} aria-hidden="true"></i>
                        </span>
                        <span>{tab.label}</span>
                      </Tab>
                    ))}
                  </TabList>
                  <button type="button" className="nav-link account-logout-btn" onClick={() => void handleLogout()}>
                    <span className="icon">
                      <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                    </span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              <div className="col-12 col-lg-8 col-xl-9">
                {tabDefinitions.map(({ key, Component }) => (
                  <TabPanel key={key}>
                    <Component />
                  </TabPanel>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default AccountSection;
