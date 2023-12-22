import React from 'react';

const CheckoutStepper = ({ step }) => (
  <div className="checkout-stepper-container">
    <ul>
      <li className={step === '1' || !step ? 'active' : null}>1. ΣΥΝΔΕΣΗ</li>
      <li className={step === '2' ? 'active' : null}>
        2. ΔΙΕΥΘΥΝΣΗ &amp; ΠΛΗΡΩΜΗ
      </li>
      <li className={step === '3' ? 'active' : null}>
        3. ΕΠΙΒΕΒΑΙΩΣΗ ΠΑΡΑΓΓΕΛΙΑΣ
      </li>
      <li className={step === '4' ? 'active' : null}>4. ΟΛΟΚΛΗΡΩΣΗ</li>
    </ul>
  </div>
);

export default CheckoutStepper;
