travelApp.factory('PhotoFactory', function($http) {
	var all_photos = [];
	var my_photos = [];
	var factory = {};

	factory.allPhotos = function (callback) {
		$http.get('/photos.json').success(function (data) {
			all_photos = data;
			callback(all_photos);
		})
	}

	factory.addPhoto = function (info, callback) {
		$http.post('/photos/create', info).success(function (data) {
			all_photos.push(data);
			my_photos.push(data);
			var message = { success: 'Photo has been added!'}
			callback(message);
		})
	}

	factory.myPhotos = function (id, callback) {
		$http.get('/users/' + id).success(function (data) {
			my_photos = data.photos;
			callback(my_photos);
		})
	}

	factory.likePhoto = function (status, photo, user, callback) {
		var info = { _id: photo._id, user_id: user._id, like_status: status }
		$http.post('/photos/like', info).success(function (data) {
			if (status === true) {
				photo.likes++;
			}
			else {
				photo.likes--;
			}
			photo.like_status = status;
			callback(photo);
		})
	}

	return factory;
})