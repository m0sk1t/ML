angular.module('starter.controllers', [])
.controller('EnterCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $location, $cordovaInAppBrowser, Options) {
	$scope.showAlert = function(hdr, msg) {
		var alertPopup = $ionicPopup.alert({
			title: hdr,
			template: msg
		});
	};
	$scope.show = function() {
		$ionicLoading.show({
			template: 'Подключаемся к РИЦ №'+$scope.opt.ric+'...'
		});
	};
	$scope.hide = function() {
		$ionicLoading.hide();
	};
	if (Options.getOpt()){
		$scope.hide();
		$scope.opt = Options.getOpt();
		$http.post('http://' + $scope.opt.name + ':' + $scope.opt.port, {
			ric: $scope.opt.ric,
			login: $scope.opt.login,
			password: $scope.opt.password
		}).then(function(){
			$cordovaInAppBrowser.open('http://' + $scope.opt.name + ':' + $scope.opt.port, '_blank', {
				toolbar: 'no',
				location: 'no',
				clearcache: 'no'
			}).then(function(ev){}, function(ev){});
		},function(err){
			$scope.hide();
			$scope.showAlert('Ошибка при входе!', 'Сервер ответил: '+err.data+'.');
		});
	} else {
		$scope.opt = {};
	}
	$scope.enter = function() {
		switch (false) {
			case Boolean($scope.opt.login):
				$scope.showAlert('Упс...', 'Не задан логин!');
				break;
			case Boolean($scope.opt.ric):
				$scope.showAlert('Упс...', 'Не задан РИЦ!');
				break;
			default: {
				$scope.show();
				$http.get('http://oeweb.oe-it.ru/lookupric/' + $scope.opt.ric).then(function(r) {
					$http.post('http://' + r.data[0].name + ':' + r.data[0].port,{
							ric: $scope.opt.ric,
							login: $scope.opt.login,
							password: $scope.opt.password
						}).then(function(res) {
						$scope.opt.name = r.data[0].name;
						$scope.opt.port = r.data[0].port;
						Options.setOpt($scope.opt);
						$cordovaInAppBrowser.open('http://' + $scope.opt.name + ':' + $scope.opt.port, '_blank', {
							toolbar: 'no',
							location: 'no',
							clearcache: 'no'
						}).then(function(ev){}, function(ev){});
						$scope.hide();
					}, function(err) {
						$scope.hide();
						$scope.showAlert('Ошибка при входе!', 'Сервер ответил: '+err.data+'.');
					});
				}, function(err) {
					$scope.showAlert('Ошибка при поиске РИЦ!', 'Сервер ответил: '+err.data.code+'. РИЦ №'+$scope.opt.ric+' не найден.');
					$scope.hide();
				});
			}; break;
		}
	}
});
