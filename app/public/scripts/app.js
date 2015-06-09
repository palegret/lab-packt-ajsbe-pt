+function (window, angular) {
	'use strict';
	
	window.sevenMinuteWorkout = angular.module('7MinuteWorkout', []);
	window.workoutBuilder = angular.module('WorkoutBuilder', []);

	var _app = angular.module('app', [
		'ngRoute', 
		'ngSanitize', 
		'ngAnimate', 
		'ui.bootstrap', 
		'mediaPlayer', 
		'LocalStorageModule',
		'7MinuteWorkout',
		'WorkoutBuilder'
	]);

	_app.config(function ($routeProvider, $sceDelegateProvider) {
	    var VIEW_ROOT = 'content/views/',
	    	PARTIALS_ROOT = 'content/partials/';
	    
		$routeProvider.when('/start', {
			templateUrl: VIEW_ROOT + 'start.html'
		});

		$routeProvider.when('/workout', {
			templateUrl: VIEW_ROOT + 'workout.html',
			controller: 'WorkoutController'
		});

		$routeProvider.when('/finish', {
			templateUrl: VIEW_ROOT + 'finish.html'
		});

		$routeProvider.when('/builder', {
			redirectTo: '/builder/workouts'
		});

		$routeProvider.when('/builder/workouts', {
			templateUrl: VIEW_ROOT + 'workout-builder/workouts.html',
			leftNav: PARTIALS_ROOT + 'left-nav-main.html',
			topNav: PARTIALS_ROOT + 'top-nav.html',
			controller: 'WorkoutListController'
		});

		$routeProvider.when('/builder/exercises', {
			templateUrl: VIEW_ROOT + 'workout-builder/exercises.html',
			leftNav: PARTIALS_ROOT + 'left-nav-main.html',
			topNav: PARTIALS_ROOT + 'top-nav.html',
			controller: 'ExerciseListController'
		});

		$routeProvider.when('/builder/workouts/new', {
			templateUrl: VIEW_ROOT + 'workout-builder/workouts.html',
			leftNav: PARTIALS_ROOT + 'left-nav-exercises.html',
			topNav: PARTIALS_ROOT + 'top-nav.html',
			controller: 'WorkoutDetailController',
			resolve: {
				selectedWorkout: ['WorkoutBuilderService', function (WorkoutBuilderService) {
					return WorkoutBuilderService.startBuilding();
				}],
			}
		});
		
		$routeProvider.when('/builder/workouts/:id', {
			templateUrl: VIEW_ROOT + 'workout-builder/workout.html',
			leftNav: PARTIALS_ROOT + 'left-nav-exercises.html',
			topNav: PARTIALS_ROOT + 'top-nav.html',
	        controller: 'WorkoutDetailController',
	        resolve: {
	            selectedWorkout: ['WorkoutBuilderService', '$route', '$location', function (WorkoutBuilderService, $route, $location) {
	                var workout = WorkoutBuilderService.startBuilding($route.current.params.id);
	                
	                // If the workout not found, redirect to workout list
	                if (!workout)
	                    $location.path('/builder/workouts');    

	                return workout;
	            }]
	        }
		});

	    $routeProvider.when('/builder/exercises/new', { 
			templateUrl: VIEW_ROOT + 'workout-builder/exercises.html'
	    });
	    
	    $routeProvider.when('/builder/exercises/:id', { 
			templateUrl: VIEW_ROOT + 'workout-builder/exercise.html'
	    });

		$routeProvider.otherwise({
			redirectTo: '/start'
		}); 

		$sceDelegateProvider.resourceUrlWhitelist([
			'self', // Allow same origin resource loads.
			'http://*.youtube.com/**',
			'https://*.youtube.com/**'
		]);
	});
	
	window.app = _app;
}(this, this.angular);
