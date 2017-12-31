declare namespace Chess {
  export type Board = [
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null],
    [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null]
  ]
  export type Position = {
    row: number,
    col: number,
  }
  export type Side = 'WHITE' | 'BLACK';
  export interface Piece {
    side: 'BLACK'|'WHITE',
    type: PieceType
  }
  export type PieceType = 'PAWN'|'ROOK'|'BISHOP'|'KNIGHT'|'QUEEN'|'KING';
}






declare type User = {
  loggedIn: boolean;
  displayName: string;
  id: string;
}

declare type UIState = {
  selectedSquare?: Chess.Position;
  potentialMoves: Chess.Position[];
}

declare type GameState = {
  board: Chess.Board;
  currentPlayer: Chess.Side;
  history: Game.History;
  ui: UIState;
  user: User
};

declare interface PieceService {
  getValidMoves(board: Chess.Board, position: Chess.Position, history?: Game.History): Chess.Position[],
  getMoveResults?(board: Chess.Board, history, move)
}

declare namespace Game {

  export type Move = {
    fromPosition: Chess.Position;
    toPosition: Chess.Position;
    promotion?: Chess.Piece
  }

  export type History = Move[];

  export type GameInstance = {
    history: History,
    white: User['id'];
    black: User['id'];
    state: 'PENDING' | 'ACTIVE' | 'COMPLETE';
  }

  export type Action = {
    type: 'ADDPIECE'|'REMOVEPIECE',
    target: Chess.Position,
    piece?: Chess.Piece,
  }

  export type Result = Action[];
}
