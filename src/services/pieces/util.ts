import { getPieceAtPosition } from '../board/index';

type PatternDelta = {
  row: number,
  col: number
}
export function getPositionsForPattern(delta: PatternDelta, distance: number, board: BoardStoreState, position: BoardPosition, piece: Piece, attack = true, travel = true): number[] {
  const positions = [];

  let nextPosition: BoardPosition = {
    row: delta.row + position.row,
    col: delta.col + position.col
  }
  while(distance) {
    distance--;
    if(nextPosition.row > 7 || nextPosition.col > 7 || nextPosition.row  < 0 || nextPosition.col  < 0) break;

    const targetPiece: Piece = getPieceAtPosition(board, nextPosition);
    if(targetPiece) {
      if(targetPiece.side === piece.side) break;
      if(attack) positions.push(nextPosition);
      break;
    } else if(!travel) {
      break;
    }

    positions.push(nextPosition);

    nextPosition = {
      row: delta.row + nextPosition.row,
      col: delta.col + nextPosition.col
    }
  }

  return positions;

}

export function getStandardResult(move, piece):Result {
  return [
    {
      type:'REMOVEPIECE',
      target: move.toPosition,
    },
    {
      type:'REMOVEPIECE',
      target: move.fromPosition,
    },
    {
      type:'ADDPIECE',
      target: move.toPosition,
      piece
    }
  ]
}

export const horizontalPatterns = [{
  row: 1,
  col: 0
}, {
  row: 0,
  col: 1
},{
  row: -1,
  col: 0
}, {
  row: 0,
  col: -1
}]

export const diagonalPatterns = [{
  row: 1,
  col: 1
}, {
  row: -1,
  col: -1
},{
  row: -1,
  col: 1
}, {
  row: 1,
  col: -1
}]

export const omniDirectionalPatterns = [{
  row: 1,
  col: 1
}, {
  row: -1,
  col: -1
},{
  row: -1,
  col: 1
}, {
  row: 1,
  col: -1
}, {
  row: 1,
  col: 0
}, {
  row: 0,
  col: 1
},{
  row: -1,
  col: 0
}, {
  row: 0,
  col: -1
}];
