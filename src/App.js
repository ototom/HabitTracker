import { Route, Switch } from 'react-router';
import PrivateRoute from './components/shared/PrivateRoute/PrivateRoute';
import AuthProvider from './context/auth-context';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
    return (
        <AuthProvider>
            <Switch>
                <Route path='/auth/:mode'>
                    <Auth />
                </Route>
                <PrivateRoute path='/' exact>
                    <Dashboard />
                </PrivateRoute>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </AuthProvider>
    );
}

export default App;
