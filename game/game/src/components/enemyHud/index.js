import React from 'react';
import style from './index.scss';

const EnemyHud = ({name, hp, roundNumber}) => {
  const lineStyle = {
    width: (200/(100 + 25*(roundNumber-1)))*hp+"px"
  };
  return (
    <div className="enemyHud">
      <div className="enemyHud__name">{name}</div>
      <div className="enemyHud-hp">
        <div
          style={lineStyle}
          className="enemyHud-hp__line">
        </div>
      </div>
    </div>
  );
}

export default EnemyHud;
