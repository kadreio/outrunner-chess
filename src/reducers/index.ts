import { combineReducers, Reducer } from 'redux';
import game from './game';
import { selectSquare } from '../actions/board';
import { handleActions } from 'redux-actions';
import * as Actions from '../constants/actions';
export interface RootState {
  game: GameState
}

export default combineReducers<RootState>({
  game,
});
