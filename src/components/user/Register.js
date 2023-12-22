/* eslint-disable react-hooks/exhaustive-deps */
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import SEO from 'components/seo/SEO';
import { getKeyWords } from 'models/actions/staticActions';
import { registerUser } from 'models/actions/userActions';
import { keywords } from 'models/selectors/staticSelectors';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const dispatch = useDispatch();
  const pageKeywords = useSelector(keywords);

  const submitRegisterForm = () => {
    if (username === '') {
      setUsernameError('Πρέπει να συμπληρώσετε username!');
    } else {
      setUsernameError('');
    }

    if (email === '') {
      setEmailError('Πρέπει να συμπληρώσετε email!');
    } else {
      setEmailError('');
    }

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
      email !== '' &&
      username !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword
    ) {
      dispatch(registerUser({ username, email, password, confirmPassword }));
    }
  };

  useEffect(() => {
    dispatch(getKeyWords('register'));
  }, []);

  return (
    <div className="content user">
      <SEO
        title={`${process.env.REACT_APP_WEBSITE_NAME} register`}
        description={pageKeywords}
        name={process.env.REACT_APP_WEBSITE_NAME}
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="text-center">
            <h1 className="page-title">ΕΓΓΡΑΦΗ</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="login-container">
            <div className="form-control">
              <FormControl fullWidth>
                <InputLabel htmlFor="login-username">ΟΝΟΜΑ ΧΡΗΣΤΗ</InputLabel>
                <Input
                  fullWidth
                  id="login-username"
                  type="text"
                  value={username}
                  error={usernameError !== ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError !== '' && (
                  <span className="error-span">{usernameError}</span>
                )}
              </FormControl>
            </div>
            <div className="form-control">
              <FormControl fullWidth>
                <InputLabel htmlFor="login-email">EMAIL</InputLabel>
                <Input
                  fullWidth
                  id="login-email"
                  type="email"
                  value={email}
                  error={emailError !== ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError !== '' && (
                  <span className="error-span">{emailError}</span>
                )}
              </FormControl>
            </div>
            <div className="form-control">
              <FormControl fullWidth>
                <InputLabel htmlFor="login-password">ΚΩΔΙΚΟΣ</InputLabel>
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
                <button className="button next" onClick={submitRegisterForm}>
                  ΕΓΓΡΑΦΗ
                </button>
                <Link className="button next mrl12" to="/login">
                  ΕΙΣΟΔΟΣ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
