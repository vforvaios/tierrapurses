/* eslint-disable react-hooks/exhaustive-deps */
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import formatMoney from 'library/formatMoney';
import { checkShippingMethod } from 'models/actions/checkoutActions';
import { shippingMethods } from 'models/selectors/checkoutSelectors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ShippingMethods = () => {
  const dispatch = useDispatch();
  const currentShippingMethods = useSelector(shippingMethods);

  return (
    <div className="shipping-methods">
      <h3>ΤΡΟΠΟΙ ΑΠΟΣΤΟΛΗΣ</h3>
      <FormControl>
        <RadioGroup
          aria-labelledby="payment-methods"
          value={currentShippingMethods?.find((sm) => sm?.checked)?.name || ''}
          onChange={(e) => dispatch(checkShippingMethod(e.target.value))}
          name="payment-methods">
          {currentShippingMethods?.map((shippingmethod) => (
            <FormControlLabel
              key={shippingmethod?.id}
              value={shippingmethod?.name}
              control={<Radio />}
              label={`${shippingmethod?.name} ${
                shippingmethod?.cost > 0
                  ? `(${formatMoney.format(shippingmethod.cost)})`
                  : ''
              }`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ShippingMethods;
