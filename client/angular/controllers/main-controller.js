travelApp.controller('MainController', function ($scope, $location) {
	function showBackground() {
		var num = Math.ceil(Math.random()*100);
		document.getElementById('a0').style.backgroundImage="url('./angular/public/images/large/" + num + ".jpg')";
	}

	function showImages() {
		var html='';
		for (var i=1; i<=100; i++) {
			html += "<img src='./angular/public/images/" + i + ".jpg'>";
		}
		document.getElementById('content').innerHTML = html;
	}

	showBackground();
	showImages();
})