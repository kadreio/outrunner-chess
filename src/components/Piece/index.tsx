import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { applyMiddleware } from 'redux';
import {
  pawn,
  queen,
  king,
  knight,
  rook,
  bishop
} from './assets'

const SCALE = 1.3;

export namespace ChessPiece {
  export interface Props {
    config: Chess.Piece;
  }
}

export class ChessPiece extends React.Component<ChessPiece.Props> {


  render() {
    const { config } = this.props;
    const {width, height, file, offsetX, offsetY} = typeImageMap[config.type];
    return (

      <div className={style.container + ' ' + ((config.side === 'WHITE') ? style.white : style.black) }>
        <svg viewBox={`${offsetX} ${offsetY} ${height} ${width}`} height={height * SCALE} width={width * SCALE} dangerouslySetInnerHTML={{ __html : file.toString()}}>
        </svg>
      </div>
    )

  }
}

const typeImageMap = {
  PAWN: {
    file: pawn,
    width: 23,
    height: 29,
    offsetX: 7,
    offsetY: 13,
  },
  QUEEN: {
    file: queen,
    width: 37,
    height: 34,
    offsetX: 5,
    offsetY: 5,
  },
  KING: {
    file: king,
    width: 34,
    height: 36,
    offsetX: 4,
    offsetY: 5,
  },
  ROOK: {
    file: rook,
    width: 27,
    height: 30,
    offsetX: 7,
    offsetY: 10,
  },
  BISHOP: {
    file: bishop,
    width: 33,
    height: 34,
    offsetX: 5,
    offsetY: 6,
  },
  KNIGHT: {
    file: knight,
    width: 33,
    height: 34,
    offsetX: 6,
    offsetY: 7,
  },
}

