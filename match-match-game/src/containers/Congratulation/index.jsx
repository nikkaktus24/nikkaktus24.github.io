import React from 'react';
import Modal from '../../components/modal-dialog/';
import style from './style';
import NavBar from '../../components/NavBar'
import history from '../../utils/history';

const Congratulation = ({profile}) => {
  return (
    <Modal>
      <div className="congratulation">
        <h1>Congratulation</h1>
        <p>
        You a good warrior
        <strong>{" " + profile.familyName + " " + profile.foreName + " "}</strong>
        It was easy, wasn't it? Try harder!
        </p>
        <NavBar />
      </div>
    </Modal>
  )
}

export default Congratulation;
