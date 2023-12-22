const homeOffers = ({ homeReducer }) => homeReducer.offers.results;
const homeSections = ({ homeReducer }) => homeReducer.sections.results;
const homeBanners = ({ homeReducer }) => homeReducer.banners.results;
const logo = ({ homeReducer }) => homeReducer.logo;

export { homeOffers, homeBanners, homeSections, logo };
