import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

interface ProtectedRouteProps {
  // eslint-disable-next-line
  component: React.ComponentType<any>;
  exact?: boolean;
  path?: string;
}

export default function ProtectedRoute({ component: Component, ...rest }: ProtectedRouteProps): JSX.Element {
  const { loggedInUser } = useAuth();
  return <Route {...rest} render={(props) => (loggedInUser ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
