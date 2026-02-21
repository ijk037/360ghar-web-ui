import { useEffect } from 'react';
import { useAuthStore, useVisitStore } from '../../store';

const AccountHomeTab = () => {
  const { user } = useAuthStore();
  const { upcomingVisits, getUpcomingVisits } = useVisitStore();

  const profileCompleteness = [
    Boolean(user?.full_name),
    Boolean(user?.email),
    Boolean(user?.phone),
  ].filter(Boolean).length;

  const completionPercent = Math.round((profileCompleteness / 3) * 100);

  useEffect(() => {
    getUpcomingVisits();
  }, [getUpcomingVisits]);

  return (
    <>
      <div className="account-home-grid">
        <div className="account-alert account-alert--welcome">
          Hello <strong className="text-heading fw-500 text-poppins">{user?.full_name || 'Guest'}</strong>
          <span className="d-block mt-1 text-muted">Manage your profile, saved listings, and visits from one place.</span>
        </div>
        <div className="account-alert account-alert--metric">
          <span className="account-alert__label">Upcoming visits</span>
          <strong className="account-alert__value">{upcomingVisits?.length || 0}</strong>
        </div>
        <div className="account-alert account-alert--metric">
          <span className="account-alert__label">Profile completion</span>
          <strong className="account-alert__value">{completionPercent}%</strong>
        </div>
      </div>
    </>
  );
};

export default AccountHomeTab;