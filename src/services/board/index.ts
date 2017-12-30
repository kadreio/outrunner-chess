import { Board } from '../../containers/Board/index';
import { cloneDeep } from 'lodash';
import { getInitialBoard } from '../../reducers/initial-board';
import { getValidMoves, getResult } from '../pieces/index';


const EMPTY = null;

const applyMove = (board: BoardStoreState, move: Move, moveNumber, history) => {
  const mover = getPieceAtPosition(board, move.fromPosition);

  const result:Result = getResult(board, mover, history.slice(0, moveNumber), move);

  return result.reduce(applyAction, board);

}

export const applyAction = (board: BoardStoreState, action: Action): BoardStoreState => {
  switch(action.type) {
    case 'ADDPIECE':
      setPieceAtPosition(board, action.target, action.piece);
    break;
    case 'REMOVEPIECE':
      setPieceAtPosition(board, action.target, null);
    break;
  }
  return board;
}

export const getPieceAtPosition = (board: BoardStoreState, position: BoardPosition) => {
  return board[position.row][position.col];
}

export const setPieceAtPosition = (board: BoardStoreState, position: BoardPosition, piece) => {
  board[position.row][position.col] = piece;
}


export const isValidMove = (board: BoardStoreState, history: Move[], move: Move) =>{
  const activePlayer = getActivePlayer(history);
  const movingPiece = getPieceAtPosition(board, move.fromPosition);

  return movingPiece && //A real square is selected
  (activePlayer === movingPiece.side) && //The only the pieces owener can move it
  pieceCanMove(movingPiece, move, board, history);
}

export const getActivePlayer = (history: Move[]) => {
  return  history.length % 2 ? 'BLACK' : 'WHITE';
}

const pieceCanMove = (piece: Piece, move: Move, board, history) => {
  return getValidMoves(piece, board, move.fromPosition, history).reduce((prev, pos) => {
      return prev || (pos.row === move.toPosition.row &&
      pos.col === move.toPosition.col)
    }, false);;
}

export const getBoardFromHistory = (history: Move[]): BoardStoreState => {
  let board = cloneDeep(getInitialBoard());
  const computedBoard = history.reduce(applyMove, board);
  return  computedBoard;
}
