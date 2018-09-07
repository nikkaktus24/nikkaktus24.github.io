import React from 'react';
import style from './style';
import history from '../../utils/history';

const NavBar = () => {
  const handleClick = (e) => {
    history.push(e.target.id)
  }

  return (
    <ul className="navigation-bar">
      <li><button id="/game" onClick={handleClick}>New Game</button></li>
      <li><button id="/choose-skirt/play" onClick={handleClick}>Skirt</button></li>
      <li><button id="/choose-difficult/play" onClick={handleClick}>Difficulty</button></li>
      <li><button id="/score-board" onClick={handleClick}>Score Board</button></li>
    </ul>
  )
}

export default NavBar;
