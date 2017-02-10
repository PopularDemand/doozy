doozy.factory('cardsService',  ['listsService', 'Restangular', '$q', function(listsService, Restangular, $q) {
  var _cards = {};

  var getCardsFromList = function(listId) {
    return Restangular.one('lists', listId).all('cards').getList().then(function(response) {
      _cards[listId] = response;
      return _cards;
    });
  }

  var getCardsFromLists = function(lists) {
    var cardPromises = [];
    for (var i = 0; i < lists.length; i++) {
      cardPromises.push(getCardsFromList(lists[i].id))
    }

    return $q.all(cardPromises).then(function() {
      return _cards
    })
  }

  var createCard = function(cardParams) {
    var listId = cardParams.listId;
    return Restangular.one('lists', listId)
      .all('cards')
      .post({ card: cardParams })
      .then(function(response) {
        // this also adds card to _cards
        listsService.addCard(response);
      })
  }

  var changeList = function(cardId, prevList, newList) {
    var prevParams = {
      id: cardId,
      list_id: prevList
    }
    var card = _findCard(prevParams);
    var newParams = angular.copy(card, {});
    deleteCard(card).then(function(response) {
      newParams.listId = newList;
      createCard(newParams);
    }, function(error) {
      console.error(error)
    });
  }

  var updateCard = function(params) {
    var card = _findCard(params);
    var prevCard = angular.copy(card, {});
    angular.copy(params, card);
    return card.save().then(function(response) {
      return response;
    }, function(error) {
      angular.copy(prevCard, card);
      return error.data;
    })
  }

  var deleteCard = function(card) {
    return card.remove().then(function() {
      listsService.removeCard(card);
    }, function(error) { console.log(error) });
  }

  var _findCard = function(params) {
    var listId = params.list_id;
    for (var i = 0; i < _cards[listId].length; i++) {
      if (_cards[listId][i].id === params.id) {
        return _cards[listId][i];
      }
    }
    return 'unable to locate card'
  }

  return {
    getCardsFromLists: getCardsFromLists,
    createCard: createCard,
    updateCard: updateCard,
    deleteCard: deleteCard,
    changeList: changeList
  }

}])
