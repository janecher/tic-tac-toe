//Buisness logic

function Game (board, player1, player2) {
  this.board = board;
  this.player1 = player1;
  this.player2 = player2;
}

//Board

function Board () {
  this.board = [];
}

Board.prototype.spaces = function (n) {
  for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= n; j++) {
      this.board.push(new Space(i, j));
    }
  }
}

Board.prototype.find = function (x, y) {
  for(let i = 0; i < this.board.length; i ++){
    if(this.board[i].x === x && this.board[i].y === y) {
      return this.board[i];
    }
  }
  return false;
}

/*Board.prototype.win = function() {
  if(board[0].value === board[1].value === board[2].value || 
  board[3].value === board[4].value === board[5].value ||
  board[6].value === board[7].value === board[8].value ||
  board[0].value === board[3].value === board[5].value ||
  board[1].value === board[4].value === board[6].value ||
  board[2].value === board[5].value === board[8].value ||
  board[0].value === board[4].value === board[8].value ||
  board[2].value === board[4].value === board[6].value) {
    return true;
  } else {
    return false;
  }
}*/

Board.prototype.full = function() {
  for(let i = 0; i <this.board.length; i++) {
    if(this.board[i].mark) {
      return false;
    }
  }
  return true;
}

//Space

function Space (x, y) {
  this.x = x;
  this.y = y;
  this.mark = false;
}

Space.prototype.marked = function(player) {
  this.mark = true;
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

function win(board) {
  if(board.board[0].value === board.board[1].value === board.board[2].value || 
    board.board[3].value === board.board[4].value === board.board[5].value ||
    board.board[6].value === board.board[7].value === board.board[8].value ||
    board.board[0].value === board.board[3].value === board.board[5].value ||
    board.board[1].value === board.board[4].value === board.board[6].value ||
    board.board[2].value === board.board[5].value === board.board[8].value ||
    board.board[0].value === board.board[4].value === board.board[8].value ||
    board.board[2].value === board.board[4].value === board.board[6].value) {
      return true;
    } else {
      return false;
    }
}

function playerMove (player1, player2) {
  if (player1.turn) {
    player1.turn = false;
    return player1.mark();
  } else {
    player1.turn = true;
    return player2.mark();
  }
}

function markSpace (space, player1, player2) {
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
  board.spaces(3);
  for(let x = 1; x <= 3; x++) {
    for(let y = 1; y <= 3; y++) {
      $("#x"+x+"y"+y).click(function(){  
        if(!board.find(x, y).mark) {
          markSpace(board.find(x, y), playerX, playerO);
          $("#x"+x+"y"+y).text(playerMove(playerX, playerO));
          console.log(board);
        }
      });
    }
  }
});
