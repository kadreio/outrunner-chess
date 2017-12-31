import { Pawn } from './pawn';
import { Queen } from './queen';
import { King } from './king';
import { Bishop } from './bishop';
import { Rook } from './rook';
import { Knight } from './knight';
import { getStandardResult } from './util';


export function getValidMoves(piece:Chess.Piece, board: Chess.Board, origin: Chess.Position, history: Game.History) {
  let validMoves = [];
  switch(piece.type) {
    case 'PAWN':
      validMoves = Pawn.getValidMoves(board, origin, history)
    break;
    case 'QUEEN':
      validMoves = Queen.getValidMoves(board, origin)
    break;
    case 'KING':
      validMoves = King.getValidMoves(board, origin, history)
    break;
    case 'BISHOP':
      validMoves = Bishop.getValidMoves(board, origin)
    break;
    case 'ROOK':
      validMoves = Rook.getValidMoves(board, origin)
    break;
    case 'KNIGHT':
      validMoves = Knight.getValidMoves(board, origin)
    break;
    default:
      validMoves = Queen.getValidMoves(board, origin)
  }
  return validMoves;
}

export function getResult(board: Chess.Board, piece: Chess.Piece, history: Game.History, move:Game.Move): Game.Result {
  let result: Game.Result  = [];
  switch(piece.type) {
    case 'PAWN':
      result = Pawn.getMoveResults(board, history, move)
    break;
    // case 'KING':
    //   result = King.getMoveResults(history, move)
    // break;
    default:
      result = getStandardResult(move, piece);
  }
  return result;
}
