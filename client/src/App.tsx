import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { ReactourProvider } from './context/useReactourContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import Listings from './pages/Listings/Listings';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import Messages from './pages/Messages/Messages';

import './App.css';
import Layout from './components/Layout/Layout';
import Bookings from './pages/Bookings/Bookings';
import Checkout from './pages/Checkout/Checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Request from './pages/Request/Request';
import { MessageContextProvider } from './context/useMessageContext';

const stripePromise = loadStripe(
  'pk_test_51IVRB6CdI42AEkrXDes5BDsK6tR03Ihth9P5Hw4D4txwuJdym1uTQ6SW50VgZ8ZuoiZ4FO1b7tUQLdcmoGwK7sTB00goG0DVvu',
);
const CheckoutContainer = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <MessageContextProvider>
              <SocketProvider>
                <ReactourProvider>
                  <Layout>
                    <Switch>
                      <Route exact path="/" component={LandingPage} />
                      <Route exact path="/listings" component={Listings} />
                      <Route exact path="/profile/:id" component={ProfileDetails} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />
                      <ProtectedRoute exact path="/checkout" component={CheckoutContainer} />
                      <ProtectedRoute exact path="/bookings" component={Bookings} />
                      <ProtectedRoute exact path="/messages" component={Messages} />
                      <ProtectedRoute exact path="/messages/:conversationId" component={Messages} />
                      <ProtectedRoute exact path="/user/:path" component={ProfileSettings} />
                      <ProtectedRoute exact path="/requests" component={Request} />
                    </Switch>
                  </Layout>
                </ReactourProvider>
              </SocketProvider>
            </MessageContextProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
