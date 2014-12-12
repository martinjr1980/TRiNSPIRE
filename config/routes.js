var users = require('./../server/controllers/users.js');
var photos = require('./../server/controllers/photos.js');
// var comments = require('./../server/controllers/comments.js');
// var tags = require('./../server/controllers/tags.js');

// These routes are all going to return JSON data to the angular front end
module.exports = function (app) {

	app.get('/users.json', function (req, res) {
		users.index(req, res);
	})

	app.get('/users/:id', function (req, res) {
		users.show(req, res);
	})

	app.post('/users/create', function (req, res) {
		users.create(req, res);
	})


	app.get('/photos.json', function (req, res) {
		photos.index(req, res);
	})

	app.get('/photos/:id', function (req, res) {
		photos.show(req, res);
	})

	app.post('/photos/create', function (req, res) {
		photos.create(req, res);
	})

	app.post('/photos/update', function (req, res) {
		photos.update(req, res);
	})

	app.post('/photos/like', function (req, res) {
		photos.like(req, res);
	})

	app.post('/photos/delete', function (req, res) {
		photos.delete(req, res);
	})


	// app.post('/comments/create', function (req, res) {
	// 	comments.create(req, res);
	// })

	// app.post('/comments/delete', function (req, res) {
	// 	comments.delete(req, res);
	// })


	// app.post('/tags/create', function (req, res) {
	// 	tags.create(req, res);
	// })

	// app.post('/tags/delete', function (req, res) {
	// 	tags.delete(req, res);
	// })
}
