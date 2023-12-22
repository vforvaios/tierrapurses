import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookiesManagement = () => {
  const handleCookieAcceptOrDecline = () => {
    window.location.reload();
  };

  return (
    <CookieConsent
      enableDeclineButton
      buttonText="ΣΥΜΦΩΝΩ"
      declineButtonText="ΔΕΝ ΣΥΜΦΩΝΩ"
      buttonClasses="button next"
      declineButtonClasses="button"
      buttonWrapperClasses="cookies-buttons"
      contentClasses="cookie-content"
      expires={1000}
      onAccept={handleCookieAcceptOrDecline}
      onDecline={handleCookieAcceptOrDecline}>
      Το SHOPPY χρησιμοποιεί cookies για την καλύτερη εμπειρία των χρηστών.
    </CookieConsent>
  );
};

export default CookiesManagement;
