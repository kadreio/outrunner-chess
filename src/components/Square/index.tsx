import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { applyMiddleware } from 'redux';
import { ChessPiece } from '../Piece';

export namespace Square {
  export interface Props {
    position: BoardPosition;
    piece: Piece | null;
    potential: boolean;
    selected: boolean;
    currentPlayer: 'WHITE'|'BLACK';
    onSelect(event:any):void;
  }
}

function isOdd(val: number): Boolean  {
  return Math.floor(val / 2) * 2 === val;
}

function isBlack(row, col) {
  const rowOdd = isOdd(row);
  const colOdd = isOdd(col);
  return (rowOdd && colOdd) || (!rowOdd && !colOdd);
};

export class Square extends React.Component<Square.Props> {

  render() {
    const { position, potential, piece, selected, onSelect } = this.props;
    const { row, col } = position;

    return (
      <div
        onClick={onSelect}
        className={`${style.piece}
${isBlack(row, col) ? style.black : '' }
${selected ? style[this.props.currentPlayer.toLowerCase()+'selected'] : ''}
${potential ? style[this.props.currentPlayer.toLowerCase()+'potential'] : ''}  `}>
        {piece ? <ChessPiece config={piece} /> : null }
      </div>
    )

  }
}
