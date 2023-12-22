import React, { useState } from 'react';

const withActiveTab = (Component) => (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <Component {...props} handleChange={handleChange} value={value} />;
};

export default withActiveTab;
