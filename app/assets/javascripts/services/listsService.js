doozy.factory('listsService', ['Restangular', function(Restangular) {
  var _lists;

  var getListsFromBoard = function(boardId) {
    return Restangular.one('boards', boardId).all('lists').getList().then(function(response) {
      _lists = response;
      return _lists;
    });
  }

  var addCardsToLists = function(cards) {
    for (var i = 0; i < _lists.length; i++) {
      _lists[i].cards = cards[_lists[i].id]
    }
    return _lists
  }

  var createList = function(listParams) {
    var boardId = listParams.boardId;
    return Restangular.one('boards', boardId).all('lists').post({ list: listParams })
      .then(function(list) {
        _lists.push(list)
      })
  }

  var updateList = function(params) {
    var list = _findList(params);
    var prevList = angular.copy(list, {});
    angular.copy(prevList, list);

    return list.save().then(_returnSuccess, _handleReject);
  }

  var _findList = function(params) {
    for (var i = 0; i < _lists.length; i++) {
      if (_lists[i].id === params.id) {
        return _lists[i];
      }
    }
    return 'unable to locate list';
  }

  var _returnSuccess = function(response) {
    return response;
  }

  var _handleReject = function(error) {
    angular.copy(prevList, list);
    return error.data;
  }

  return {
    getListsFromBoard: getListsFromBoard,
    addCardsToLists: addCardsToLists,
    createList: createList,
    updateList: updateList
  }
}])
