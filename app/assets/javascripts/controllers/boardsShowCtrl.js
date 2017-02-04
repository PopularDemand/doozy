doozy.controller('BoardsShowCtrl', ['$scope', 'board', 'lists', 'cards', 'listsService', function($scope, board, lists, cards, listsService) {

  $scope.board = board;
  $scope.lists = lists;
  $scope.cards = cards;

  listsService.addCardsToLists(cards);

  $scope.createList = function() {
    $scope.newList.boardId = $scope.board.id;
    listsService.createList($scope.newList);
  }

}])
