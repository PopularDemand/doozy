doozy.factory('cardsService', ['Restangular', '$q', function(Restangular, $q) {
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
        _cards[listId].push(response);
      })
  }

  var updateCard = function(card) {
    return card.save().then(function(response) {
      return response;
    })
  }

  return {
    getCardsFromLists: getCardsFromLists,
    createCard: createCard,
    updateCard: updateCard
  }

}])
