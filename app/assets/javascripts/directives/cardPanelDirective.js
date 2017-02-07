doozy.directive('cardPanel', ['cardsService', '$timeout',
  function(cardsService, $timeout){
    return {
      restrict: 'E',
      templateUrl: 'directives/card-panel.html',
      scope: {
        card: '='
      },
      link: function(scope, element) {
        scope.nameEditShowing = false;
        scope.descriptionEditShowing = false;
        scope.addMemberShowing = false;
        scope.newCard = angular.copy(scope.card, {});
        scope.showDescription = false;

        // element.click(function() {
        //   _toggleDescription();
        // });
        // element.on('mouseout', _toggleDescription);


        scope.toggleCardCompletion = function() {
          if (scope.card.completed) {
            scope.newCard.completed = null;
          } else {
            scope.newCard.completed = new Date();
          }
          scope.processCardUpdate();
        }

        scope.showNameEdit = function() {
          _toggleNameEdit();
          $timeout(function() {
            _focusInput('#name-input');
          })
        }


        scope.showDescriptionEdit = function() {
          _toggleDescriptionEdit();
          $timeout(function() {
            _focusInput('#desc-input');
          })
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
          scope.newCard.relevant_member = memberId;
          scope.processCardUpdate();
        }

        var _addOrRemoveMember = function(id) {
          for (var i = 0; i < scope.newCard.members.length; i++) {
            if (scope.newCard.members.length && scope.newCard.members[i].id === id) {
              scope.newCard.members.splice(i, 1);
              return;
            }
          }
          scope.newCard.members.push(scope.newMember);
        }

        var _toggleNameEdit = function() {
          scope.nameEditShowing = !scope.nameEditShowing;
        }

        var _toggleDescriptionEdit = function() {
          scope.descriptionEditShowing = !scope.descriptionEditShowing;
        }

        var _focusInput = function(selector) {
          angular.element(selector).focus();
        }

        var _hideFields = function() {
          scope.nameEditShowing = false;
          scope.descriptionEditShowing = false;
          scope.addMemberShowing = false;
          scope.newMember = '';
        }

        // scope.toggleDescription = function() {
        //   console.log(scope.showDescription)
        //   scope.showDescription = !scope.showDescription;
        // }
      }
    }
  }])