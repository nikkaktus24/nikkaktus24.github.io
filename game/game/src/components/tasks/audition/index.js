import React from 'react';
import {sample} from 'lodash';
import ErrorBar from '../../error-bar'
import ControlButtons from '../../control-buttons'
import Exercise from '../../../utils/Exercise';
import style from './index.scss';
import {reward, keyBoardEvent} from '../../../config';
import dictionary from './dictionary.json';
import speechSynthesis from 'speech-synthesis';

export default class Audition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {attempts: 2};
    this.input = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.listening = this.listening.bind(this);
  }

  generate() {
    const task = sample(dictionary.tasks);
    this.setState({task: new Exercise(task.lang, task.condition)}, () => {
      speechSynthesis(this.state.task.answer, this.state.task.source);
    });
  }

  compare(value, answer) {
    return value.toLowerCase() == answer
  }

  check(e) {
    e.preventDefault();
    const { current } = this.input;
    const { task, attempts } = this.state;
    if(current.value == "") return this.setState({error: true, errorName: "Введите знак"});
    if(attempts != 0) {
      if(this.compare(current.value, task.answer)) {
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

  listening() {
    speechSynthesis(this.state.task.answer, this.state.task.source);
  }

  onKeyDown(e) {
    if(e.keyCode == keyBoardEvent.ESC) {
      this.props.setStatus(this.props.status.wrong);
    }
    if(e.keyCode == keyBoardEvent.SPACE) {
      this.listening();
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
      <div className="audition">
        <h1>Задача аудирование</h1>
        <p>Для продолжения игры тебе нужно ввести слово, которое ты услышишь. Если ты пропустишь задачу, тогда будет ход врага.</p>
        <div className="audition-block">
          <form onSubmit={this.check.bind(this)} className="audition-block-form">
            <input ref={this.input} placeholder="Слово" type="text" maxlength="15" required="required"/>
          </form>
          <button onClick={this.listening}>Прослушать</button>
        </div>
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
