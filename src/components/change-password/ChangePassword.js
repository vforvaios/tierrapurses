import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import SEO from 'components/seo/SEO';
import { changeUserPassword } from 'models/actions/userActions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const dispatch = useDispatch();

  const submitChangePasswordForm = () => {
    if (password === '') {
      setPasswordError('Πρέπει να συμπληρώσετε κωδικό!');
    } else {
      setPasswordError('');
    }

    if (confirmPassword === '' || confirmPassword !== password) {
      setConfirmPasswordError(
        'Πρέπει να συμπληρώσετε κωδικό ή δεν ταιριάζουν οι 2 κωδικοί!',
      );
    } else {
      setConfirmPasswordError('');
    }

    if (
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword
    ) {
      dispatch(changeUserPassword({ password, confirmPassword }));
    }
  };

  return (
    <div className="content user">
      <SEO
        title="Shoppy register"
        description="Shoppy register page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="text-center">
            <h1 className="page-title">ΑΛΛΑΓΗ ΚΩΔΙΚΟΥ</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="login-container">
            <div className="form-control">
              <FormControl fullWidth>
                <InputLabel htmlFor="login-password">ΝΕΟΣ ΚΩΔΙΚΟΣ</InputLabel>
                <Input
                  fullWidth
                  error={passwordError !== ''}
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError !== '' && (
                  <span className="error-span">{passwordError}</span>
                )}
              </FormControl>
            </div>
            <div className="form-control">
              <FormControl fullWidth>
                <InputLabel htmlFor="login-confirmpassword">
                  ΕΠΙΒΕΒΑΙΩΣΗ ΚΩΔΙΚΟΥ
                </InputLabel>
                <Input
                  fullWidth
                  error={confirmPasswordError !== ''}
                  id="login-confirmpassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError !== '' && (
                  <span className="error-span">{confirmPasswordError}</span>
                )}
              </FormControl>
            </div>
            <div className="form-control">
              <div className="actions">
                <button
                  className="button next"
                  onClick={submitChangePasswordForm}>
                  ΑΛΛΑΓΗ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
