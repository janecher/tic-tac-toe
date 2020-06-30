//Buisness logic

function Game (board, player1, player2) {
  this.board = board;
  this.player1 = player1;
  this.player2 = player2;
}

//Board

function Board () {
  this.board = [[],[],[]];
}

Board.prototype.rowChecker = function(space) {
  if(sideArrayFull(this.board[space.x], this.board.length)) {
    if(checkArrayForWin(this.board[space.x])) {
      return true;
    }
  }
  return false;
}

Board.prototype.columnChecker = function(space) {
  let columnArray = [];
  for(let i =0; i< this.board.length; i++) {
    if(this.board[i][space.y]) {
      columnArray.push(this.board[i][space.y]);
    } else {
      return false;
    }
  }
  return checkArrayForWin(columnArray);
}

Board.prototype.diagonalChecker = function(space) {
  let diagonalArray = [];
  for(let i =0; i< this.board.length; i++) {
    if(this.board[i][i]) {
      diagonalArray.push(this.board[i][i]);
    } else {
      return false;
    }
  }
  return checkArrayForWin(diagonalArray);
}

Board.prototype.crossDiagonalChecker = function(space) {
  let crossDiagonalArray = [];
  for(let i =0; i< this.board.length; i++) {
    if(this.board[i][this.board.length - i - 1]) {
      crossDiagonalArray.push(this.board[i][this.board.length - i - 1]);
    } else {
      return false;
    }
  }
  return checkArrayForWin(crossDiagonalArray);
}

function sideArrayFull(array, size) {
  if (array.length === size) {
    for(let i = 0; i < array.length; i++) {
      if(!array[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function checkArrayForWin(array) {
  let checker = array[0];
    for(let i = 1; i < array.length; i++) {
      if(array[i] !== checker) {
        return false;
      }
    }
  return true;
}

//Space

function Space (x, y) {
  this.x = x;
  this.y = y;
}

Space.prototype.marked = function(player) {
  this.value = player.sigh;
}

Space.prototype.markedBy = function() {
  return this.value;
}

//Player

function Player (sigh) {
  this.sigh = sigh;
}

Player.prototype.mark = function() {
  return this.sigh;
}


//UI Logic

function playerMove(player1, player2) {
  if (player1.turn) {
    player1.turn = false;
    return player1.mark();
  } else {
    player1.turn = true;
    return player2.mark();
  }
}

function markSpace(space, player1, player2) {
  if (player1.turn) {
    space.marked(player1);
  } else {
    space.marked(player2);
  }
}

$(document).ready(function() {
  let playerX = new Player("X");
  playerX.turn = true;
  let playerO = new Player("O");
  let board = new Board();
  let stop = false;
  for(let x = 0; x < 3; x++) {
    for(let y = 0; y < 3; y++) {
      let space = new Space(x, y);
      $("#x"+x+"y"+y).on('click', function(){  
        //let space = new Space(x, y);
        markSpace(space, playerX, playerO);
        board.board[x][y] = space.markedBy();
        $("#x"+x+"y"+y).text(playerMove(playerX, playerO));
        if (board.rowChecker(space) || board.columnChecker(space) || board.diagonalChecker(space) || board.crossDiagonalChecker(space)) {
          alert("Player " + space.markedBy() + " win");
          stop = true;
        }
        $("#x"+x+"y"+y).off('click');
      }); 
      if(stop) {
        $("#x"+x+"y"+y).off('click');
      }
    }
  }
});
