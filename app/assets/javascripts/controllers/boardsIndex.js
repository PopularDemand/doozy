doozy.controller('BoardsIndexCtrl', ['$scope', 'boards', 'boardsService',
  function($scope, boards, boardsService) {
    $scope.boards = boards

    $scope.createNewBoard = function() {
      boardsService.createNewBoard($scope.newBoard)
        .then(function(response) {
          console.log(response)
        });
    }
  }]
)
