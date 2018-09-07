import React from 'react';
import {sample} from 'lodash';
import ErrorBar from '../../error-bar'
import ControlButtons from '../../control-buttons'
import Exercise from '../../../utils/Exercise';
import style from './index.scss';
import {reward, keyBoardEvent} from '../../../config';

export default class CompareNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {attempts: 2, task: {source: {left: 0, right: 0}, operator: "=" }};
    this.input = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  generate() {
    const arrayCompareOperators = [">", "<", "=="];
    const operator = sample(arrayCompareOperators);
    let right;
    let left;
    let answer;
    operator == "==" ? answer = "=" : answer = operator;
    do {
      left = Math.floor(Math.random() * 100);
      right = Math.floor(Math.random() * 100);
    } while(!eval(left+operator+right));
    this.setState({task: new Exercise({left,right}, answer)});
  }

  compare(value, answer) {
    return value == answer;
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
      <div className="compare-number">
        <h1>Задача на сравнение чисел</h1>
        <p>Для продолжения игры тебе нужно сравнить числа. Если ты пропустишь задачу, тогда будет ход врага.</p>
        <form onSubmit={this.check.bind(this)} className="compare-number-form">
          <div>{this.state.task.source.left}</div>
          <input ref={this.input} placeholder="=" type="text" maxlength="1" name="answer" required="required" />
          <div>{this.state.task.source.right}</div>
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
