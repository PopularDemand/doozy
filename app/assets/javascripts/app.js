var doozy = angular.module('doozy', ['restangular', 'ui.router', 'Devise']);

doozy.config(['RestangularProvider',
  function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
  }]
)

doozy.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/boards');

  $stateProvider
    .state('index', {
      url: '/boards',
      controller: 'BoardsIndexCtrl',
      templateUrl: '/templates/boards/index.html',
      resolve: {
        boards: ['boardsService', function(boardsService) {
          return boardsService.getBoards();
        }]
      }
    })
    .state('show', {
      url: '/boards/:id',
      controller: 'BoardsShowCtrl',
      templateUrl: '/templates/boards/show.html',
      resolve: {
        board: ['boardsService', '$stateParams', function(boardsService, $stateParams) {
          return boardsService.getBoard($stateParams.id);
        }],
        lists: ['listsService', '$stateParams', function(listsService, $stateParams) {
          return listsService.getListsFromBoard($stateParams.id);
        }],
        cards: ['lists', 'cardsService', function(lists, cardsService) {
          return cardsService.getCardsFromLists(lists);
        }]
      }
    })
}])
