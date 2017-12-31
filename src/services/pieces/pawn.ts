import { getPieceAtPosition, getActivePlayer, getBoardFromHistory } from '../board/index';
import { connect } from 'react-redux';
import { getPositionsForPattern, getStandardResult } from './util';
import isEqual from 'lodash-es/isEqual';
import { History } from '../../components/History/index';

export const Pawn: PieceService = {
  getValidMoves: (board: Chess.Board, position: Chess.Position, history: Game.History): Chess.Position[] => {
    const movingPiece = getPieceAtPosition(board, position);
    let positions = [];

    //"Flip the board" if black to make logic easier;
    const currentRow = movingPiece.side === "WHITE" ? position.row : 7 - position.row;
    const distance = currentRow === 1 ? 2 : 1;
    const direction = movingPiece.side === "WHITE" ? 1 : -1;

    const forwardPattern = {
      row: direction,
      col: 0
    }

    const attackPatterns =[{
      row: direction,
      col: 1
    }, {
      row: direction,
      col: -1
    }]

    positions = positions.concat(getPositionsForPattern(forwardPattern, distance, board, position, movingPiece, false));
    attackPatterns.forEach((pattern) => {
      positions =  positions.concat(getPositionsForPattern(pattern, distance, board, position, movingPiece, true, false));
    });

    let enPassantPos = getEnPassant(position, board, history[history.length -1], getActivePlayer(history));
    if(enPassantPos) {
      positions.push(enPassantPos);
    }


    return positions;
  },

  getMoveResults: (board: Chess.Board, history: Game.History, move:Game.Move) => {
    const activePlayer = getActivePlayer(history);

    if(move.fromPosition.col !== move.toPosition.col) return getEnPassantActions(move, activePlayer, history)
    if(move.toPosition.row === 0 || move.toPosition.row === 7) {
      // Promote piece
    }

    return getStandardResult(move, {
      type: 'PAWN',
      side: getActivePlayer(history)
    });
  }
}

function getEnPassantActions(move:Game.Move, activePlayer, history) {
  const removeSpot = {
    col: move.toPosition.col,
    row: move.toPosition.row === 2 ? 3 : 4
  }

  return [
    {
      type:'REMOVEPIECE',
      target: removeSpot,
    },
    {
      type:'REMOVEPIECE',
      target: move.fromPosition,
    },
    {
      type:'ADDPIECE',
      target: move.toPosition,
      piece: {
        type: 'PAWN',
        side: getActivePlayer(history)
      }
    }
  ]
}


function getEnPassant(position: Chess.Position, board: Chess.Board, lastMove: Game.Move, side): Chess.Position {
  if(!Boolean(lastMove)) return;

  const isWhite = side === 'WHITE';

  if(!(isWhite && (position.row === 4) || !isWhite && (position.row === 3))) return;


  const targetRow = isWhite ? 4 : 3
  const correctRow = position.row == targetRow;

  const targets = [];
  const left = position.col + 1;
  const right = position.col - 1

  //Check Bounds
  if(left + 1 <= 7) targets.push(left);
  if(right + 1 <= 7) targets.push(right);

  const valid = targets.map((col) => {
    return {
      col,
      row: targetRow
    }
  }).filter((targetPosition) => {
    const targetPiece = board[targetPosition.row][targetPosition.col]
    const isPawn = targetPiece && targetPiece.type == 'PAWN';
    const movedTwoLastTurn = isEqual(lastMove.fromPosition, {col: targetPosition.col, row: isWhite ? 6 : 1});

    return isPawn && movedTwoLastTurn;
  }).map((position) => {
    return {
      col: position.col,
      row: isWhite ? 5 : 2
    }
  })
  return valid[0];
}
