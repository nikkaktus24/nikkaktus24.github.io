import React from 'react';
import {sample, shuffle, isMatchWith, isElement} from 'lodash';
import ErrorBar from '../../error-bar'
import ControlButtons from '../../control-buttons'
import Exercise from '../../../utils/Exercise';
import MakeSortable from '../../../utils/MakeSortable';
import style from './index.scss';
import {reward, keyBoardEvent} from '../../../config';
import dictionary from './dictionary';

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {attempts: 2, task: {source: ""}};
    this.draggZone = React.createRef();
    this.check = this.check.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  generate() {
    const answer = sample(dictionary.task);
    const source = shuffle(answer);
    const response = source.map((item) => {
      return <li>{item}</li>
    });
    MakeSortable(this.draggZone.current);
    return this.setState({task: new Exercise(response,answer)});
  }

  compare(value, answer) {
    return isMatchWith(value, answer, (left, right) => {
      return left.textContent == right;
    });
  }

  check() {
    const { current } = this.draggZone;
    const { task, attempts } = this.state;
    if(current.value == "") return this.setState({error: true, errorName: "Введите знак"});
    if(attempts != 0) {
      if(this.compare(current.children, task.answer)) {
        this.props.setCashCount(this.props.cash+(reward*attempts));
        return this.props.setStatus(this.props.status.right);
      } else {
        this.setState({error: true, errorName: `Неправильно :c Осталось попыток: ${attempts} `});
      }
      this.setState({attempts: attempts-1});
    } else {
      this.setState({error: true, errorName: `У вас закончились попытки`});
    }
  }

  changeSkin(id) {
    const {children} = this.draggZone.current;
    const {choosed} = this.state;
    choosed.classList.remove("_ghost");
    children[id].classList.add("_ghost");
    this.setState({choosed: children[id], choosedId: id});
  }

  onKeyDown(e) {
    e.preventDefault();
    const {children} = this.draggZone.current;
    const {current} = this.draggZone;
    const {choosed, choosedId} = this.state;
    if(e.keyCode == keyBoardEvent.TAB && !isElement(choosed)) {
      this.setState({choosed: children[0], choosedId: 0})
      children[0].classList.add("_ghost");
    }
    if(e.keyCode == keyBoardEvent.TAB && isElement(choosed)) {
      const id = choosedId + 1 <= children.length-1 ? choosedId + 1 : 0;
      this.changeSkin(id);
    }
    if(e.keyCode == keyBoardEvent.ESC && isElement(choosed)) {
      choosed.classList.remove("_ghost");
      this.setState({choosed: {} });
    }
    if(e.keyCode == keyBoardEvent.ESC && !isElement(choosed)) {
      this.props.setStatus(this.props.status.wrong);
    }
    if(e.keyCode == keyBoardEvent.NEXT && isElement(choosed)) {
      const id = choosedId + 1 <= children.length-1 ? choosedId + 1 : children.length-1;
      const next = choosed.nextElementSibling;
      this.setState({choosedId: id});
      if(next) {
        current.insertBefore(children[id], choosed);
      } else {
        current.insertBefore(choosed, next);
      }
    }
    if(e.keyCode == keyBoardEvent.PREV && isElement(choosed)) {
      const id = choosedId - 1 > 0 ? choosedId - 1 : 0;
      const prev = choosed.previousElementSibling;
      this.setState({choosedId: id});
      if(prev) {
        current.insertBefore(choosed, children[id]);
      }
    }
    if(e.keyCode == keyBoardEvent.ENTER && isElement(choosed)) {
      this.check(choosed);
    }
  }

  componentDidMount() {
    this.generate();
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <div className="draggable">
        <h1>Задача на восстановление</h1>
        <p>Для продолжения игры тебе нужно восстановить порядок. Если ты пропустишь задачу, тогда будет ход врага.</p>
        <ul className="draggable-list" ref={this.draggZone}>
          {this.state.task.source}
        </ul>
        <ControlButtons
          check={this.check}
          status={this.props.status.wrong}
          setStatus={this.props.setStatus}
        />
        {(() => {
          if(this.state.error) {
            return <ErrorBar>{this.state.errorName}</ErrorBar>
          }
        })()}
      </div>
    );
  }
}
