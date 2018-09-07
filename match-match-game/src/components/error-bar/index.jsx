import React from 'react';
import style from './style';

const ErrorBar = ({children}) => {
  return (
    <div className="error-bar">
      {children}
    </div>
  );
}

export default ErrorBar;
