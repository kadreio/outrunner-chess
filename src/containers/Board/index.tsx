import * as React from 'react';
import * as style from './style.css';
import * as GameActions from '../../actions/board';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { Square } from '../../components/Square/index';
import { movePiece } from '../../actions/board';
import { create } from 'domain';
import isEqual from 'lodash-es/isEqual';

interface Props {
  game: GameState;
  actions: typeof GameActions;
  selectedSquare?: Chess.Position;
}


export class Board extends React.Component<Props> {
  actions: typeof GameActions;
  constructor(a,b) {
    super(a,b);
    this.actions = this.props.actions;
  }

  onSelect(position: Chess.Position, piece) {
    if(this.props.selectedSquare) {
      const move: Game.Move = {
        toPosition: position,
        fromPosition: this.props.selectedSquare,
      }
      this.actions.movePiece(move);
      this.actions.selectSquare(undefined);

    } else {
      this.actions.selectSquare(position);
    }

  }

  createSquare(row, col) {
    const position = { col, row };
    const piece = this.props.game.board[row][col];

    const selected = Boolean(this.props.selectedSquare && (this.props.selectedSquare.row === position.row &&
      this.props.selectedSquare.col === position.col));

    const potential = Boolean(this.props.game.ui.potentialMoves.filter((square) => {
      return isEqual(square, position);
    }).length);

    return <Square
        selected={selected}
        position={position}
        potential={potential}
        key={`${row},${col},${piece && piece.side},${piece && piece.type}`}
        piece={piece}
        onSelect={() => this.onSelect(position, piece)}
        currentPlayer={this.props.game.currentPlayer}
        />
  }

  getColumns(row) {
    const elements = [];
    for(let col=0; col < 8; col++) {
      elements.push(this.createSquare(row, col));
    }
    return elements;
  }

  getRows() {

    const elements = [];
    for(let i=0; i < 8; i++) {
      elements.push(<div key={i} className={style.row}>
        {this.getColumns(i)}
      </div>)
    }
    return elements;
  }

  render() {
    return (
      <div className={style.normal +' '+ (this.props.game.currentPlayer === 'WHITE' ? style.whiteTurn : style.blackTurn)}>
        {this.getRows()}
      </div>
    );
  }
}
