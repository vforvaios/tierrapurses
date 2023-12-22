/* eslint-disable react-hooks/exhaustive-deps */
import SEO from 'components/seo/SEO';
import { getHomePageData } from 'models/actions/homeActions';
import { getKeyWords } from 'models/actions/staticActions';
import {
  homeOffers,
  homeSections,
  homeBanners,
} from 'models/selectors/homeSelectors';
import { keywords } from 'models/selectors/staticSelectors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeOffersTabs from './home-offer-tabs/HomeOffersTabs';
import HomeSections from './home-sections/HomeSections';
import HomeSlider from './home-slider/HomeSlider';

const Home = () => {
  const offers = useSelector(homeOffers);
  const sections = useSelector(homeSections);
  const banners = useSelector(homeBanners);
  const pageKeywords = useSelector(keywords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKeyWords('home'));
    dispatch(getHomePageData());
  }, []);

  return (
    <>
      <SEO
        title={`${process.env.REACT_APP_WEBSITE_NAME} ${pageKeywords}`}
        description={pageKeywords}
        name={process.env.REACT_APP_WEBSITE_NAME}
        type="article"
      />
      <div className="homeBG">
        {banners?.length > 0 && (
          <div className="row">
            <HomeSlider banners={banners} />
          </div>
        )}
        {offers?.length > 0 && (
          <div className="row">
            <div className="wrapper">
              <HomeOffersTabs offers={offers} />
            </div>
          </div>
        )}
        {sections?.length > 0 && <HomeSections sections={sections} />}
      </div>
    </>
  );
};

export default Home;
