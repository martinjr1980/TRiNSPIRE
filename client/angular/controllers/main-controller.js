travelApp.controller('MainController', function ($scope, $location, UserFactory, PhotoFactory) {

	function mainPhoto() {
		var length = $scope.all_photos.length;
		var main_photo = $scope.all_photos[length-1].url_large;
		document.getElementById('a0').style.backgroundImage="url(" + main_photo + ")";
	}

	PhotoFactory.allPhotos(function (output) {
		$scope.all_photos = output;
		mainPhoto();
	})

	if (localStorage.session !== JSON.stringify({}) && localStorage.session) {
		if (JSON.parse(localStorage.session).loggedIn === true) {
			$scope.current_user = JSON.parse(localStorage.session).user;

			var id = $scope.current_user._id;
			PhotoFactory.myPhotos(id, function (output) {
				$scope.my_photos = output;
			})
		}
	}

	$scope.login = function() {
		UserFactory.login($scope.new_user, function (output) {
			localStorage.session = JSON.stringify(output);
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
		if (login.className === 'tall') {
			login.className = '';
			document.getElementById('form').className = 'hide';
		}
		else {
			login.className = 'tall';	
			document.getElementById('form').className = '';
		}
	}

	$scope.expand2 = function() {
		var add = document.getElementById('add-photo');
		if (add.className === 'tall2') {
			add.className = '';
			document.getElementById('form').className = 'hide';
		}
		else {
			add.className = 'tall2';	
			document.getElementById('form').className = '';
		}
	}

})