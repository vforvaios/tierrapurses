import SEO from 'components/seo/SEO';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="notfound content">
      <SEO
        title="Shoppy not-found"
        description="Shoppy not-found page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="page-not-found-countainer">
            <h1>ΔΕΝ ΒΡΕΘΗΚΕ</h1>
            <Link to="/" className="button green">
              Αρχική Σελίδα
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
