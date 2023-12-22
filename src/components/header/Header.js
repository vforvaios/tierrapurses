/* eslint-disable react-hooks/exhaustive-deps */
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import MiniCart from 'components/cart/MiniCart';
import MainMenu from 'components/main-menu/MainMenu';
import UserMenu from 'components/usermenu/UserMenu';
import { withToggle } from 'library';
import { getLogo } from 'models/actions/homeActions';
import { logo } from 'models/selectors/homeSelectors';
import { token } from 'models/selectors/userSelector';
import React, { useEffect } from 'react';
import { withCookies } from 'react-cookie';
import ReactGA from 'react-ga4';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { compose } from 'redux';

const TRACKING_ID = process.env.REACT_APP_TRACKING_ID; // OUR_TRACKING_ID

const Header = ({ cookies, toggleValue, setToggleValue }) => {
  const dispatch = useDispatch();
  const userToken = useSelector(token);

  const logoImage = useSelector(logo);
  const location = useLocation();

  useEffect(() => {
    dispatch(getLogo());
  }, []);

  useEffect(() => {
    if (
      cookies.get('CookieConsent') !== null &&
      cookies.get('CookieConsent') !== undefined &&
      cookies.get('CookieConsent') === 'true'
    ) {
      ReactGA.initialize(TRACKING_ID);
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search,
      });
    }
  }, [location.pathname]);

  return (
    <Grid container className="headerContainer">
      <Grid item sm={3}>
        <i
          onClick={setToggleValue('left', true)}
          className="menuIcon icon-menu"
        />
        <Drawer
          anchor="left"
          open={toggleValue?.left}
          onClose={setToggleValue('left', false)}>
          <MainMenu setToggleValue={setToggleValue} />
        </Drawer>
      </Grid>
      <Grid item sm={6} className="logo">
        <Link to="/">
          <img
            src={logoImage?.preview}
            alt={logoImage?.data?.name}
            className="logo-image"
          />
        </Link>
      </Grid>
      <Grid item sm={3}>
        <div className="headerActions">
          <MiniCart />
          <UserMenu token={userToken} />
        </div>
      </Grid>
    </Grid>
  );
};

export default compose(withToggle, withCookies)(Header);
