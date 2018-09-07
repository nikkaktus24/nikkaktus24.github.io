import React from 'react';
import style from './index.scss';

const ControlButtons = ({check, status, setStatus}) => {

  const cancel = () => {
    return setStatus(status);
  }

  return (
    <div className="control-buttons">
      <button onClick={check}>Отправить</button>
      <button onClick={cancel}>Отменить</button>
    </div>
  );
}

export default ControlButtons;
