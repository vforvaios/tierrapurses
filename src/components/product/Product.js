/* eslint-disable react-hooks/exhaustive-deps */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { withStyles } from '@mui/styles';
import formatMoney from 'library/formatMoney';
import getPercentage from 'library/getPercentage';
import { addToCart } from 'models/actions/cartActions';
import { setGeneralLoading } from 'models/actions/catalogActions';
import {
  addProductWishlist,
  removeProductWishlist,
} from 'models/actions/wishlistActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './styles';

const Product = ({ classes, product, isWishlist }) => {
  const {
    productId,
    productTitle,
    imgHref,
    price,
    initialPrice,
    code,
    stock,
    isNew,
  } = product;

  const dispatch = useDispatch();

  return (
    <Link className="navlink product" to={`/product/${productId}`}>
      <Card className={classes?.root}>
        <CardMedia className={classes.media} title={productTitle}>
          {imgHref?.length > 1 ? (
            <div className="productImage">
              <img
                alt={productTitle}
                title={productTitle}
                src={`${process.env.REACT_APP_IMAGES_URL}/${
                  imgHref.indexOf('#') !== -1
                    ? imgHref.substr(0, imgHref.indexOf('#'))
                    : imgHref
                }`}
              />
            </div>
          ) : (
            <div className="productImage no-image">NO IMAGE</div>
          )}
        </CardMedia>
        <CardContent>
          <div className="price-container no-margin">
            <span className="discount absolute">
              {getPercentage(initialPrice, price)}%
            </span>
          </div>
          <div className="headerTitleContainer">
            <div className="headerTitle">{productTitle}</div>
            <div className="price-container">
              <div>
                <span>{formatMoney.format(initialPrice)}</span>
                {formatMoney.format(price)}
              </div>
            </div>
          </div>
          <p className="product-code">
            <span>{code}</span>
          </p>
          <p className={`in-stock ${stock === 0 ? 'not' : ''}`}>
            <span>{stock > 0 ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}</span>
          </p>
          {isNew ? <span className="is-new mb0">ΝΕΟ</span> : null}
        </CardContent>
        <CardActions disableSpacing className="card-actions">
          {stock > 0 ? (
            <button
              className="add-to-cart"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart(product));
              }}>
              ΑΓΟΡΑ
            </button>
          ) : (
            <span>&nbsp;</span>
          )}

          {!isWishlist ? (
            <IconButton
              className="product-action"
              aria-label="add to favorites"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setGeneralLoading(true));
                dispatch(addProductWishlist(productId));
              }}>
              <i className="icon-heart-empty" />
            </IconButton>
          ) : (
            <IconButton
              className="product-action"
              aria-label="remove from favorites"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setGeneralLoading(true));
                dispatch(removeProductWishlist(productId));
              }}>
              <i className="icon-trash-empty" />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Link>
  );
};

export default withStyles(styles)(Product);
