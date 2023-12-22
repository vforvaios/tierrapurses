import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import SEO from 'components/seo/SEO';
import { setGeneralLoading } from 'models/actions/catalogActions';
import { sendNewUserPassword } from 'models/actions/userActions';
import { user } from 'models/selectors/userSelector';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSelector = useSelector(user);

  const submitLoginForm = () => {
    if (email === '') {
      setEmailError('Πρέπει να συμπληρώσετε email!');
    } else {
      setEmailError('');
    }

    if (email !== '') {
      const data = { username: email };

      dispatch(setGeneralLoading(true));
      dispatch(sendNewUserPassword(data));
    }
  };

  useEffect(() => {
    userSelector?.token && navigate('/');
  }, [userSelector.token, navigate]);

  return (
    <div className="content user">
      <SEO
        title="Shoppy forgot password"
        description="Shoppy forgot password page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className=" text-center">
            <h1 className="page-title">ΕΠΑΝΑΦΟΡΑ ΚΩΔΙΚΟΥ</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="login-container">
            <div className="form-control">
              <FormControl fullWidth>
                <InputLabel htmlFor="login-email">
                  ΟΝΟΜΑ ΧΡΗΣΤΗ/EMAIL
                </InputLabel>
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
              <div className="actions">
                <button className="button next" onClick={submitLoginForm}>
                  ΕΠΑΝΑΦΟΡΑ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
