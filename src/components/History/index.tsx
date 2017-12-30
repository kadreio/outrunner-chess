import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { applyMiddleware } from 'redux';
import { ChessPiece } from '../Piece';

export namespace HistoryDisplay {
  export interface Props {
    moves: Move[];
  }
}

const getNotationForPosition = (position: BoardPosition) => {
  const {row, col} = position;

  const displayNumber = 8 - row;
  switch (8 - col) {
    case 8:
      return 'a'+displayNumber;
    case 7:
      return 'b'+displayNumber;
    case 6:
      return 'c'+displayNumber;
    case 5:
      return 'd'+displayNumber;
    case 4:
      return 'e'+displayNumber;
    case 3:
      return 'f'+displayNumber;
    case 2:
      return 'g'+displayNumber;
    case 1:
      return 'h'+displayNumber;
  }
}

export class History extends React.Component<HistoryDisplay.Props> {

  render() {
    const { moves } = this.props;

    const list = moves.map((move) => {
      return (
        <ol>
          <div> {getNotationForPosition(move.fromPosition)} -> {getNotationForPosition(move.toPosition)} </div>
        </ol>
      )
    })

    return (
      <ul className={style.normal}> {list} </ul>
    )

  }
}
