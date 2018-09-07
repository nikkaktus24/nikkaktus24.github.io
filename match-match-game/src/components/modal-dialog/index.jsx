import React from 'react';
import style from './style';

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
