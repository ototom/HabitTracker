import AvatarUploadSection from '../components/Settings/AvatarUploadSection';
import PersonalDetailsSection from '../components/Settings/PersonalDetailsSection';
import './Settings.css';
import SensitiveDataSection from '../components/Settings/SensitiveDataSection';
import { useContext } from 'react';
import { authContext } from '../context/auth-context';

const Settings = () => {
    const { user, updateProfile, updateSensitiveData } =
        useContext(authContext);

    return (
        <>
            <div className='settings__header'>
                <h2>
                    <i className='fas fa-users-cog'></i>User settings
                </h2>
            </div>
            <div className='settings__content'>
                {user && (
                    <>
                        <AvatarUploadSection />
                        <PersonalDetailsSection
                            user={user}
                            updateProfile={updateProfile}
                        />
                        <SensitiveDataSection
                            user={user}
                            updateSensitiveData={updateSensitiveData}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Settings;
