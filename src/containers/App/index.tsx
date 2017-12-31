import firebase from '@firebase/app';
import '@firebase/auth';

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import * as GameActions from '../../actions/board';
import { History } from '../../components/History/index';
import { RootState } from '../../reducers';
import { Board } from '../Board/index';
import * as style from './style.css';


export namespace Chess {
  export interface Props extends RouteComponentProps<void> {
    game: GameState;
    actions: typeof GameActions;
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<Chess.Props> {

  constructor(a,b) {
    super(a,b);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.actions.loggedIn({
          id: user.uid,
          displayName: user.email,
          loggedIn: true
        });
      }
    });
  }

  render() {
    const { game, children, actions } = this.props;

    return (
      <div>
        <header style={{textAlign: 'right', margin:'8px'}} onClick={() => {
          actions.loggedOut();
          firebase.auth().signOut();
        }}> <h5> Hello {game.user.displayName} | Log Out </h5> </header>
        <div className={style.normal}>
          <History moves={game.history} />
          <Board
            game={game}
            selectedSquare={game.ui.selectedSquare}
            actions={actions} />
          <div style={{'minWidth':'100px'}}> </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch)
  };
}
