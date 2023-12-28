import MiniCartItem from 'components/cartItem/MiniCartItem';
import { cart } from 'models/selectors/cartSelectors';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MiniCartDrawer = ({ itemsLength, setToggleValue }) => {
  const myCart = useSelector(cart);
  const navigate = useNavigate();
  const myCloseMenuBtn = useRef(null);

  return (
    <div className="mini-cart-drawer-wrapper">
      <div>
        <h1 className="page-title">Το καλάθι μου</h1>
        <i
          className="hidden"
          onClick={setToggleValue('right', false)}
          ref={myCloseMenuBtn}
        />
      </div>
      <div className="mini-cart-drawer-items">
        {itemsLength > 0
          ? myCart?.map((item, index) => (
              <MiniCartItem
                setToggleValue={setToggleValue}
                key={`${item?.productId}_${index}`}
                item={item}
              />
            ))
          : 'Το καλάθι σας είναι άδειο.'}
      </div>
      <div className="mini-cart-actions">
        <div
          onClick={() => {
            myCloseMenuBtn.current.dispatchEvent(
              new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1,
              }),
            );
          }}>
          ΚΛΕΙΣΙΜΟ
        </div>
        {itemsLength > 0 && (
          <div
            className="button navigation next"
            onClick={() => {
              navigate('./cart');
              myCloseMenuBtn.current.dispatchEvent(
                new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true,
                  buttons: 1,
                }),
              );
            }}>
            ΤΑΜΕΙΟ
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCartDrawer;
