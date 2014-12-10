travelApp.factory('UserFactory', function($http) {
	var session = {};
	var factory = {};

	factory.login = function (info, callback) {
		$http.post('/users/create', info).success(function (data) {
			session.user = data;
			session.loggedIn = true;
			callback(session);
		})
	}

	factory.logout = function (callback) {
		session = {};
		callback();
	}

	return factory;
})