import React from 'react';
import Modal from '../../components/modal-dialog/';
import ErrorBar from '../../components/error-bar';
import {size} from 'lodash'
import NavBar from '../../components/NavBar'
import style from './style';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {table: "", error: ""};
  }

  generate(data) {
    if(data && size(data) > 0) {
      const newResults = data
      .sort((a,b) => {
        return b.score - a.score;
        })
        .filter((item, i) => {
           if(i < 10) return item;
        })
        .map((item, i) => {
          return (
            <tr>
              <td>{i+1}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.score}</td>
            </tr>
          )
        });
      this.setState({table: newResults});
    } else {
      this.setState({error: <ErrorBar>There is no any results</ErrorBar>})
    }
  }

  componentDidMount() {
    fetch('https://mmg-score.herokuapp.com/')
      .then((response) => {
          return response.json();
      }).then((data) => {
        this.generate(data.result);
      });
  }

  render() {
    return (
      <Modal>
        <div className="score-board">
          <h1>Score Board</h1>
          <p>
          This table top 10 users.
          If you dont put here, dont worried, try one more!
          </p>
          <NavBar />
          {(() => {
            if(this.state.table) {
              return (
                <table className="score-board-table">
                  <tr>
                    <th>Place</th>
                    <th>Nickname</th>
                    <th>Email</th>
                    <th>Score</th>
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
