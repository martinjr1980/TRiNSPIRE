travelApp.controller('CarouselController', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function(num) {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: "./angular/public/images/large/" + num + ".jpg",
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=1; i<=4; i++) {
    $scope.addSlide(i);
  }
});
