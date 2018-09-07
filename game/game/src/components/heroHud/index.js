import React from 'react';
import style from './index.scss';

const HeroHud = ({name, hp}) => {
  const lineStyle = {
    width: hp*2+"px"
  };
  return (
    <div className="heroHud">
      <div className="heroHud__name">{name}</div>
      <div className="heroHud-hp">
        <div
          style={lineStyle}
          className="heroHud-hp__line">
        </div>
      </div>
    </div>
  );
}

export default HeroHud;
