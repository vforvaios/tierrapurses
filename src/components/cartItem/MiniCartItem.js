import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ToolTip from '@mui/material/Tooltip';
import formatMoney from 'library/formatMoney';
import {
  removeItemFromCart,
  updateCartItemTotal,
} from 'models/actions/cartActions';
import React from 'react';
import { useDispatch } from 'react-redux';

const MiniCartItem = ({ item, setToggleValue }) => {
  const dispatch = useDispatch();

  return (
    <div className="mini-cart-drawer-flex">
      <div>
        <div className="cart-description">
          <span>
            <img
              className="cart-item-image"
              src={`${process.env.REACT_APP_IMAGES_URL}/${
                item?.imgHref?.indexOf('#') !== -1
                  ? item?.imgHref
                      ?.substr(0, item?.imgHref.lastIndexOf('#') - 1)
                      ?.split('#')?.[0]
                  : item?.imgHref
              }`}
              alt="product description"
            />
          </span>
          <span>{item.productTitle}</span>
        </div>
      </div>
      <div>
        <TextField
          variant="standard"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
          }}
          value={item.total}
          onChange={(e) =>
            dispatch(
              updateCartItemTotal({
                total: e.target.value,
                productId: item?.productId,
              }),
            )
          }
        />
      </div>
      <div className="mini-cart-prices">
        <div>
          <div className="cart-item-initial-price">
            {formatMoney.format(item.initialPrice)}
          </div>
          <div className="totalPrice">
            {formatMoney.format(item.price * item.total)}{' '}
          </div>
        </div>
        {item.total === 0 && (
          <ToolTip title="Δεν υπάρχει πλέον διαθέσιμο το προϊόν. Παρακαλώ διαγράψτε το για να συνεχίσετε.">
            <IconButton
              onClick={() =>
                dispatch(
                  removeItemFromCart({ id: item.productId, checkout: true }),
                )
              }
              className="icon-cancel-circled removeCancel">
              <i className="icon-trash-empty" />
            </IconButton>
          </ToolTip>
        )}
      </div>

      <div>
        <IconButton
          onClick={() =>
            dispatch(
              removeItemFromCart({ id: item.productId, checkout: false }),
            )
          }>
          <i className="icon-trash-empty" />
        </IconButton>
      </div>
    </div>
  );
};

export default MiniCartItem;
