import React from 'react';
import style from './style';

const TimerHud = ({minute, second, roundNumber}) => {
  return (
    <div class="timerHud">
      <div class="timerHud__timer">{minute} мин. {second} сек.</div>
    </div>
  );
}

export default TimerHud;
