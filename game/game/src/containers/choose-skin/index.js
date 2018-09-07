import React from 'react';
import {isElement} from 'lodash';
import Modal from '../../components/modal-dialog/';
import { keyBoardEvent } from '../../config';
import style from './index.scss';

export default class ChooseSkin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {choosed: {} };
    this.list = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSkinClick = this.onSkinClick.bind(this);
  }

  onSkinClick(source) {
    const button = isElement(source)
      ? source
      : source.target;
    if(button.nodeName == "LI") {
      this.props.setSkinId(button.id);
      this.props.setScene(this.props.scene);
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
    if(e.keyCode == keyBoardEvent.NEXT && isElement(choosed)) {
      const id = +choosed.id + 1 <= children.length-1 ? +choosed.id + 1 : 0;
      this.changeSkin(id);
    }
    if(e.keyCode == keyBoardEvent.PREV && isElement(choosed)) {
      const id = +choosed.id - 1 >= 0 ? +choosed.id - 1 : children.length-1;
      this.changeSkin(id);
    }
    if(e.keyCode == keyBoardEvent.ENTER && isElement(choosed)) {
      this.onSkinClick(choosed);
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
        <div className="choose-skin-screen">
          <h1>Выбор героя для игры</h1>
          <p>Для того чтобы начать играть нужно выбрать героя. Кликни на иконку понравившегося героя.</p>
          <ul ref={this.list} onClick={this.onSkinClick} className="list-heroes">
            <li id="0"></li>
            <li id="1"></li>
            <li id="2"></li>
          </ul>
        </div>
      </Modal>
    )
  };
}
