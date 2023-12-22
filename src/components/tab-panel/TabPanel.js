import React from 'react';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}>
    {value === index && <div className="tabPanel">{children}</div>}
  </div>
);

export default TabPanel;
