import React from 'react';
import HeroHud from '../../components/heroHud/';
import TimerHud from '../../components/TimerHud/';
import EnemyHud from '../../components/EnemyHud/';
import style from './index.scss';

export default class GameHud extends React.Component {
  render() {
    return (
      <div className="gameHud-wrapper">
        <HeroHud name={this.props.heroName} hp={this.props.heroHp} />
        <TimerHud minute={this.props.minute} second={this.props.second} roundNumber={this.props.roundNumber} />
        <EnemyHud roundNumber={this.props.roundNumber} name={this.props.enemyName} hp={this.props.enemyHp} />
      </div>
    )
  };
}
