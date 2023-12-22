import { pages } from 'models/selectors/staticSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const StaticPage = () => {
  const { id } = useParams();

  const pageRequested =
    useSelector(pages)?.find((page) => page?.id === Number(id)) || {};

  return (
    <div className="content static-content">
      <div className="row">
        <div className="wrapper">
          <div className="page-title">{pageRequested?.title}</div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div
            className="static-content-html"
            dangerouslySetInnerHTML={{ __html: pageRequested?.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
