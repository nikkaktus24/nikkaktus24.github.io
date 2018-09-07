import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {setScene, setSkinId, setNickName} from '../actions/';
import Loading from '../containers/loading/'
import Login from '../containers/login/'
import Settings from '../containers/settings/'
import ChooseSkin from '../containers/choose-skin/'
import ScoreBoard from '../containers/score-board/'
import Game from '../containers/game/'

class App extends React.Component {
  render() {
    const { setScene, setSkinId, setNickName, setVolume } = this.props.pageActions
    const { resourceCache, scene, nickname, skinId, volume } = this.props.session;
    switch(scene) {
      case "SCENE_LOADING": return <Loading resourceCache={resourceCache} scene="SCENE_AUTORIZATION" setScene={setScene}/>
      case "SCENE_AUTORIZATION": return <Login nickname={nickname} scene="SCENE_CHOOSE_SKIN" setScene={setScene} setNickName={setNickName} />
      case "SCENE_CHOOSE_SKIN": return <ChooseSkin skinId={skinId} scene="SCENE_SETTINGS" setScene={setScene} setSkinId={setSkinId} />
      case "SCENE_SETTINGS": return <Settings setScene={setScene} />
      case "SCENE_BATTLEGROUND": return <Game session={this.props.session} setScene={setScene} />
      case "SCENE_SCOREBOARD": return <ScoreBoard scene="SCENE_BATTLEGROUND" setScene={setScene} />
      default: return <h1>Ooops... </h1>
    }
  }
}


const mapStateToProps = (state) => {
  return {
    session: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators({setScene, setSkinId, setNickName}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
