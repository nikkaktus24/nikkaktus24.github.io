import React from 'react';
import {isElement} from 'lodash';
import Modal from '../../components/modal-dialog/';
import Sound from '../../utils/Sound';
import { keyBoardEvent } from '../../config';
import style from './index.scss';
import { MAX_VOLUME, MIN_VOLUME } from '../../config';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {choosed: {} };
    this.list = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(source) {
    const button = isElement(source)
      ? source
      : source.target;
    if(button.nodeName == "BUTTON") {
      switch(button.id) {
        case "toggleVolume":
          if(Sound.volume <= MIN_VOLUME) return Sound.setVolume(MAX_VOLUME);
          if(Sound.volume >= MAX_VOLUME) return Sound.setVolume(MIN_VOLUME);
          break;
        case "increaseVolume":
          return Sound.setVolume(Sound.volume+0.1);
        case "decreaseVolume":
          return Sound.setVolume(Sound.volume-0.1);
        case "startGame":
          return this.props.setScene("SCENE_BATTLEGROUND");
        case "scoreBoard":
          return this.props.setScene("SCENE_SCOREBOARD");
      }
    }
  }

  changeSkin(id) {
    const {children} = this.list.current;
    const {choosed} = this.state;
    choosed.classList.remove("_ghost");
    children[id].classList.add("_ghost");
    this.setState({choosed: children[id]});
  }

  onKeyDown(e) {
    console.log(e.keyCode);
    e.preventDefault();
    const {children} = this.list.current;
    const {choosed} = this.state;
    if(e.keyCode == keyBoardEvent.TAB && !isElement(choosed)) {
      this.setState({choosed: children[0]})
      children[0].classList.add("_ghost");
    }
    if(e.keyCode == keyBoardEvent.ESC && isElement(choosed)) {
      choosed.classList.remove("_ghost");
      this.setState({choosed: {} });
    }
    if(e.keyCode == keyBoardEvent.DOWN && isElement(choosed)) {
      const id = +choosed.id + 1 <= children.length-1 ? +choosed.id + 1 : 0;
      this.changeSkin(id);
    }
    if(e.keyCode == keyBoardEvent.UP && isElement(choosed)) {
      const id = +choosed.id - 1 >= 0 ? +choosed.id - 1 : children.length-1;
      this.changeSkin(id);
    }
    if(e.keyCode == keyBoardEvent.ENTER && isElement(choosed)) {
      this.onButtonClick(choosed.firstElementChild);
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <Modal>
        <div className="settings-screen">
          <h1>Настройки</h1>
          <p>Настройте игру так, как вам удобно.</p>
          <ul ref={this.list} onClick={this.onButtonClick.bind(this)} className="button-list">
            <li id="0"><button id="startGame">Начать игру</button></li>
            <li id="1"><button id="scoreBoard">Рекоды</button></li>
            <li id="2"><button id="toggleVolume">Вкл/выкл звук</button></li>
            <li id="3"><button id="increaseVolume">Звук +</button></li>
            <li id="4"><button id="decreaseVolume">Звук -</button></li>
          </ul>
        </div>
      </Modal>
    )
  };
}
