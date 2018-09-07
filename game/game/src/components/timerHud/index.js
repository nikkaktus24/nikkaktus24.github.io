import React from 'react';
import style from './index.scss';

const TimerHud = ({minute, second, roundNumber}) => {
  return (
    <div class="timerHud">
      <div class="timerHud__timer">{minute} мин. {second} сек.</div>
      <div class="timerHud__roundNumber">{roundNumber}</div>
    </div>
  );
}

export default TimerHud;
