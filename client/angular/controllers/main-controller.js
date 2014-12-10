travelApp.controller('MainController', function ($scope, $location, UserFactory, PhotoFactory) {
	var carousel = [];
	function addBackgroundImages() {
		for (var i=1; i<=5; i++) {
			var src = "./angular/public/images/large/" + i + ".jpg";
			carousel.push({ image: src });
		}
	}
	addBackgroundImages();
	$scope.carousel = carousel;
	$scope.number = 1;
	document.getElementById('a0').style.backgroundImage="url(" + $scope.carousel[3].image + ")";

	function showImages() {
		var html='';
		for (var i=1; i<=100; i++) {
			html += "<img src='./angular/public/images/" + i + ".jpg'>";
		}
		document.getElementById('content').innerHTML = html;
	}
	showImages();

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

	if (localStorage.session !== JSON.stringify({}) && localStorage.session) {
		if (JSON.parse(localStorage.session).loggedIn === true) {
			$scope.current_user = JSON.parse(localStorage.session).user;

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

	$scope.addPhoto = function(id) {
		$scope.new_photo._user = id;
		PhotoFactory.addPhoto($scope.new_photo, function (output) {
			$scope.new_photo = {};
			$scope.message = output;
		});
		
	}

})