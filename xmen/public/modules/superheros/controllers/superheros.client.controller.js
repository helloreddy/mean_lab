'use strict';

// Superheros controller
angular.module('superheros').controller('SuperherosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Superheros',
	function($scope, $stateParams, $location, Authentication, Superheros) {
		$scope.authentication = Authentication;

		// Create new Superhero
		$scope.create = function() {
			// Create new Superhero object
			var superhero = new Superheros ({
				name: this.name
			});

			// Redirect after save
			superhero.$save(function(response) {
				$location.path('superheros/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Superhero
		$scope.remove = function(superhero) {
			if ( superhero ) { 
				superhero.$remove();

				for (var i in $scope.superheros) {
					if ($scope.superheros [i] === superhero) {
						$scope.superheros.splice(i, 1);
					}
				}
			} else {
				$scope.superhero.$remove(function() {
					$location.path('superheros');
				});
			}
		};

		// Update existing Superhero
		$scope.update = function() {
			var superhero = $scope.superhero;

			superhero.$update(function() {
				$location.path('superheros/' + superhero._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Superheros
		$scope.find = function() {
			$scope.superheros = Superheros.query();
		};

		// Find existing Superhero
		$scope.findOne = function() {
			$scope.superhero = Superheros.get({ 
				superheroId: $stateParams.superheroId
			});
		};
	}
]);