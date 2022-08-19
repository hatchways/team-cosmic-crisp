import { Button } from '@material-ui/core';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

import login from '../../helpers/APICalls/login';

const demoEmail = 'johnwick@gmail.com';
const demoPassword = '123456';

interface Props {
  setFeildValue?: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
  classes: { [key: string]: string };
}

const DemoButton = ({ setFeildValue, classes }: Props): JSX.Element => {
  const { updateLoginContext, getUserProfileDetails } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleLogin = () => {
    if (setFeildValue) {
      setFeildValue('email', demoEmail);
      setFeildValue('password', demoPassword);
    }

    login(demoEmail, demoPassword).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        getUserProfileDetails(data.success.user.profile);
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Button
      onClick={handleLogin}
      size="large"
      variant="contained"
      color="primary"
      className={classes.submit}
      disableElevation
    >
      Demo Login
    </Button>
  );
};

export default DemoButton;
