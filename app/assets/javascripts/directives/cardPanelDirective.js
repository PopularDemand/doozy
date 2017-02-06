doozy.directive('cardPanel', ['cardsService',
  function(cardsService){
    return {
      restrict: 'E',
      templateUrl: 'directives/card-panel.html',
      scope: {
        card: '='
      },
      link: function(scope) {
        scope.nameEditShowing = false;
        scope.descriptionEditShowing = false;
        scope.addMemberShowing = false;

        scope.toggleCardCompletion = function() {
          if (scope.card.completed) {
            scope.card.completed = null;
          } else {
            scope.card.completed = new Date();
          }
          scope.processCardUpdate();
        }

        scope.toggleNameEdit = function() {
          scope.nameEditShowing = !scope.nameEditShowing;
        }

        scope.toggleDescriptionEdit = function() {
          scope.descriptionEditShowing = !scope.descriptionEditShowing;
        }

        scope.processCardUpdate = function() {
          cardsService.updateCard(scope.card);
          _hideFields();
        }

        var _hideFields = function() {
          scope.nameEditShowing = false;
          scope.descriptionEditShowing = false;
          scope.addMemberShowing = false;
        }
      }
    }
  }])