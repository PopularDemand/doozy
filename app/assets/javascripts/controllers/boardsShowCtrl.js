doozy.controller('BoardsShowCtrl', ['$scope', 'board', 'lists', 'cards', 'boardsService', 'listsService', '$timeout', '$state', function($scope, board, lists, cards, boardsService, listsService, $timeout, $state) {

  $scope.board = board;
  $scope.newBoard = angular.copy($scope.board, {});
  $scope.lists = lists;
  $scope.cards = cards;
  $scope.updateBoardTitleShowing = false;
  $scope.updateBoardDescShowing = false;
  $scope.sidebarShowing = false;

  listsService.addCardsToLists(cards);

  $scope.deleteBoard = function() {
    boardsService.deleteBoard($scope.board)
      .then(function() {
        $state.go('index');
      })
  }

  $scope.createList = function() {
    $scope.newList.boardId = $scope.board.id;
    listsService.createList($scope.newList);
  }

  $scope.showUpdateBoardTitle = function() {
    $scope._toggleUpdateBoardTitle();
    $timeout(function() {
      _focusInput('#board-title');
    })
  }

  $scope.showUpdateBoardDesc = function() {
    $scope._toggleUpdateBoardDesc();
    $timeout(function() {
      _focusInput('#board-desc');
    })
  }

  $scope.toggleSidebar = function($event) {
    $event.target.blur();
    $scope.sidebarShowing = !$scope.sidebarShowing;
  }
  
  $scope._toggleUpdateBoardTitle = function() {
    $scope.updateBoardTitleShowing = !$scope.updateBoardTitleShowing;
  }

  $scope._toggleUpdateBoardDesc = function() {
    $scope.updateBoardDescShowing = !$scope.updateBoardDescShowing;
  }

  $scope.processBoardUpdate = function() {
    boardsService.updateBoard($scope.newBoard)
      .then(function(response) {
        angular.copy($scope.board, $scope.newBoard);
      }, function() {
        // set errors
      });
    _closeInputs();
  }

  var _closeInputs = function() {
    $scope.updateBoardTitleShowing = false;
    $scope.updateBoardDescShowing = false;
  }

  var _focusInput = function(selector) {
    angular.element(selector).focus();
  }

}])
