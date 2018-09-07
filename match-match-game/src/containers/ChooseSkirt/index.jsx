import React from 'react';
import Modal from '../../components/modal-dialog/';
import style from './style';
import history from '../../utils/history';
import {withRouter} from 'react-router-dom';

const ChooseSkirt = (props) => {
  const choose = (e) => {
    const {path, setSkirtId, match} = props;
    setSkirtId(e.target.id);
    const url = match.url.split("/")[2]; // Do flexible url
    switch(url) {
      case "reg": return history.push(path.reg);
      case "play": return history.push(path.play);
      default: return history.push("");
    }
  }

  return (
    <Modal>
      <div className="skirt">
        <h1>Choose Skirt</h1>
        <ul className="skirt-list">
          <li id="skirt-one" onClick={choose}></li>
          <li id="skirt-two" onClick={choose}></li>
          <li id="skirt-tree" onClick={choose}></li>
        </ul>
      </div>
    </Modal>
  )
}

export default withRouter(ChooseSkirt);
