import React from 'react';
import style from './index.scss';

const Modal = ({children}) => {
  return (
    <div className="modal-dialog-wrapper">
      <div className="modal-dialog">
        {children}
      </div>
    </div>
  );
}

export default Modal;
