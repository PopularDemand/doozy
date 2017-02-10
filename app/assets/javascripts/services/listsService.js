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

  var removeCard = function(card) {
    for (var i = 0; i < _lists.length; i++) {
      if (_lists[i].id === card.list_id) {
        var index = _lists[i].cards.indexOf(card);
        _lists[i].cards.splice(index, 1);
      }
    }
  }

  var addCard = function(card) {
    // console.log(_lists)
    var list = _findList({ id: card.list_id });
    list.cards.push(card);
  }

  var deleteList = function(list) {
    list.remove();
    for(var i = 0; i < _lists.length; i++) {
      if (_lists[i].id === list.id) {
        _lists.splice(i, 1);
        break;
      }
    }
  }

  var createList = function(listParams) {
    var boardId = listParams.boardId;
    return Restangular.one('boards', boardId).all('lists').post({ list: listParams })
      .then(function(list) {
        list.cards = [];
        _lists.push(list);
      })
  }

  var updateList = function(params) {
    var list = _findList(params);
    var prevList = angular.copy(list, {});
    angular.copy(params, list);

    return list.save().then(_returnSuccess, function(error) {
    angular.copy(prevList, list);
    return error.data;
  });
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
    updateList: updateList,
    deleteList: deleteList,
    removeCard: removeCard,
    addCard: addCard
  }
}])
