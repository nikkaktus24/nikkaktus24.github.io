import React from 'react';
import Modal from '../../components/modal-dialog/';
import ErrorBar from '../../components/error-bar';
import {keyBoardEvent} from '../../config';
import {size} from 'lodash'
import style from './index.scss';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {table: "", error: ""};
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onButtonClick(e) {
    this.props.setScene(this.props.scene);
  }

  generate() {
    const results = JSON.parse(localStorage.getItem("results"));
    if(results && size(results.scoreboard) > 0) {
      const newResults = results.scoreboard
        .sort((a,b) => {
          if(a.roundNumber == b.roundNumber) {
            return a.time - b.time;
            } else {
              return b.roundNumber - a.roundNumber
            }
          })
        .filter((item, i) => {
           if(i < 10) return item;
          })
        .map((item, i) => {
          return (
            <tr>
              <td>{i+1}</td>
              <td>{item.nickname}</td>
              <td>{item.roundNumber}</td>
              <td>{item.cash}</td>
              <td>Мин {item.min} : Сек: {item.sec}</td>
            </tr>
          );
        });
      this.setState({table: newResults});
    } else {
      this.setState({error: <ErrorBar>Еще нет результатов :c</ErrorBar>})
    }
  }

  onKeyDown(e) {
    if(e.keyCode == keyBoardEvent.ENTER) {
      this.props.setScene(this.props.scene);
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
      <Modal>
        <div className="score-board">
          <h1>Таблица рекордов</h1>
          <p>
            В данную таблицу входит топ 10 рекордов.
            Если ты не попал сюда, не отчаивайся, попробуй еще раз!
          </p>
          <button onClick={this.onButtonClick.bind(this)}>Новая игра</button>
          {(() => {
            if(this.state.table) {
              return (
                <table className="score-board-table">
                  <tr>
                    <th>Место</th>
                    <th>НикНейм</th>
                    <th>Раунды</th>
                    <th>Coins</th>
                    <th>Время</th>
                  </tr>
                  {this.state.table}
                </table>
              )
            } else {
              return this.state.error
            }
          })()}
        </div>
      </Modal>
    )
  };
}
