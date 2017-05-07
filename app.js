var app = angular.module('myApp', []);

app.controller('hangmanController', function($scope) {

  $scope.cellPriority = [
    [4], [0, 2, 6, 8], [1, 3, 5, 7]
  ];

  $scope.reset = function() {
    $scope.board = [
      [ { value: '-', class: 'btn-primary btn-xl' }, { value: '-', class: 'btn-primary btn-xl' }, { value: '-', class: 'btn-primary btn-xl' } ],
      [ { value: '-', class: 'btn-primary btn-xl' }, { value: '-', class: 'btn-primary btn-xl' }, { value: '-', class: 'btn-primary btn-xl' } ],
      [ { value: '-', class: 'btn-primary btn-xl' }, { value: '-', class: 'btn-primary btn-xl' }, { value: '-', class: 'btn-primary btn-xl' } ]
    ];
    
    $scope.currentPlayer = 'X';
    $scope.winner = false;
    $scope.draw = false;
    $scope.winningPlayer = 'X';
    $scope.gameFinished = false;
    $scope.winningMessage = 'The house has won!';
  };
  
  $scope.reset();

  $scope.isCellDisabled = function(cell) {
    if (cell.value !== '-' || $scope.gameFinished)
      return true;

    return false;
  };
  
  var checkForMatch = function(cell1, cell2, cell3) {
    return cell1.value === cell2.value && 
           cell1.value === cell3.value &&
           cell1.value !== '-';
  };

  var processWinner = function (winner) {
    $scope.winner = true;
    $scope.winningPlayer = winner;

    if ($scope.winningPlayer === 'X') {
      $scope.winningMessage = 'You win. Congrats!';
    }
  };

  var finishGame = function() {
    $scope.gameFinished = true;
  };


  var markUpCells = function(rcVal, type) {
    var successClass = 'btn-success btn-xl';

    if (type === 'row') {
      var cells = $scope.board[rcVal];
      for (var i = 0; i < 3; i++) {
        c = cells[i];
        c.class = successClass;
      }
    }

    else if (type === 'col') {
      for (var i = 0; i < 3; i++) {
        c = $scope.board[i][rcVal];
        c.class = successClass;
      }
    }

    else {
      if (rcVal === 1) {
        $scope.board[0][0].class = successClass;
        $scope.board[1][1].class = successClass;
        $scope.board[2][2].class = successClass;
      }

      else if (rcVal == 2) {
        $scope.board[0][2].class = successClass;
        $scope.board[1][1].class = successClass;
        $scope.board[2][0].class = successClass;
      }
    }

    finishGame();
  };

  var processDraw = function() {
    $scope.draw = true;
  };

  var checkForDraw = function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if ($scope.board[i][j].value === '-') {
          return false;
        } 
      }
    }

    return true;
  };
  
  var checkForEndOfGame = function() {

    cell1 = null; cell2 = null; cell3 = null;

    // row check
    for (var row = 0; row < 3; row++) {
      var cell1 = $scope.board[row][0];
      var cell2 = $scope.board[row][1];
      var cell3 = $scope.board[row][2];

      if (checkForMatch(cell1, cell2, cell3)) {
        processWinner(cell1.value);
        markUpCells(row, 'row');
        return true;
      }
    }

    // column check
    for (var col = 0; col < 3; col++) {
      var cell1 = $scope.board[0][col];
      var cell2 = $scope.board[1][col];
      var cell3 = $scope.board[2][col];

      if (checkForMatch(cell1, cell2, cell3)) {
        processWinner(cell1.value);
        markUpCells(col, 'col')
        return true;
      }
    }

    // diagonal one
    var cell1 = $scope.board[0][0];
    var cell2 = $scope.board[1][1];
    var cell3 = $scope.board[2][2];

    if (checkForMatch(cell1, cell2, cell3)) {
        processWinner(cell1.value);
        markUpCells(1, 'diag')
        return true;
    }

    // diagonal two
    cell1 = $scope.board[0][2];
    cell2 = $scope.board[1][1];
    cell3 = $scope.board[2][0];

    if (checkForMatch(cell1, cell2, cell3)) {
        processWinner(cell1.value);
        markUpCells(2, 'diag')
        return true;
    }

    // check for draw
    if (checkForDraw()) {
      processDraw();
      finishGame();
      return true;
    }
    
    return false;
  };

  var getHorizontalWinnableCell = function(character) {
    for (var row = 0; row < 3; row++) {
      var characterCount = 0;
      var emptyCellCount = 0;
      var emptyCell = null;

      for (var col = 0; col < 3; col++) {
        if ($scope.board[row][col].value === character)
          characterCount++;

        else if ($scope.board[row][col].value === '-') {
          emptyCellCount++;
          emptyCell = $scope.board[row][col];
        }
      }

      if (characterCount === 2 && emptyCellCount === 1)
        return emptyCell;
    }

    return null;
  };

  var getVerticalWinnableCell = function(character) {
    for (var col = 0; col < 3; col++) {
      var characterCount = 0;
      var emptyCellCount = 0;
      var emptyCell = null;

      for (var row = 0; row < 3; row++) {
        if ($scope.board[row][col].value === character)
          characterCount++;

        else if ($scope.board[row][col].value === '-') {
          emptyCellCount++;
          emptyCell = $scope.board[row][col];
        }
      }

      if (characterCount === 2 && emptyCellCount === 1)
        return emptyCell;
    }

    return null;
  };

  var getWinnableCellInForwardDiagonal = function(character) {
    var characterCount = 0;
    var emptyCellCount = 0;
    var emptyCell = null;

    for (var i = 0; i < 3; i++) {
      if ($scope.board[i][i].value === character)
        characterCount++;

      else if ($scope.board[i][i].value === '-') {
        emptyCellCount++;
        emptyCell = $scope.board[i][i];
      }
    }

    if (characterCount === 2 && emptyCell === 1)
      return emptyCell;

    return null;
  };

  var getWinnableCellInBackwardDiagonal = function(character) {
    var characterCount = 0;
    var emptyCellCount = 0;
    var emptyCell = null;

    for (var i = 0; i < 3; i++) {
      var j = 3 - i - 1;
      if ($scope.board[i][j].value === character)
        characterCount++;

      else if ($scope.board[i][j].value === '-') {
        emptyCellCount++;
        emptyCell = $scope.board[i][j];
      }
    }

    if (characterCount === 2 && emptyCell === 1)
      return emptyCell;

    return null;
  };

  var getDiagonalWinnableCell = function(character) {
    var winnableCell = getWinnableCellInForwardDiagonal(character);

    if (winnableCell !== null)
      return winnableCell;

    return getWinnableCellInBackwardDiagonal(character);
  };

  var getWinnableCell = function(character) {
    var winnableCell = getHorizontalWinnableCell(character);

    if (winnableCell !== null)
      return winnableCell;

    winnableCell = getVerticalWinnableCell(character);

    if (winnableCell !== null) 
      return winnableCell;

    return getDiagonalWinnableCell(character);
  };

  var isCellFreeToPlay = function(cellId) {
    var i = 0;

    while (cellId >= 3) {
      cellId = cellId - 3;
      i++;
    }

    var j = cellId;

    if ($scope.board[i][j].value === '-')
      return $scope.board[i][j];

    return null;
  };

  var getHighestPriorityFreeCell = function() {
    for (var i in $scope.cellPriority) {
      var pArray = $scope.cellPriority[i];
      for (var j in pArray) {
        var cellId = pArray[j];
        var freeCell = isCellFreeToPlay(cellId);
        if (freeCell !== null)
          return freeCell;
      }
    }

    return null;
  };

  var getCellToPlay = function() {
    var winnableCell = getWinnableCell('O');

    if (winnableCell !== null)
      return winnableCell;

    winnableCell = getWinnableCell('X');

    if (winnableCell != null)
      return winnableCell;

    return getHighestPriorityFreeCell();
  };

  var switchPlayer = function() {
    $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
  };

  var play = function() {
    var cell = getCellToPlay();
    cell.value = 'O';
    switchPlayer();
  };
  
  $scope.mark = function(cell) {
    cell.value = $scope.currentPlayer;
    if (!checkForEndOfGame()) {
      switchPlayer();

      if ($scope.currentPlayer === 'O') {
        play();
        checkForEndOfGame();
      }
    }
  };
  
});