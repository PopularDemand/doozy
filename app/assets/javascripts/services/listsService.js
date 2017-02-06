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

  var updateList = function(list) {
    return list.save().then(function(response) {
      return response;
    })
  }

  return {
    getListsFromBoard: getListsFromBoard,
    addCardsToLists: addCardsToLists,
    createList: createList,
    updateList: updateList
  }
}])
