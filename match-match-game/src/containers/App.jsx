import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import history from '../utils/history';
import Modal from '../components/modal-dialog/'
import Login from './Login/';
import Game from './Game/';
import ChooseDifficult from './ChooseDifficult'
import ChooseSkirt from './ChooseSkirt'
import Congratulation from './Congratulation'
import ScoreBoard from './score-board'
import {setMainData} from '../actions/profileActions';
import {setSkirtId, setDifficult} from '../actions/gameActions'
import {createStructuredSelector} from 'reselect';
import {makeSelectProfileSession, makeSelectGameSession} from '../selectors';

const App = (props) => {
  const {setMainData, setSkirtId, setDifficult, setResult, redirect} = props.pageActions;
  const {profile, game} = props;
  return(
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => <Login path="/choose-difficult/reg" setMainData={setMainData}/>} />
        <Route
          path="/choose-difficult/:context"
          component={() => <ChooseDifficult
            path={{reg: "/choose-skirt/reg", play: "/game"}}
            setDifficult={setDifficult}
            />
          }/>
        <Route
          path="/choose-skirt/:context"
          component={() => <ChooseSkirt
            path={{reg: "/game", play: "/game"}}
            setSkirtId={setSkirtId}
            />
          }/>
        <Route
          path="/game"
          component={() => <Game
            profile={profile}
            difficult={game.difficult}
            skirtId={game.skirtId}
          />}
        />
        <Route path="/congratulation" component={() => <Congratulation profile={profile} />} />
        <Route path="/score-board" component={() => <ScoreBoard />} />
      </Switch>
    </Router>
  );
}

/* const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileSession(state),
  game: makeSelectGameSession(state)
}); */

const mapStateToProps = state => {
  return {
    profile: makeSelectProfileSession(state),
    game: makeSelectGameSession(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators({setMainData, setSkirtId, setDifficult}, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
