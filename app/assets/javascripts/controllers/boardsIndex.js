doozy.controller('BoardsIndexCtrl', ['$scope', 'boards', 'boardsService',
  function($scope, boards, boardsService) {
    $scope.boards = boards

    $scope.createBoard = function() {
      boardsService.createBoard($scope.newBoard)
    }
}])
