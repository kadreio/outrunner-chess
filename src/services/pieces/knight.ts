import { getPieceAtPosition } from '../board/index';
import { connect } from 'react-redux';
import { getPositionsForPattern, diagonalPatterns } from './util';

export const Knight: PieceService = {
  getValidMoves: (board: BoardStoreState, position: BoardPosition): BoardPosition[] => {
    const movingPiece = getPieceAtPosition(board, position);
    let positions = [];

    const patterns = [{
      row: 1,
      col: 2
    }, {
      row: 1,
      col: -2
    },{
      row: -1,
      col: 2
    }, {
      row: -1,
      col: -2
    },{
      row: 2,
      col: 1
    }, {
      row: 2,
      col: -1
    },{
      row: -2,
      col: 1
    }, {
      row: -2,
      col: -1
    }]

    patterns.forEach((pattern) => {
      positions = positions.concat(getPositionsForPattern(pattern, 1, board, position, movingPiece));
    })

    return positions;
  }
}
