import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as PlayerActionCreators from '../actions/player';


import { connect } from 'react-redux';
import Stopwatch from '../components/Stopwatch';
import Stats from '../components/Stats';
import AddPlayerForm from '../components/AddPlayerForm';
import Player from '../components/Player';
import Header from '../components/Header';

const INITIAL_STATE = {
  players: [
    {
      name: 'Neil Allen',
      score: 31,
    },
    {
      name: 'Alex Allen',
      score: 20,
    },
    {
      name: 'Ryan Allen',
      score: 50,
    },
  ],
}

class Scoreboard extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired
  };
  render() {
    const { dispatch, players } = this.props;
    const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer, dispatch);
    const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreators(PlayerActionCreators.updatePlayerScore, dispatch);

    const playerComponents = players.map((player, index) => (
            <Player
              index={index}
              name={player.name}
              score={player.score}
              key={player.name}
              updatePlayerScore={updatePlayerScore}
              removePlayer={removePlayer}
            />
        ))

    return (
        <div className="scoreboard">
        <Header players={players} />
        <div className="players">
          {playerComponents}
        </div>
        <AddPlayerForm addPlayer={addPlayer} />
        </div>
    );
  }
}


const mapStateToProps = state => (
 {
   players: state
 }
);


export default connect(mapStateToProps)(Scoreboard);