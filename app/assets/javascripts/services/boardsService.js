doozy.factory('boardsService', ['Restangular', function(Restangular) {

  var _board, _boards = [];


  // Show
  var getBoard = function(id) {
    return Restangular.one('boards', id).get().then(function(response) {
      _board = response;
      return _board;
    });
  }

  var updateBoard = function(params) {
    var prevBoard = angular.copy(_board, {});
    angular.copy(params, _board);
    return _board.save().then(function(response) {
      return response;
    }, function(error){
      angular.copy(prevBoard, _board);
      return error.data;
    })
  }

  var deleteBoard = function(board) {
    return board.remove();
  }


  // Index
  var getBoards = function() {
    return Restangular.all('boards').getList()
      .then(function(response) {
        angular.copy(response, _boards);
        return _boards;
      });
  }

  var createBoard = function(params) {
    return Restangular.all('boards').post({board: params}).then(function(response) {
        getBoards();
        return response;
    });
  }

  return {
    getBoard: getBoard,
    createBoard: createBoard,
    getBoards: getBoards,
    updateBoard: updateBoard,
    deleteBoard: deleteBoard
  }

}])
