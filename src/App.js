import { Route, Switch } from 'react-router';
import PrivateRoute from './components/shared/PrivateRoute/PrivateRoute';
import AuthProvider from './context/auth-context';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
    return (
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
    );
}

export default App;
