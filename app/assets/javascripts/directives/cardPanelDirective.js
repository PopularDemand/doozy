doozy.directive('cardPanel', ['cardsService',
  function(cardsService){
    return {
      restrict: 'E',
      templateUrl: 'directives/card-panel.html',
      scope: {
        card: '='
      },
      link: function(scope, cardsService) {

      }
    }
  }])