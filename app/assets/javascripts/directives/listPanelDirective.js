doozy.directive('listPanel', ['cardsService', 'listsService', function(cardsService, listsService) {
  return {
    restrict: 'E',
    templateUrl: 'directives/list-panel.html',
    scope: {
      list: '='
    },
    link: function(scope) {

      scope.newCard = {};
      scope.newCardFormShowing = false;
      scope.updateListFormShowing = false;

      var _toggleUpdateListForm = function() {
        scope.updateListFormShowing = !scope.updateListFormShowing
      }

      scope.showUpdateList = function() {
        _toggleUpdateListForm();
        // TODO focus input
      }

      scope.processListUpdate = function() {
        listsService.updateList(scope.list)
          .then(function() {
            _toggleUpdateListForm();
          });
      }

      scope.createCard = function() {
        scope.newCard.listId = scope.list.id;
        cardsService.createCard(scope.newCard)
          .then(_clearNewCardForm);
      }

      scope.toggleNewCardForm = function() {
        scope.newCardFormShowing = !scope.newCardFormShowing;
      }

      var _clearNewCardForm = function() {
        scope.newCard = {};
      }
      
    }
  }
}])