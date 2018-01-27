angular.module('houseworks.auth', [])//make an auth module
.controller('AuthController', function($scope,$window,$location,Auth){
	$scope.signin = function() {
		Auth.signin($scope.user)
			.then(function(data){
				console.log(data.address);
				//Save token, user_id and address to local storage
				$window.localStorage.setItem('houseworkstoken', data.token)
				$window.localStorage.setItem('houseworksuser', data.userid);
				$window.localStorage.setItem('houseworksstreet', data.street);
				$window.localStorage.setItem('houseworkscity', data.city);
				$window.localStorage.setItem('houseworksstate', data.state);
				$window.localStorage.setItem('houseworkszip', data.zip_code);
				$location.path('/mylists');
			})
			.catch(function(error){
				console.error(error);
			});
	};
	$scope.signup = function(){
		Auth.signup($scope.user)
		.then(function(data){
			$window.localStorage.setItem('houseworkstoken', data.token);
			//saving username to local storage
			$window.localStorage.setItem('houseworksuer', data.userid);
			$location.path('/mylists');
		})
		.catch(function(error){
			console.error(error);
		});
	};
});