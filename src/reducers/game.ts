import { handleActions } from 'redux-actions';
import * as Actions from '../constants/actions';
import { getInitialBoard } from './initial-board';
import { getActivePlayer, getPieceAtPosition, getBoardFromHistory } from '../services/board';
import { isValidMove } from '../services/board/index';
import { getValidMoves } from '../services/pieces/index';
import firebase from 'firebase';
import * as firestore from 'firebase/firestore';
import { loggedIn } from '../actions/board';


console.log(firebase, firestore);
const app = firebase.initializeApp({
  apiKey: "AIzaSyA_YMUlaoojkhCrRpvRWFKbPci7j_ARL1M",
  authDomain: "outrunnerchess.firebaseapp.com",
  databaseURL: "https://outrunnerchess.firebaseio.com",
  projectId: "outrunnerchess",
  storageBucket: "",
  messagingSenderId: "210958242284"
});
const db = firebase.firestore();


const testHistory: Game.History = [{"toPosition":{"col":3,"row":3},"fromPosition":{"col":3,"row":1}},{"toPosition":{"col":4,"row":4},"fromPosition":{"col":4,"row":6}},{"toPosition":{"col":3,"row":4},"fromPosition":{"col":3,"row":3}},{"toPosition":{"col":2,"row":4},"fromPosition":{"col":2,"row":6}}];
const initialState: GameState = {
  board: getBoardFromHistory(testHistory),
  currentPlayer: getActivePlayer(testHistory) as Chess.Side,
  history: testHistory,
  ui: {
    selectedSquare: null,
    potentialMoves: [],
  },
  user: {
    loggedIn: false,
    displayName: '',
    id: '',
  }
};

export default handleActions({
  [Actions.MOVE_PIECE]: (state, action: any) => {
    if(isValidMove(state.board, state.history, action.payload)) {
      const history = ([].concat(state.history)).concat(action.payload);
      const board = getBoardFromHistory(history);
      const currentPlayer = getActivePlayer(history);
      window.localStorage.setItem('history', JSON.stringify(history));
      db.doc('games/RYppDZthLpSKTueB6pq7').set({
        moves: history
      });

      return Object.assign(state, {
        board,
        history,
        currentPlayer
      });
    }
    return state;
  },
  [Actions.SELECT_PIECE]: (state, action: any) => {
    const target: Chess.Position = action.payload;

    if(target) {
      const currentPlayer = state.currentPlayer;
      const targePiece = getPieceAtPosition(state.board, target);

      if(targePiece && targePiece.side === currentPlayer) {
        return Object.assign(
          {},
          state,
          {
            ui:
              {
                selectedSquare: target,
                potentialMoves: getValidMoves(targePiece, state.board, target, state.history)
              }
          })
      } else {
        return state;
      }
    }
    return Object.assign({}, state, {ui:{selectedSquare: action.payload, potentialMoves: []}})
  },
  [Actions.LOGGED_IN]: (state, action: any) => {
    return Object.assign({}, state, {user: action.payload});
  }
}, initialState);
