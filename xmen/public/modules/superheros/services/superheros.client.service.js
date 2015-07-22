'use strict';

//Superheros service used to communicate Superheros REST endpoints
angular.module('superheros').factory('Superheros', ['$resource',
	function($resource) {
		return $resource('superheros/:superheroId', { superheroId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);