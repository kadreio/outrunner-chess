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
export class Chess extends React.Component<Chess.Props, Chess.State> {

  render() {
    const { game, children, actions } = this.props;

    return (
      <div className={style.normal}>
        <History moves={game.history} />
        <Board
          game={game}
          selectedSquare={game.ui.selectedSquare}
          actions={actions} />
        <div style={{'minWidth':'100px'}}> </div>
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
