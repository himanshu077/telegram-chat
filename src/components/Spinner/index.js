import React from 'react';
import classes from './index.module.css';

const Spinner = () => {
  return (
    <div className={classes['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
