import React from 'react';
import {sample, isElement, shuffle} from 'lodash';
import ErrorBar from '../../error-bar'
import ControlButtons from '../../control-buttons'
import Exercise from '../../../utils/Exercise';
import style from './index.scss';
import {reward, keyBoardEvent} from '../../../config';
import dictionary from './dictionary';

export default class ChooseFlag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attempts: 2
      ,choosed: {}
      ,task: {
         source: {condition: "unknown", variants: ""}
       }
     }
    this.list = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClickVariant = this.onClickVariant.bind(this);
    this.check = this.check.bind(this);
  }

  generate() {
    const task = sample(dictionary.task);
    const variants = task.source.map((item, i) => {
      return <li id={i}>{item}</li>;
    });
    return this.setState({
      task: new Exercise(
        {condition: task.url, variants}
        ,task.answer
        )
    })
  }

  onClickVariant(e) {
    if(e.target.nodeName == "LI") {
      if(isElement(this.state.choosed)) {
        this.state.choosed.classList.remove("_ghost");
        this.setState({choosed: e.target}, () => {
          this.state.choosed.classList.add("_ghost");
        });
      } else {
        this.setState({choosed: e.target}, () => {
          this.state.choosed.classList.add("_ghost");
        });
      }
    }
  }

  compare(value, answer) {
    return value.textContent == answer;
  }

  check() {
    const { task, attempts, choosed } = this.state;
    if(!isElement(choosed)) return this.setState({error: true, errorName: "Выберите ответ"});
    if(attempts != 0) {
      if(this.compare(choosed, task.answer)) {
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
    if(e.keyCode == keyBoardEvent.ESC && !isElement(choosed)) {
      this.props.setStatus(this.props.status.wrong);
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
      <div className="choose-flag">
        <h1>Задача на выбор</h1>
        <p>Для продолжения игры тебе нужно выбрать страну по флагу. Если ты пропустишь задачу, тогда будет ход врага.</p>
        <div className="choose-flag-condition"><img src={this.state.task.source.condition} /></div>
        <ul ref={this.list} onClick={this.onClickVariant} className="choose-flag-variants">
          {this.state.task.source.variants}
        </ul>
        <ControlButtons
          check={this.check.bind(this)}
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
