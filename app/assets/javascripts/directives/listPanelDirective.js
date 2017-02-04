doozy.directive('listPanel', ['cardsService', function(cardsService) {
  return {
    restrict: 'E',
    templateUrl: 'directives/list-panel.html',
    scope: {
      list: '='
    },
    link: function(scope) {

      scope.formShowing = false;

      scope.createCard = function() {
        scope.newCard.listId = scope.list.id;
        cardsService.createCard(scope.newCard)
          .then(_clearForm);
      }

      scope.toggleForm = function() {
        scope.formShowing = !scope.formShowing;
      }

      var _clearForm = function() {
        scope.newCard = {};
      }
      
    }
  }
}])