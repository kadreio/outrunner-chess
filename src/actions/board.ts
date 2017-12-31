import { createAction } from 'redux-actions';
import * as Actions from '../constants/actions';
export const selectSquare = createAction<Chess.Position | undefined>(Actions.SELECT_PIECE);
export const movePiece = createAction<Game.Move>(Actions.MOVE_PIECE);

export const loggedIn = createAction<User>(Actions.LOGGED_IN);
export const loggedOut = createAction(Actions.LOGGED_OUT);
