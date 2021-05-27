import './UserProfile.css';

const UserProfile = () => {
    // TODO: fetch user data from API and display it istead of placeholder
    return (
        <div className='sidebar__user-profile'>
            <div className='img-circle sidebar__user-avatar'>
                <img src='https://i.pravatar.cc/150?img=12' alt='user avatar' />
            </div>
            <div className='sidebar__user-details'>
                <h3>UserName</h3>
                <span>demo@demodemo.com</span>
            </div>
        </div>
    );
};

export default UserProfile;
