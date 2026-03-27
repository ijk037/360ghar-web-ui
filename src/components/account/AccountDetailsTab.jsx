import { useEffect, useState } from 'react';
import { useUserStore } from '../../store';
import { toast } from 'react-toastify';

const getProfileDraft = (profile) => {
    const fullName = profile?.full_name || '';
    const parts = fullName.trim().split(' ').filter(Boolean);
    const firstName = parts.shift() || '';
    const lastName = parts.join(' ');

    return {
        firstName,
        lastName,
        displayName: fullName || [firstName, lastName].filter(Boolean).join(' '),
        displayEmail: profile?.email || '',
    };
};

const AccountDetailsTab = () => {
    const { profile, getProfile, updateProfile, isLoading, error, clearError } = useUserStore();
    const [draft, setDraft] = useState(null);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const formValues = draft ?? getProfileDraft(profile);

    const updateDraft = (key, value) => {
        setDraft((currentDraft) => ({
            ...(currentDraft ?? getProfileDraft(profile)),
            [key]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        clearError();
        const full_name = formValues.displayName || [formValues.firstName, formValues.lastName].filter(Boolean).join(' ');
        const success = await updateProfile({ full_name, email: formValues.displayEmail });
        if (success) {
            setDraft(null);
            toast.success('Account details updated');
        } else {
            toast.error(error || 'Failed to update');
        }
    };

    if (isLoading && !profile) {
        return <div className="py-4">Loading account details...</div>;
    }

    return (
        <>
            <p className="account-alert">Update your personal information associated with your account.</p>
            <form onSubmit={onSubmit}>
                <div className="card common-card mb-4">
                    <div className="card-body">
                        <h6 className="loginRegister__title text-poppins">Personal Information</h6>

                        <div className="row gy-lg-4 gy-3">
                            <div className="col-sm-6 col-xs-6">
                                <label htmlFor="FirstNamee" className="form-label">First Name</label>
                                <input type="text" className="common-input" value={formValues.firstName} onChange={(e)=>updateDraft('firstName', e.target.value)} placeholder="First Name" id="FirstNamee"/>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className="common-input" value={formValues.lastName} onChange={(e)=>updateDraft('lastName', e.target.value)} placeholder="Last Name" id="lastName"/>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                                <label htmlFor="displayName" className="form-label">Display Name</label>
                                <input type="text" className="common-input" value={formValues.displayName} onChange={(e)=>updateDraft('displayName', e.target.value)} placeholder="Display Name" id="displayName"/>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                                <label htmlFor="DisplayEmail" className="form-label">Display Email</label>
                                <input type="email" className="common-input"  placeholder="Display Email" value={formValues.displayEmail} onChange={(e)=>updateDraft('displayEmail', e.target.value)} id="DisplayEmail"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card common-card">
                    <div className="card-body">
                        <div className="row gy-lg-4 gy-3">
                            {error && <div className="col-12 text-danger">{error}</div>}
                            <div className="col-12">
                                <button type="submit" className="btn btn-main w-100" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AccountDetailsTab;
