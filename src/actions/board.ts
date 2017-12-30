import { createAction } from 'redux-actions';
import * as Actions from '../constants/actions';
export const selectSquare = createAction<BoardPosition | undefined>(Actions.SELECT_PIECE);
export const movePiece = createAction<Move>(Actions.MOVE_PIECE);
export const gameUpdate = createAction<Move[]>(Actions.GAME_UPDATE);
