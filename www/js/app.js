angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('enter', {
    url: '/enter',
    views: {
      'enter': {
        templateUrl: 'templates/enter.html',
        controller: 'EnterCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/enter');
});
