/* eslint-disable react-hooks/exhaustive-deps */
import Alert from 'components/alert/Alert';
import Cart from 'components/cart/Cart';
import Catalog from 'components/catalog/Catalog';
import CategoriesLanding from 'components/categoriesLanging/CategoriesLanding';
import ChangePassword from 'components/change-password/ChangePassword';
import CheckoutEdit from 'components/checkout/CheckoutEdit';
import CheckoutLogin from 'components/checkout/CheckoutLogin';
import CheckoutSuccess from 'components/checkout/CheckoutSuccess';
import Confirm from 'components/checkout/Confirm';
import Contact from 'components/contact/Contact';
import CookiesManagement from 'components/cookies-management/CookiesManagement';
import Footer from 'components/footer/Footer';
import ForgotPassword from 'components/forgot-password/ForgotPassword';
import Header from 'components/header/Header';
import Home from 'components/home/Home';
import GeneralLoading from 'components/loader/GeneralLoading';
import Orders from 'components/orders/Orders';
import PageNotFound from 'components/pagenotfound/PageNotFound';
import ProductPage from 'components/product-page/ProductPage';
import ProtectedRoute from 'components/protected-route/ProtectedRoute';
import StaticPage from 'components/static/StaticPage';
import Login from 'components/user/Login';
import Register from 'components/user/Register';
import Wishlist from 'components/wishlist/Wishlist';
import { catalogIsLoading } from 'models/selectors/catalogSelectors';
import { user } from 'models/selectors/userSelector';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'fontello/css/fontello.css';

const App = () => {
  const userSelector = useSelector(user);
  const loading = useSelector(catalogIsLoading);

  return (
    <CookiesProvider>
      <HelmetProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/categories"
              element={
                <ProtectedRoute isAllowed={userSelector?.token}>
                  <CategoriesLanding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAllowed={userSelector?.token}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/static/:id" element={<StaticPage />} />
            <Route path="/checkout/step1" element={<CheckoutLogin />} />
            <Route path="/checkout/step2" element={<CheckoutEdit />} />
            <Route path="/checkout/confirm" element={<Confirm />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute isAllowed={userSelector?.token}>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute isAllowed={userSelector?.token}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
        <Alert />
        <CookiesManagement />

        {loading && <GeneralLoading />}
      </HelmetProvider>
    </CookiesProvider>
  );
};

export default App;
