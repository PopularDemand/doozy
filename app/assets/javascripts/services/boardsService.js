doozy.factory('boardsService', ['Restangular', function(Restangular) {

  var _board, _boards = [];


  // Show
  var getBoard = function(id) {
    return Restangular.one('boards', id).get().then(function(response) {
      _board = response;
      return _board;
    });
  }


  // Index
  var getBoards = function() {
    return Restangular.all('boards').getList()
      .then(function(response) {
        angular.copy(response, _boards);
        return _boards;
      });
  }

  var createNewBoard = function(params) {
    return Restangular.all('boards').post({board: params}).then(function(response) {
        getBoards();
        // TODO check for lag
        return response;
    });
  }

  return {
    getBoard: getBoard,
    createNewBoard: createNewBoard,
    getBoards: getBoards
  }

}])
