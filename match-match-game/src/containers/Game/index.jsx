import React from 'react';
import _ from 'lodash'
import Modal from '../../components/modal-dialog/';
import ErrorBar from '../../components/error-bar/';
import style from './style';
import history from '../../utils/history';
import Timer from '../../components/Timer'
import NavBar from '../../components/NavBar'
import Immutable from 'immutable';
import shortenArray from '../../utils/shortenArray';
import Card from '../../utils/card';
import Result from '../../utils/Result';
import {cardData, difficult} from '../../config';
import {withRouter} from 'react-router-dom';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.battleGround = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.unmatched = this.unmatched.bind(this);
    this.state = {
       minute: 0,
       second: 0,
       flagOpen: false,
       pairs: difficult[this.props.difficult].pairs,
       openCardArray: [],
       cardCollection: []
    }
  }

  newGame() {
    this.setState({
      matchPairs: 0
    },() => {
      this.buildDeck();
      this.startTimer();
    });
  }

  getCongratulation() {
    const {difficult, setResult } = this.props;
    const { minute, second } = this.state;
    const {familyName, foreName, email} = this.props.profile;
    clearInterval(this.state.timerHandler);
    const result = new Result(foreName, familyName, email, minute, second);
    fetch('https://mmg-score.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: result.username,
        email: result.email,
        score: result.score
        })
      }).catch((error) => {
          console.error(error);
      });
    history.push("/congratulation");
  }

  buildDeck(data) {
    const resultArray = [];
    const cardArray = shortenArray(cardData, this.state.pairs);
    cardArray.forEach((item) => {
      resultArray.push(new Card(item.id, item.image));
      resultArray.push(new Card(item.id, item.image));
    });
    const tempArray = _.shuffle(resultArray.map((item) => {
      return (
        <div className="card">
          <div className="card-back -open">
            <div className={"card-back--icon " + item.id + " " + this.props.skirtId}></div>
          </div>
          <div className="card-front">
            <div
            style={{backgroundImage: `url('./src/resources/cards/${item.image}.png')`}}
            className="card-front--icon"
            >
            </div>
          </div>
        </div>
      )
    }));
    this.setState({
      cardCollection: tempArray
    });
  };

  handleClick(event) {
    const {openCardArray, matchPairs, flagOpen} = this.state;
    if(
      event.target.classList.contains("card-back--icon")
      && flagOpen == false
    ) {
      if(
        openCardArray[0] != event.target
        || openCardArray[1] != event.target
        && !event.target.classList.contains("matched")
      ) {
        openCardArray.push(event.target);
        this.setCardOpen(event.target);
        if(openCardArray.length == 2) this.compareCards();
      }
    }
  }

  setCardOpen(target) {
    target.offsetParent.classList.remove("-open");
    target.parentElement.nextElementSibling.classList.add("-open");
  }

  compareCards() {
    const {openCardArray, flagOpen} = this.state;
    this.setState({flagOpen: true});
    if(openCardArray[0].classList.item(1) == openCardArray[1].classList.item(1)) {
        this.matched();
    } else {
        setTimeout(this.unmatched, 600);
    }
  }

  matched() {
    const {openCardArray, matchPairs, flagOpen, pairs} = this.state;
    openCardArray.forEach(item => {
      item.parentElement.nextElementSibling.classList.add("matched"); // front card
    });
    this.setState({
      flagOpen: false,
      matchPairs: matchPairs + 1,
      openCardArray: []
    }, () => {
      if(this.state.matchPairs == pairs) {
        return this.getCongratulation();
      }
    });
  }

  unmatched() {
    const {openCardArray, matchPairs, flagOpen} = this.state;
    openCardArray.forEach(item => {
      item.offsetParent.classList.add("-open"); // back card
      item.parentElement.nextElementSibling.classList.remove("-open"); // front card
    });
    this.setState({
      flagOpen: false,
      openCardArray: []
    });
  }

  startTimer() {
       if(this.state.timerHandler) clearInterval(this.state.timerHandler);
       this.setState({
         timerHandler: setInterval(() => {
           this.setState({second: this.state.second+1});
           if(this.state.second == 60) {
               this.setState({
                 minute: this.state.minute + 1,
                 second: 0
               });
           }
       }, 1000)
     });
   };

  componentDidMount() {
    this.battleGround.current.addEventListener(
      'click',
      this.handleClick
    );
    this.newGame();
  }

  componentWillUnmount() {
    this.battleGround.current.removeEventListener(
      'click',
      this.handleClick
    )
  }

  render() {
    return (
      <section className="game">
        <h1>Memory-Game</h1>
        <h2>@nikkaktus24</h2>
        <NavBar />
        <Timer minute={this.state.minute} second={this.state.second} />
        <section ref={this.battleGround} className={"game-area " + this.props.difficult}>
          {this.state.cardCollection}
        </section>
      </section>
    )
  };
}

export default withRouter(Game)
