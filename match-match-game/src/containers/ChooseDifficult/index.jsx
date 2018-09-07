import React from 'react';
import Modal from '../../components/modal-dialog/';
import style from './style';
import history from '../../utils/history';
import {withRouter} from 'react-router-dom';

const ChooseDifficult = (props) => {
  const choose = (e) => {
    const {path, setDifficult, match} = props;
    setDifficult(e.target.id);
    const url = match.url.split("/")[2]; // Do flexible url
    switch(url) {
      case "reg": return history.push(path.reg);
      case "play": return history.push(path.play);
      default: return history.push("");
    }
  }

  return (
    <Modal>
      <div className="difficult">
        <h1>Choose Difficult</h1>
        <p>
        Memory game it's game on your memory. You need to match cards pairs.
        If cards will match they not rotate.
        You can choose difficultly of the game and skirt of cards
        </p>
        <ul className="difficult-list">
          <li><button className="active-button" id="easy" onClick={choose}>Easy</button></li>
          <li><button className="active-button" id="medium" onClick={choose}>Medium</button></li>
          <li><button className="active-button" id="hard" onClick={choose}>Hard</button></li>
        </ul>
      </div>
    </Modal>
  )
}

export default withRouter(ChooseDifficult);
