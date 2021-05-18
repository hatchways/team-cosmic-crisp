import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import Search from './pages/Search/Search';

import './App.css';
import UserProfile from './pages/UserProfile/UserProfile';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/search" component={Search} />
            <AuthProvider>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <ProtectedRoute exact path="/user/profile" component={UserProfile} />
              <SocketProvider>
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              </SocketProvider>
            </AuthProvider>
          </Switch>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
