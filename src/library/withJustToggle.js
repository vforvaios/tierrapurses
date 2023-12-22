import React, { useState } from 'react';

const withJustToggle = (Component) => (props) => {
  const [toggleValue, setState] = useState(false);

  const setToggleValue = (toggle) => {
    setState(toggle);
  };

  return (
    <Component
      {...props}
      toggleValue={toggleValue}
      setToggleValue={setToggleValue}
    />
  );
};

export default withJustToggle;
