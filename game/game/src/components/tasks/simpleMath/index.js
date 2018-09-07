import React from 'react';
import {sample} from 'lodash';
import ErrorBar from '../../error-bar'
import ControlButtons from '../../control-buttons'
import Exercise from '../../../utils/Exercise';
import style from './index.scss';
import {reward, keyBoardEvent} from '../../../config';

export default class SimpleMath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {attempts: 2, task: {source: {left: 0, right: 0, operator: "=" } }};
    this.input = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  generate() {
    const operators = ["+", "-" , "*", "/"];
    const operator = sample(operators);
    let left, right, answer;
    if(operator == "/") {
      do {
        left = Math.floor(Math.random() * 20);
        right = Math.floor(Math.random() * 10);
      } while(left % right != 0)
      answer = left / right;
    } else {
      left = Math.floor(Math.random() * 20);
      right = Math.floor(Math.random() * 10);
      answer = eval(left + operator + right);
    }
    this.setState({task: new Exercise({left, right, operator}, answer)});
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
      if(current.value == task.answer) {
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
      <div className="simple-math">
				<h1>Математическая задача</h1>
				<p>Для продолжения игры тебе нужно решить математическую задачу. Если ты пропустишь задачу, тогда будет ход врага.</p>
				<form onSubmit={this.check.bind(this)} className="simple-math-form">
					<div>{this.state.task.source.left}</div>
					<div>{this.state.task.source.operator}</div>
					<div>{this.state.task.source.right}</div>
					<span>=</span>
					<input ref={this.input} placeholder="0" type="text" maxlength="8" required="required" />
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
