import { getPieceAtPosition } from '../board/index';
import { connect } from 'react-redux';
import { getPositionsForPattern, horizontalPatterns } from './util';

export const Rook: PieceService = {
  getValidMoves: (board: BoardStoreState, position: BoardPosition): BoardPosition[] => {
    const movingPiece = getPieceAtPosition(board, position);
    let positions = [];
    horizontalPatterns.forEach((pattern) => {
      positions = positions.concat(getPositionsForPattern(pattern, 8, board, position, movingPiece));
    })

    return positions;
  }
}
