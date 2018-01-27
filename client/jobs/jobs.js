angular.module("houseworks.jobs",[])

.controller("JobsController", function($scope, Jobs, Lists, $window, $location){
	$scope.data= {};

	$scope.userid = $window.localStorage.getItem('houseworksuser');

	// get all jobs user took
	// populate myjobs view
	$scope.getJobs = function() {
		Jobs.getJobs($scope.userid)
			.then(function(jobs){
				$scope.data.jobs = jobs;
			})
			.catch(function(error){
				console.log('ERROR: ', error);
			})
	}

	$scope.deleteJob = function() {
		list.deliverer_id = '';
		Lists.updateList(list)
			.then(function(){
				$scope.getJobs();
				if($scope.data.jobs.length === 1) {
					$location.path('/alllists');
				}
			})
			.catch(function(error){
				console.log(error);
			});
	}

	// Initialize Get Jobs Once
	$scope.getJobs();
});