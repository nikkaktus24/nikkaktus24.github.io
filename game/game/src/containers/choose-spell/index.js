import React from 'react';
import {isElement} from 'lodash';
import {arraySpells} from '../../config';
import Modal from '../../components/modal-dialog/';
import {keyBoardEvent} from '../../config';
import ErrorBar from '../../components/error-bar';
import style from './index.scss';

export default class ChooseSpell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.list = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSpellClick = this.onSpellClick.bind(this);
  }

  onSpellClick(source) {
    const { cash, setCashCount, setSpellId, setStatus, status } = this.props;
    const button = isElement(source)
      ? source
      : source.target;
    if(
       button.classList.contains('spell')
       || button.parentElement.classList.contains('spell')
      ) {
      let id;
      button.id ? id = button.id : id = button.parentElement.id;
      if(cash < arraySpells[id].cost) {
        this.setState({error: true, errorName: "Недостаточно coin's"})
      } else {
        setCashCount(cash-arraySpells[id].cost);
        setSpellId(id);
        setStatus(status);
      }
    }
  }

  generateSpells() {
    const spellList = [];
    arraySpells.forEach((item, i) => {
      spellList.push(
        <div id={i} className="spell">
          <div className="spell-title">{arraySpells[i].name}</div>
          <div className="spell-hp">{arraySpells[i].hp}</div>
          <div className="spell-cost">{arraySpells[i].cost}</div>
        </div>
      );
    });
    return spellList;
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
      this.onSpellClick(choosed);
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
        <div className="choose-spell">
          <h1>Выберите заклинание</h1>
          <p>Каждое заклинание отнимает определенное количество HP противника,
             и стоит свое количество COIN.
          </p>
          <div className="cash-count">{this.props.cash}</div>
          <div ref={this.list} onClick={this.onSpellClick} className="choose-spell-list">
            {this.generateSpells()}
          </div>
        </div>
        {(() => {
          if(this.state.error) {
            return <ErrorBar>{this.state.errorName}</ErrorBar>
          }
        })()}
      </Modal>
    )
  };
}
