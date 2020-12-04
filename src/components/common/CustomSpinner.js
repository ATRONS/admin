import React from 'react';
import { Spinner } from 'reactstrap';

export const CustomSpinner = () => {
  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: '200px' }}
    >
      <Spinner color="primary" />
    </div>
  );
};
