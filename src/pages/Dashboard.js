import { useContext } from 'react';
import { authContext } from '../context/auth-context';

const Dashboard = () => {
    const { logout } = useContext(authContext);
    return (
        <div>
            Dashboard <button onClick={logout}>LOGOUT</button>
        </div>
    );
};

export default Dashboard;
