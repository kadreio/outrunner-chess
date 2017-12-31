import { getPieceAtPosition } from '../board/index';
import { connect } from 'react-redux';
import { getPositionsForPattern, omniDirectionalPatterns } from './util';

export const King: PieceService = {
  getValidMoves: (board: Chess.Board, position: Chess.Position): Chess.Position[] => {
    const movingPiece = getPieceAtPosition(board, position);
    let positions = [];
    omniDirectionalPatterns.forEach((pattern) => {
      positions = positions.concat(getPositionsForPattern(pattern, 1, board, position, movingPiece));
    })

    return positions;
  }
}
