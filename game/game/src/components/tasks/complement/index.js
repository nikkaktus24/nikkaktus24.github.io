import React from 'react';
import {sample, includes} from 'lodash';
import ErrorBar from '../../error-bar'
import ControlButtons from '../../control-buttons'
import Exercise from '../../../utils/Exercise';
import style from './index.scss';
import {reward, keyBoardEvent} from '../../../config';
import dictionary from './dictionary';

export default class Complement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {attempts: 2, task: {source: "unknown"}};
    this.input = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  generate() {
    const source = sample(dictionary.task);
    return this.setState({task: new Exercise(source.condition, source.answers)});
  }

  compare(value, answer) {
    return value.toLowerCase() == answer;
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

  onKeyDown(e) {
    if(e.keyCode == keyBoardEvent.ESC) {
      this.props.setStatus(this.props.status.wrong);
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
      <div className="complement">
        <h1>Задача на словарный запас</h1>
        <p>Для продолжения игры тебе нужно восстановить потерянные буквы в слове. Если ты пропустишь задачу, тогда будет ход врага.</p>
        <form onSubmit={this.check.bind(this)} className="complement-form">
          <div className="complement-form-word">{this.state.task.source}</div>
          <input ref={this.input} placeholder="Слово" type="text" maxlength="15" required="required" />
        </form>
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
