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
        scope.newCard = angular.copy(scope.card, {});

        scope.toggleCardCompletion = function() {
          if (scope.card.completed) {
            scope.newCard.completed = null;
          } else {
            scope.newCard.completed = new Date();
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
          cardsService.updateCard(scope.newCard)
            .then(function() {
              angular.copy(scope.card, scope.newCard);
            }, function(error){
              //
            });
          _hideFields();
        }

        scope.toggleMember = function(memberId) {
          _addOrRemoveMember(memberId);
          scope.newCard.relavant_member = memberId;
          scope.processCardUpdate();
        }

        var _addOrRemoveMember = function(id) {
          for (var i = 0; i < scope.newCard.members.length; i++) {
            if (scope.newCard.members.length && scope.newCard.members[i].id === id) {
              return scope.newCard.members.splice(i, 1);
            }
          }
          return scope.newCard.members.push(scope.newMember);
        }

        var _hideFields = function() {
          scope.nameEditShowing = false;
          scope.descriptionEditShowing = false;
          scope.addMemberShowing = false;
          scope.newMember = '';
        }
      }
    }
  }])