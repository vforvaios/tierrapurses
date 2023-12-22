import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Product from 'components/product/Product';
import TabPanel from 'components/tab-panel/TabPanel';
import { withActiveTab } from 'library';
import React from 'react';
import Slider from 'react-slick';

import './homeOffersTabs.scss';

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

const HomeOffersTabs = ({ handleChange, value, offers }) => {
  return (
    <>
      <h2 className="section-title">ΠΡΟΣΦΟΡΕΣ</h2>
      <div className="tabsContainer">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example">
          {offers?.map((offer) => (
            <Tab key={offer.id} label={offer.title} />
          ))}
        </Tabs>
      </div>
      <div className="offers">
        {offers?.map((offer) => (
          <TabPanel key={offer?.id} value={value} index={offer?.index}>
            <Slider {...settings}>
              {offer?.products?.map((product) => (
                <div className="slider-product" key={product.productId}>
                  <Product product={product} />
                </div>
              ))}
            </Slider>
          </TabPanel>
        ))}
      </div>
    </>
  );
};

export default withActiveTab(HomeOffersTabs);
