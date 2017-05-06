var app = angular.module('myApp', []);

app.controller('hangmanController', function($scope) {

  

  $scope.reset = function() {
    $scope.board = [
      [ { value: '-' }, { value: '-' }, { value: '-' } ],
      [ { value: '-' }, { value: '-' }, { value: '-' } ],
      [ { value: '-' }, { value: '-' }, { value: '-' } ]
    ];
    
    $scope.currentPlayer = 'X';
    $scope.winner = false;
    $scope.winningPlayer = 'X';
  };
  
  $scope.reset();
  
  $scope.isTaken = function(cell) {
    return cell.value !== '-';
  };
  
  var checkForMatch = function(cell1, cell2, cell3) {
    return cell1.value === cell2.value && 
           cell1.value === cell3.value &&
           cell1.value !== '-';
  };

  var processWinner = function (winner) {
    $scope.winner = true;
    $scope.winningPlayer = winner;
  };

  var markUpCells = function(rcVal, type) {

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
    
    return false;
  };

  var play = function() {

  };
  
  $scope.mark = function(cell) {
    cell.value = $scope.currentPlayer;
    if (!checkForEndOfGame()) {
      $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';

      if ($scope.currentPlayer == '0') {
        play();
      }
    }
  };
  
});