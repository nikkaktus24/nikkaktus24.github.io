import * as _ from 'lodash';
import React from 'react';
import GameHud from '../../containers/gameHud'
import * as config from '../../config';
import HeroEssence from '../../utils/Essence/HeroEssence';
import EnemyEssence from '../../utils/Essence/EnemyEssence';
import { setStatus, setSpellId, setCashCount, setRoundNumber } from '../../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import ChooseSpell from '../../containers/choose-spell';
import Dialog from '../../components/notification-dialog';
import SpellEssence from '../../utils/Essence/SpellEssence';
import TaskGenerator from '../../containers/TaskGenerator';
import Result from '../../utils/Result';
import style from './index.scss';

//
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      minute: 0,
      second: 0,
      hero: {hp: 100},
      enemy: {name: "unknown", hp: 100},
    };
  }

  newGame() {
    this.props.pageActions.setCashCount(config.coinStart);
    this.props.pageActions.setRoundNumber(0);
    this.setState({
      hero: this.generateHero(this.props.session.skinId),
    }, () => {
      this.startTimer();
      return this.newRound();
    });
  }

  newRound() {
    this.setState({
      enemy: this.generateEnemy(),
    }, () => {
      this.resetHero();
      this.props.pageActions.setRoundNumber(this.props.session.roundNumber+1);
      this.props.pageActions.setStatus("INTRO_MOVEMENT");
    });
  }

  gameOver() {
    const { nickname, roundNumber, cash } = this.props.session;
    const { minute, second } = this.state;
    if(!localStorage.getItem("results")) this.initResult();
    const results = JSON.parse(localStorage.getItem("results"));
    const newResult = new Result(
      nickname
      ,roundNumber
      ,cash
      ,minute
      ,second
    );
    results.scoreboard.push(newResult);
    localStorage.setItem("results",JSON.stringify(results));
    return this.props.setScene("SCENE_SCOREBOARD");
  }

  initResult() {
    localStorage.setItem("results",'{ "scoreboard": [] }');
  }

  startTimer() {
       if(this.state.timerHandler) clearInterval(this.state.timerHandler);
       this.setState({
         timerHandler: setInterval(() => {
           this.setState({second: this.state.second+1});
           if(this.state.second == 60) {
               this.setState({
                 minute: this.state.minute+1,
                 second: 0
               });
           }
       }, 1000)
     });
   };

  generateHero(id) {
    return new HeroEssence(
      config.startPosHero // start point
      ,[0,0]
      ,config.spriteSize[id]
      ,config.fps
      ,config.spriteCount[id]
      ,this.props.session.resourceCache[config.arrayImages[id].name]
    );
  }

  generateEnemy() {
    const {resourceCache} = this.props.session;
    const hp = 100 + 25 * this.props.session.roundNumber; // +25 hp to monster each round
    const adjective = _.sample(config.enemyName.adjective);
    const firstName = _.sample(config.enemyName.firstName);
    const secondName = _.sample(config.enemyName.secondName);
    const name = adjective + " " + firstName + " " + secondName;
    const head = _.sample(config.arrayEnemiesHead);
    const body = _.sample(config.arrayEnemiesBody);
    const legs = _.sample(config.arrayEnemiesLegs);
    const weapon = _.sample(config.arrayEnemiesWeapon);
    return new EnemyEssence(
      config.startPosEnemy
      , name, hp
      ,{
        head
        ,body
        ,legs
        ,weapon
      }
      ,{
      heads: resourceCache[config.arrayImages[3].name]
      ,bodies: resourceCache[config.arrayImages[4].name]
      ,legs: resourceCache[config.arrayImages[5].name]
      ,weapons: resourceCache[config.arrayImages[6].name]
      }
    );
  }

  generateSpell(isHero) {
    const {startPosSpellHero, startPosSpellEnemy, arraySpells, fps} = config;
    let startPos;
    let finishPos;
    let spell;
    if(isHero) {
      spell = arraySpells[this.props.session.spellId];
      startPos = startPosSpellHero
      finishPos = startPosSpellEnemy
    } else {
      spell = _.sample(arraySpells);
      startPos = startPosSpellEnemy
      finishPos = startPosSpellHero
    }
    return new SpellEssence(
      startPos
      ,finishPos
      ,spell.hp
      ,this.props.session.resourceCache[spell.img]
      ,this.props.session.resourceCache[spell.sound]
      ,spell.pos
      ,fps
      ,isHero
    );
  }

  resetHero() {
    this.state.hero.resetCoord(config.startPosHero);
    this.state.hero.resetHp();
  }

  essenceMove(isHero) {
    let lastTime = Date.now();
    const { hero, enemy, heroCtx, spellCtx, enemyCtx, animationHandler } = this.state;
    const { current } = this.canvas;
    const useSpell = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;
      spellCtx.clearRect(0, 0, current.width, current.height);
      hero.update(dt);
      hero.render(heroCtx, dt, config.animation.plug);
      enemy.render(enemyCtx);
      this.state.spell.update(dt);
      if(this.state.spell.render(spellCtx, dt)) {
        cancelAnimationFrame(animationHandler);
        return this.spellTakeHp(isHero);
      }
      lastTime = now;
      this.setState({animationHandler: window.requestAnimationFrame(useSpell)});
    }
    this.setState({spell: this.generateSpell(isHero)}, useSpell);
  };

  spellTakeHp(isHero) {
    const { spell, hero, enemy } = this.state;
    if(isHero) {
      if(enemy.takeHp(spell.hp)) {
        return this.props.pageActions.setStatus("NEW_ROUND_NOTIFICATION");
      }
      return this.props.pageActions.setStatus("ENEMY_MOVEMENT_NOTIFICATION");
    } else {
      if(hero.takeHp(spell.hp)) {
        return this.props.pageActions.setStatus("GAMEOVER_ANIMATION");
      }
      return this.props.pageActions.setStatus("PLAYER_MOVEMENT_NOTIFICATION");
    }
  }

  renderGame(animation, isOnce,  movePos, nextStatus) {
    const { enemy, hero, heroCtx, enemyCtx, animationHandler } = this.state
    const { current } = this.canvas;
    let lastTime = Date.now();
    const draw = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;
      hero.update(dt);
      heroCtx.clearRect(0, 0, current.width, current.height);
      if(hero.render(heroCtx, dt, animation, isOnce, movePos)) {
        window.cancelAnimationFrame(animationHandler);
        if(nextStatus) return this.props.pageActions.setStatus(nextStatus);
        if(isOnce == "MOVEMENT") return this.essenceMove(true);
        return true;
      }
      enemy.render(enemyCtx)
      lastTime = now;
      this.setState({animationHandler: window.requestAnimationFrame(draw)});
    }
    draw();
  };

  handleStatus() {
    switch(this.props.session.status) {
      case "INTRO_MOVEMENT":
        return this.renderGame(config.animation.move, false, config.movePosition.start, "PLAYER_MOVEMENT_NOTIFICATION");
      case "PLAYER_MOVEMENT":
        return this.renderGame(config.animation.fight, "MOVEMENT");
      case "ENEMY_MOVEMENT":
        return this.essenceMove();
      case "NEW_ROUND":
        return this.newRound();
      case "GAMEOVER_ANIMATION":
        this.props.session.resourceCache[config.DIE_SOUND].play();
        return this.renderGame(config.animation.die, true, null, "GAMEOVER_NOTIFICATION");
      case "GAMEOVER":
        return this.gameOver();
      default:
        return true;
    }
  }

  handleRender() {
    switch (this.props.session.status) {
      case "NEW_ROUND_NOTIFICATION":
        this.props.session.resourceCache[config.NEWROUND_SOUND].play();
        return <Dialog status={"NEW_ROUND"} setStatus={this.props.pageActions.setStatus}>Новый раунд</Dialog>
      case "PLAYER_MOVEMENT_NOTIFICATION":
        return <Dialog status={"PLAYER_MOVEMENT_CHOOSE_SPELL"} setStatus={this.props.pageActions.setStatus}>Твой ход</Dialog>
      case "PLAYER_MOVEMENT_CHOOSE_SPELL":
        return <ChooseSpell
         status={"PLAYER_MOVEMENT_TASK_NOTIFICATION"}
         cash={this.props.session.cash}
         setStatus={this.props.pageActions.setStatus}
         setSpellId={this.props.pageActions.setSpellId}
         setCashCount={this.props.pageActions.setCashCount}
            />
      case "PLAYER_MOVEMENT_TASK_NOTIFICATION":
        return <Dialog status={"PLAYER_MOVEMENT_TASK"} setStatus={this.props.pageActions.setStatus}>Задача</Dialog>;
      case "PLAYER_MOVEMENT_TASK":
        return <TaskGenerator
          status={{right: "PLAYER_MOVEMENT", wrong:"ENEMY_MOVEMENT_NOTIFICATION"}}
          cash={this.props.session.cash}
          setStatus={this.props.pageActions.setStatus}
          setCashCount={this.props.pageActions.setCashCount}
          />
      case "ENEMY_MOVEMENT_NOTIFICATION":
        return <Dialog status={"ENEMY_MOVEMENT"} setStatus={this.props.pageActions.setStatus}>Ход врага</Dialog>;
      case "GAMEOVER_NOTIFICATION":
        return <Dialog status={"GAMEOVER"} setStatus={this.props.pageActions.setStatus}>Вы проиграли</Dialog>;
      default:
       return "";
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.status != this.props.session.status) {
      return this.handleStatus();
    }
  }

  componentDidMount() {
    this.canvas.current.width = 900;
    this.canvas.current.height = 600;
    this.setState({
      heroCtx: this.canvas.current.getContext('2d'),
      enemyCtx: this.canvas.current.getContext('2d'),
      spellCtx: this.canvas.current.getContext('2d')
    }, () => {
      this.state.heroCtx.imageSmoothingEnabled = false;
      this.state.enemyCtx.imageSmoothingEnabled = false;
      this.state.spellCtx.imageSmoothingEnabled = false;
    });
    this.newGame();
  }

  render() {
    const { enemy, hero, minute, second } = this.state
    return (
      <div className="battleground">
        {this.handleRender()}
        <GameHud
          heroName={this.props.session.nickname}
          minute={minute}
          second={second}
          roundNumber={this.props.session.roundNumber}
          enemyName={enemy.name}
          heroHp={hero.hp}
          enemyHp={enemy.hp}
        />
        <canvas ref={this.canvas} className="canvasStyle">
          Ваш браузер не соответствует последним стандартам. Обновите его для продолжения.
        </canvas>
      </div>
    );
  };
}

 const mapStateToProps = (state) => {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators({setStatus, setSpellId, setCashCount, setRoundNumber }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
