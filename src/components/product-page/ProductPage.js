/* eslint-disable react-hooks/exhaustive-deps */
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RelevantProducts from 'components/relevant-products/RelevantProducts';
import SEO from 'components/seo/SEO';
import formatMoney from 'library/formatMoney';
import getPercentage from 'library/getPercentage';
import { addToCart } from 'models/actions/cartActions';
import {
  getProductDetails,
  getRelatedProducts,
} from 'models/actions/catalogActions';
import { addProductWishlist } from 'models/actions/wishlistActions';
import {
  singleProduct,
  relatedProducts,
} from 'models/selectors/catalogSelectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(singleProduct);
  const relProducts = useSelector(relatedProducts);

  const {
    productTitle,
    productDescription,
    initialPrice,
    price,
    imgHref,
    code,
    productLargeDescription,
    isNew,
    stock,
  } = product;

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getRelatedProducts(id));
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
  };

  const allImgHrefs = imgHref
    ?.substr(0, imgHref.lastIndexOf('#'))
    .split('#')
    ?.map((imag) => imag);

  return (
    <div className="productPage content">
      <SEO
        title={`${process.env.REACT_APP_WEBSITE_NAME} ${productTitle}`}
        description={`${process.env.REACT_APP_WEBSITE_NAME} ${productTitle}`}
        name={process.env.REACT_APP_WEBSITE_NAME}
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <Grid container>
            <Grid item sm={6} xs={12} className="mainProductPhotosContainer">
              {isNew ? <div className="is-new">ΝΕΟ</div> : null}
              <div className="price-container">
                <span className="discount absolute">
                  {getPercentage(initialPrice, price)}%
                </span>
              </div>
              <Slider {...settings}>
                {allImgHrefs?.map((myImage, index) => (
                  <img
                    key={`${myImage}_${index}`}
                    src={`${process.env.REACT_APP_IMAGES_URL}/${myImage}`}
                    alt={productTitle}
                    title={productTitle}
                  />
                ))}
              </Slider>
            </Grid>
            <Grid item sm={6} xs={12} className="pr0 mainProductRightSection">
              <div className="product-title">
                <h1 className="headerTitle">{productTitle}</h1>
              </div>
              <Typography
                variant="body2"
                component="p"
                className="product-code">
                <span>Κωδικός: {code}</span>
              </Typography>

              <div className="price-container for-product-page">
                <div>
                  <span>{formatMoney.format(initialPrice)}</span>
                  {formatMoney.format(price)}
                </div>
              </div>

              <Typography
                className="product-description"
                component="p"
                variant="body1">
                {productDescription}
              </Typography>
              <p className={`in-stock ${stock === 0 ? 'not' : ''}`}>
                <span>{stock > 0 ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}</span>
              </p>
              <div className="product-page-actions">
                <button
                  className="add-to-cart"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToCart(product));
                  }}>
                  ΑΓΟΡΑ
                </button>
                <IconButton
                  className="product-action"
                  aria-label="add to favorites"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addProductWishlist(id));
                  }}>
                  <i className="icon-heart-empty" />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      {productLargeDescription && (
        <div className="row">
          <div className="wrapper">
            <div className="section-title">ΠΕΡΙΓΡΑΦΗ</div>
            <div
              dangerouslySetInnerHTML={{ __html: productLargeDescription }}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="wrapper">
          <RelevantProducts title="ΣΧΕΤΙΚΑ ΠΡΟΪΟΝΤΑ" products={relProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
