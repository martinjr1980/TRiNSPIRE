travelApp.controller('MainController', function ($scope, $location, UserFactory, PhotoFactory) {
	// $scope.my_photos = [];
	// $scope.all_photos = [];
	// $scope.current_photo = {};

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

	function getCities(my_photos) {
		var cities = [];
		for (var i=0; i<my_photos.length; i++) {
			cities.push(my_photos[i].city);
		}
		for (var i=0; i<cities.length-1; i++) {
			for (var j=i+1; j< cities.length; j++) {
				if (cities[i] === cities[j]) {
					cities[j] = cities[cities.length-1];
					cities.pop();
					j--;
				}
			}
		}
		return cities;
	}

	function getCountries(my_photos) {
		var countries = [];
		for (var i=0; i<my_photos.length; i++) {
			countries.push(my_photos[i].country);
		}
		for (var i=0; i<countries.length-1; i++) {
			for (var j=i+1; j< countries.length; j++) {
				if (countries[i] === countries[j]) {
					countries[j] = countries[countries.length-1];
					countries.pop();
					j--;
				}
			}
		}
		return countries;
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
			var cities = getCities($scope.my_photos);
			var countries = getCountries($scope.my_photos);
			$scope.all_cities = cities;
			$scope.all_countries = countries;
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
					var cities = getCities($scope.my_photos);
					var countries = getCountries($scope.my_photos);
					$scope.all_cities = cities;
					$scope.all_countries = countries;
				})
			}
			else {
				console.log('my');
				PhotoFactory.myPhotos(id, function (output) {
					$scope.my_photos = output;
					var cities = getCities($scope.my_photos);
					var countries = getCountries($scope.my_photos);
					$scope.all_cities = cities;
					$scope.all_countries = countries;
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

	$scope.expand3 = function() {
		var show = document.getElementById('show-filter');
		if (show.className === 'link tall') {
			show.className = 'link';
			document.getElementById('filter').className = 'hide';
		}
		else {
			show.className = 'link tall';	
			document.getElementById('filter').className = '';
		}
	}

	$scope.openModal = function(photo) {
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

	$scope.nextPic = function() {
		for (var i=0; i<$scope.my_photos.length; i++) {
			if ($scope.my_photos[i]._id === $scope.current_photo._id) {
				console.log(i);
				if (i === $scope.my_photos.length-1) {
					localStorage.current_photo = JSON.stringify($scope.my_photos[0]);
				}
				else {
					localStorage.current_photo = JSON.stringify($scope.my_photos[i+1]);
				}
			}
		}
		modal();
	}

	$scope.prevPic = function() {
		for (var i=0; i<$scope.my_photos.length; i++) {
			if ($scope.my_photos[i]._id === $scope.current_photo._id) {
				if (i === 0) {
					localStorage.current_photo = JSON.stringify($scope.my_photos[$scope.my_photos.length-1]);
				}
				else {
					localStorage.current_photo = JSON.stringify($scope.my_photos[i-1]);
				}
			}
		}
		modal();
	}

	$scope.nextPicAll = function() {
		for (var i=0; i<$scope.all_photos.length; i++) {
			if ($scope.all_photos[i]._id === $scope.current_photo._id) {
				console.log(i);
				if (i === $scope.all_photos.length-1) {
					localStorage.current_photo = JSON.stringify($scope.all_photos[0]);
				}
				else {
					localStorage.current_photo = JSON.stringify($scope.all_photos[i+1]);
				}
			}
		}
		modal();
	}

	$scope.prevPicAll = function() {
		for (var i=0; i<$scope.all_photos.length; i++) {
			if ($scope.all_photos[i]._id === $scope.current_photo._id) {
				if (i === 0) {
					localStorage.current_photo = JSON.stringify($scope.all_photos[$scope.all_photos.length-1]);
				}
				else {
					localStorage.current_photo = JSON.stringify($scope.all_photos[i-1]);
				}
			}
		}
		modal();
	}

})