'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var superheros = require('../../app/controllers/superheros.server.controller');

	// Superheros Routes
	app.route('/superheros')
		.get(superheros.list)
		.post(users.requiresLogin, superheros.create);

	app.route('/superheros/:superheroId')
		.get(superheros.read)
		.put(users.requiresLogin, superheros.hasAuthorization, superheros.update)
		.delete(users.requiresLogin, superheros.hasAuthorization, superheros.delete);

	// Finish by binding the Superhero middleware
	app.param('superheroId', superheros.superheroByID);
};
