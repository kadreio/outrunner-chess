const getEndRow = (side: 'BLACK'|'WHITE') =>  [{
  type: 'ROOK',
  side: side,
},{
  type: 'KNIGHT',
  side: side,
},{
  type: 'BISHOP',
  side: side,
},{
  type: 'QUEEN',
  side: side,
},{
  type: 'KING',
  side: side,
},{
  type: 'BISHOP',
  side: side,
},{
  type: 'KNIGHT',
  side: side,
},{
  type: 'ROOK',
  side: side,
}];

const getPawnRow = (side: 'BLACK'|'WHITE') =>  [{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
}];

const getTest1 = (side: 'BLACK'|'WHITE') =>  [null,null,null,null,null,null,{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
}];

const getTest2 = (side: 'BLACK'|'WHITE') =>  [null,null,null,null,null,null,{
  type: 'PAWN',
  side: side,
},{
  type: 'PAWN',
  side: side,
}];



const getEmptyRow = ()  =>  [null,null,null,null,null,null,null,null];

export function getInitialBoard() {
  return [
  getEndRow('WHITE'),
  getPawnRow('WHITE'),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getEmptyRow(),
  getPawnRow('BLACK'),
  getEndRow('BLACK'),
] as BoardStoreState;

}

