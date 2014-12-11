travelApp.controller('MainController', function ($scope, $location, UserFactory, PhotoFactory) {

	function mainPhoto() {
		var length = $scope.all_photos.length;
		var likes = 0;
		var main_photo = '';
		for (var i=0; i<length; i++) {
			if ($scope.all_photos[i].likes > likes) {
				likes = $scope.all_photos[i].likes;
				main_photo = $scope.all_photos[i].url_large;
			}
		}
		document.getElementById('a0').style.backgroundImage = "url(" + main_photo + ")";
	}

	function modal() {
		if (localStorage.current_photo !== JSON.stringify({}) && localStorage.current_photo) {
			$scope.current_photo = JSON.parse(localStorage.current_photo);

			if (localStorage.session !== JSON.stringify({}) && localStorage.session) {
				for (var i in $scope.current_user.like_photos) {
					if ($scope.current_user.like_photos[i] === $scope.current_photo._id) {
						$scope.current_photo.like_status = true;
					}
				}
			}
			document.getElementById('modal').style.backgroundImage = "url(" + $scope.current_photo.url_large + ")";
			document.getElementById('modal').className = 'open-modal';
			document.getElementById('modal').style.zIndex = 2000;
			document.getElementById('overlay').className = 'overlay';
		}		
	}

	PhotoFactory.allPhotos(function (output) {
		$scope.all_photos = output;
		mainPhoto();
		modal();
	})

	$scope.allPhotos = function() {
		localStorage.show = 'all';
		$scope.my_photos = $scope.all_photos;
	}

	$scope.myPhotos = function() {
		localStorage.show = 'my';
		PhotoFactory.myPhotos(id, function (output) {
			$scope.my_photos = output;
		})
	}

	if (localStorage.session !== JSON.stringify({}) && localStorage.session) {
		if (JSON.parse(localStorage.session).loggedIn === true) {
			console.log(JSON.parse(localStorage.session));
			$scope.current_user = JSON.parse(localStorage.session).user;
			var id = $scope.current_user._id;
			if (localStorage.show && localStorage.show === 'all') {
				PhotoFactory.allPhotos(function (output) {
					$scope.my_photos = output;
				})
			}
			else {
				console.log('my');
				PhotoFactory.myPhotos(id, function (output) {
					$scope.my_photos = output;
				})
			}
		}
	}

	$scope.login = function() {
		UserFactory.login($scope.new_user, function (output) {
			localStorage.session = JSON.stringify(output);
			localStorage.show = 'my';
			$location.path('/dashboard');
		})
	}

	$scope.logout = function() {
		UserFactory.logout(function() {
			localStorage.session = JSON.stringify({});
			$location.path('/');
		})
	}

	$scope.addPhoto = function (id) {
		$scope.new_photo._user = id;
		$scope.new_photo.url_large = "angular/public/images/large/" + $scope.new_photo.url;
		$scope.new_photo.url = "angular/public/images/" + $scope.new_photo.url;
		PhotoFactory.addPhoto($scope.new_photo, function (output) {
			$scope.new_photo = {};
			$scope.message = output;
		});
	}

	$scope.like = function (status) {
		console.log(status);
		PhotoFactory.likePhoto(status, $scope.current_photo, $scope.current_user, function (output) {
			localStorage.current_photo = JSON.stringify(output);
			var session = {};
			session.user = $scope.current_user;
			session.loggedIn = true;
			if (status === true) {
				session.user.like_photos.push($scope.current_photo._id);
			}
			else {
				console.log($scope.current_photo._id);
				for (var i=0; i<session.user.like_photos.length; i++) {
					console.log(session.user.like_photos[i]);
					if (session.user.like_photos[i] === $scope.current_photo._id) {
						console.log('remove');
						session.user.like_photos[i] = session.user.like_photos[session.user.like_photos.length-1];
						session.user.like_photos.pop();
						i--;
					}
				}
			}
			localStorage.session = JSON.stringify(session);
		})
	}

	$scope.dislike = function (photo_id, user_id) {
		console.log('dislike');
	}

	$scope.toggleNav = function() {
		var wrapper = document.getElementById('wrapper');
		if (wrapper.className === 'show-nav') {
			wrapper.className = '';
		}
		else {
			wrapper.className = 'show-nav';	
		}
	}

	$scope.expand = function() {
		var login = document.getElementById('login');
		if (login.className === 'link tall') {
			login.className = 'link';
			document.getElementById('form').className = 'hide';
		}
		else {
			login.className = 'link tall';	
			document.getElementById('form').className = '';
		}
	}

	$scope.expand2 = function() {
		var add = document.getElementById('add-photo');
		if (add.className === 'link tall2') {
			add.className = 'link';
			document.getElementById('form').className = 'hide';
		}
		else {
			add.className = 'link tall2';	
			document.getElementById('form').className = '';
		}
	}

	$scope.openModal = function(photo) {
		photo.like_status = false;
		localStorage.current_photo = JSON.stringify(photo);
		modal();
	}

	$scope.closeModal = function() {
		localStorage.current_photo = JSON.stringify({});
		document.getElementById('modal').className ='close-modal';
		document.getElementById('overlay').className = '';
		setTimeout(function() {
			document.getElementById('modal').style.zIndex = -2000;
		},500)
	}

})