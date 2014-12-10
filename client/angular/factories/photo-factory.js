travelApp.factory('PhotoFactory', function($http) {
	var photos = [];
	var factory = {};

	factory.addPhoto = function (info, callback) {
		$http.post('/photos/create', info).success(function (data) {
			photos.push(data);
			var message = { success: 'Photo has been added!'}
			callback(message);
		})
	}

	return factory;
})