import { loading } from 'models/selectors/loaderSelectors';
import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
  const show = useSelector(loading);

  return (
    show && (
      <div className="loader">
        <div className="loader-message">Loader</div>
      </div>
    )
  );
};

export default Loader;
