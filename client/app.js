// create the houseworks app
angular.module("houseworks", [
	"houseworks.auth",
	"houseworks.lists",
	"houseworks.jobs",
	"houseworks.services",
	"ngRoute",
	"ui.bootstrap"
	//"angularMoment"
	])
//config/routing
.config(function($routeProvider, $httpProvider){
	$routeProvider
		.when('/signin', {
			templateUrl: 'auth/signin.html',
			controller: 'AuthController'
		})
		.when('/signup', {
			templateUrl: 'auth/signup.html',
			controller: 'AuthController'
		})
		.when('/logout', {
			templateUrl: 'auth/signin.html',
			controller: 'AuthController'
		})
		.when('/mylists', {
			templateUrl: 'lists/mylists.html',
			controller: 'ListsController',
			authenticate: true
		})
		.when('/createnewlist', {
			templateUrl: 'lists/createnewlist.html',
			controller: 'ListsController',
			authenticate: true
		})
		.when('/alllists', {
			templateUrl: 'lists/alllists.html',
			controller: 'ListsController',
			authenticate: true
		})
		.when('/myjobs', {
			templateUrl: 'jobs/myjobs.html',
			controller: 'JobsController',
			authenticate: true
		})
		.when('/listdetail/:listid',{
			templateUrl: 'lists/listdetail.html',
			controller: 'ListsController'
		})
		.otherwise({
			redirectTo: "/mylists"
		});
		$httpProvider.interceptors.push('AttachTokens');
})

// main app controller, not inside a ng-view, handles signout
.controller('AppController', function($scope, Auth, $rootScope){
	$rootScope.hasSession = Auth.isAuthenticated();
	$scope.signout = function(){
		Auth.signout();
	}
})

.factory('AttachTokens', function($window){
	// this is an $httpInterceptor
	// its job is to stop all out going request then look in local storage and find the users token
	// then add it to the header so the server can validate the request
	var attach = {
		request: function(object) {
			var jwt = $window.localStorage.getItem('houseworkstoken');
			if(jwt) {
				object.headers['x-access-token'] = jwt;
			}
			object.headers['Allow-Control-Allow-Origin'] = '*';
			return object;
		}
	}
	return attach;
})

// run directive
.run(function($rootScope, $location, Auth){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if(next.$$route && next.$$route.authenticate && !Auth.isAuthenticated()){
			$location.path('/signin');
		}
		$rootScope.hadSession = Auth.isAuthenticated();
	});
});