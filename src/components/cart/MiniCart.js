import Drawer from '@mui/material/Drawer';
import { withToggle } from 'library';
import { cart } from 'models/selectors/cartSelectors';
import React from 'react';
import { useSelector } from 'react-redux';

import MiniCartDrawer from './MiniCartDrawer';

const MiniCart = ({ toggleValue, setToggleValue }) => {
  const itemsLength = useSelector(cart)?.reduce((acc, curr) => {
    acc = Number(acc) + Number(curr?.total);

    return acc;
  }, 0);

  return (
    <>
      <button className="mini-cart" onClick={setToggleValue('right', true)}>
        <i className="icon-shopping-basket" />
        <span>{itemsLength}</span>
      </button>
      <Drawer
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: 340,
            backgroundColor: '#fff!important',
          },
        }}
        anchor="right"
        open={toggleValue?.right}
        onClose={setToggleValue('right', false)}>
        {itemsLength > 0 ? (
          <MiniCartDrawer setToggleValue={setToggleValue} />
        ) : (
          'Δεν υπάρχουν προϊόντα στο καλάθι.'
        )}
      </Drawer>
    </>
  );
};

export default withToggle(MiniCart);
