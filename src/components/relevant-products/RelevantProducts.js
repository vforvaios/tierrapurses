import Product from 'components/product/Product';
import React from 'react';
import Slider from 'react-slick';

const RelevantProducts = ({ title, products }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="relevant-products">
      <h2 className="section-title">{title}</h2>
      <div className="products">
        <ul className="products-grid">
          <Slider {...settings}>
            {products?.map((product) => (
              <li key={product.productId}>
                <Product product={product} />
              </li>
            ))}
          </Slider>
        </ul>
      </div>
    </div>
  );
};

export default RelevantProducts;
