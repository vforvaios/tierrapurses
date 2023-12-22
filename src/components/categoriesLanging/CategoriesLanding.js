import SEO from 'components/seo/SEO';
import React from 'react';

const arr = [1, 2, 3, 4, 5, 6, 7];

const CategoriesLanding = () => {
  return (
    <div className="content categories-page">
      <SEO
        title="Shoppy categories landing"
        description="Shoppy categories landing page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="page-title text-center">
            <h1>Κατηγορίες: ΓΥΝΑΙΚΑ</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="categories">
            <ul className="categories-list">
              {arr.map((index) => (
                <li key={index}>
                  <img
                    src="https://via.placeholder.com/550x300"
                    alt="Category 1"
                  />
                  <p>Μαλλιά</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesLanding;
