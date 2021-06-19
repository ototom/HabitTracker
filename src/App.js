import { Route, Switch } from 'react-router';
import PrivateRoute from './components/shared/PrivateRoute/PrivateRoute';
import AuthProvider from './context/auth-context';
import NotificationProvider from './context/notification-context';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <NotificationProvider>
            <AuthProvider>
                <Switch>
                    <Route path='/auth/:mode'>
                        <Auth />
                    </Route>
                    <PrivateRoute path='/'>
                        <Dashboard />
                    </PrivateRoute>
                </Switch>
            </AuthProvider>
        </NotificationProvider>
    );
}

export default App;
