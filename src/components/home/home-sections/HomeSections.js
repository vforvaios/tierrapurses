import Product from 'components/product/Product';
import React from 'react';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  touchMove: true,
  responsive: [
    {
      breakpoint: 961,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const HomeSections = ({ sections }) =>
  sections?.length > 0 &&
  sections?.map((section) => (
    <div key={section.id} className="row">
      <div className="wrapper">
        <h2 className="section-title">{section.title}</h2>
        <Slider {...settings}>
          {section?.products?.map((product) => (
            <div className="slider-product" key={product.productId}>
              <Product product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ));

export default HomeSections;
