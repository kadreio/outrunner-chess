import * as React from 'react';
import * as style from './style.css';
import * as GameActions from '../../actions/board';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { Board } from '../Board/index';
import { selectSquare } from '../../actions/board';
import { History } from '../../components/History/index';
import firebase from 'firebase';

export namespace Chess {
  export interface Props extends RouteComponentProps<void> {
    game: GameState;
    actions: typeof GameActions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<Chess.Props, Chess.State> {

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
        <header onClick={() => {
          actions.loggedOut();
          firebase.auth().signOut();
        }}> Log Out -  {game.user.displayName} </header>
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
