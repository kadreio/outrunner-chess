declare type PieceType = 'PAWN'|'ROOK'|'BISHOP'|'KNIGHT'|'QUEEN'|'KING';
declare interface Piece {
  side: 'BLACK'|'WHITE',
  type: PieceType
}

declare type BoardStoreState = [
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

declare type BoardPosition = {
  row: number,
  col: number,
}

declare enum Sides {
  White = 'WHITE',
  Black = 'BLACK',
}

declare enum Bounds {
  MaxRow = 7,
  MaxCol = 7,
}

declare type Move = {
  fromPosition: BoardPosition;
  toPosition: BoardPosition;
}

declare type Action = {
  type: 'ADDPIECE'|'REMOVEPIECE',
  target: BoardPosition,
  piece?: Piece,
}

declare type Result = Action[];

declare type UIState = {
  selectedSquare?: BoardPosition;
  potentialMoves: BoardPosition[];
}

declare type GameState = {
  board: BoardStoreState;
  currentPlayer: Sides.White | Sides.Black;
  history: Move[];
  ui: UIState
};

declare interface PieceService {
  getValidMoves(board: BoardStoreState, position: BoardPosition, history?: Move[]): BoardPosition[],
  getMoveResults?(board: BoardStoreState, history, move)
}
