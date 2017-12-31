import { getPieceAtPosition } from '../board/index';
import { connect } from 'react-redux';
import { getPositionsForPattern, diagonalPatterns } from './util';

export const Bishop: PieceService = {
  getValidMoves: (board: Chess.Board, position: Chess.Position): Chess.Position[] => {
    const movingPiece = getPieceAtPosition(board, position);
    let positions = [];
    diagonalPatterns.forEach((pattern) => {
      positions = positions.concat(getPositionsForPattern(pattern, 8, board, position, movingPiece));
    })

    return positions;
  }
}
