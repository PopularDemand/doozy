doozy.controller('BoardsShowCtrl', ['$scope', 'board', 'lists', 'cards', 'boardsService', 'listsService', function($scope, board, lists, cards, boardsService, listsService) {

  $scope.board = board;
  $scope.newBoard = angular.copy($scope.board, {});
  $scope.lists = lists;
  $scope.cards = cards;
  $scope.updateBoardFormShowing = false;

  listsService.addCardsToLists(cards);

  $scope.createList = function() {
    $scope.newList.boardId = $scope.board.id;
    listsService.createList($scope.newList);
  }

  $scope.showUpdateBoard = function() {
    $scope._toggleUpdateBoardShow();
    // TODO focus the input
  }

  $scope._toggleUpdateBoardShow = function() {
    $scope.updateBoardFormShowing = !$scope.updateBoardFormShowing;
  }

  $scope.processBoardUpdate = function() {
    boardsService.updateBoard($scope.newBoard)
      // .then(_, _setErrors);
    $scope._toggleUpdateBoardShow();
    angular.copy($scope.board, $scope.newBoard);
  }

}])
