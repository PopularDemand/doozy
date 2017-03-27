doozy.directive('listPanel', ['cardsService', 'listsService', '$timeout', function(cardsService, listsService, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'directives/list-panel.html',
    scope: {
      list: '='
    },
    link: function(scope) {

      scope.newCard = {};
      scope.newList  = angular.copy(scope.list, {});
      scope.newCardFormShowing = false;
      scope.updateListFormShowing = false;

      scope.moveCard = function(card) {
        var cardId = parseInt(card.id);
        var prevList = parseInt(card.dataset.parentId)
        console.log(card)
        cardsService.changeList(cardId, prevList, scope.list.id);
      }

      scope.showUpdateList = function() {
        _toggleUpdateListForm();
        $timeout(function() {
          angular.element('#updateListInput').focus();
        });
      }

      scope.processListUpdate = function() {
        listsService.updateList(scope.newList)
          .then(function() {
            _toggleUpdateListForm();
            angular.copy(scope.list, scope.newList);
          }, function(errors) {
            //
          });
      }

      scope.createCard = function() {
        scope.newCard.listId = scope.list.id;
        cardsService.createCard(scope.newCard)
          .then(_clearNewCardForm);
      }

      scope.deleteList = function() {
        listsService.deleteList(scope.list);
      }

      scope.toggleNewCardForm = function() {
        scope.newCardFormShowing = !scope.newCardFormShowing;
      }

      var _toggleUpdateListForm = function() {
        scope.updateListFormShowing = !scope.updateListFormShowing
      }

      var _clearNewCardForm = function() {
        scope.newCard = {};
        scope.newCardFormShowing = false;
      }
      
    }
  }
}])