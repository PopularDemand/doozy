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

  var deleteList = function(list) {
    list.remove();
    for(var i = 0; i < _lists.length; i++) {
      if (_lists[i].id === list.id) {
        _lists.splice(i, 1);
        break;
      }
    }
  }

  // var swapCard = function(prevList, card) {
  //   console.log(prevList)
  //   console.log(_lists)
  //   for (var i  = 0; i < _lists.length; i++) {
  //     if (_lists[i].id === prevList) {
  //       var list = _lists[i]
  //       console.log('list', list)
  //       break;
  //     } else {
  //       console.log('no list found');
  //     }
  //   }

  //   for (var j = 0; j < list.cards.length; j++) {
  //     if (list.cards[j].id === card.id) {
  //       var movingCard = list.cards.splice(i, 1);
  //       console.log('card', movingCard)
  //       break;
  //     } else {
  //       console.log('no card found')
  //     }
  //   }
  //   if (!_lists[card.list_id]) _lists[card.list_id] = []

  //   _lists[card.list_id].push(movingCard);
  // }

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
    removeCard: removeCard
  }
}])
