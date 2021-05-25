import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import Listings from './pages/Listings/Listings';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';

import './App.css';
import Layout from './components/Layout/Layout';
import Book from './pages/Book/book';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <Layout>
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/profile/:id" component={ProfileDetails} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/book" component={Book} />
                  <ProtectedRoute exact path="/listings" component={Listings} />
                  <ProtectedRoute exact path="/user/:path" component={ProfileSettings} />
                </Switch>
              </Layout>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
