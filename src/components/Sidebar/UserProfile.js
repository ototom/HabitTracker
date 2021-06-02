import './UserProfile.css';
import profilePicturePlaceholder from '../../assets/profile-pic.svg';

const UserProfile = ({ displayName, mail, photoURL }) => {
    // TODO: fetch user data from API and display it istead of placeholder
    return (
        <div className='sidebar__user-profile'>
            <div className='img-circle sidebar__user-avatar'>
                <img
                    src={photoURL ? photoURL : profilePicturePlaceholder}
                    alt='user avatar'
                />
            </div>
            <div className='sidebar__user-details'>
                <h3>{displayName}</h3>
                <span>{mail}</span>
            </div>
        </div>
    );
};

export default UserProfile;
