var User = require('./../models/user');
var Photo = require('./../models/photo');
var Comment = require('./../models/comment');
var Tag = require('./../models/tag');

module.exports = (function() {
	return {
		index: function (req, res) {
			Photo.find({}, function (err, results) {
				res.json(results);
			})
		},

		show: function (req, res) {
			Photo.findOne({ _id: req.params.id })
				.populate('comments')
				.populate('tags')
				.exec(function (err, photo) {
					res.json(photo);
				})

		},

		create: function (req, res) {
			User.findOne({ _id: req.body._user }, function (err, user) {
				var photo = new Photo(req.body);
				photo.created_at = new Date();
				user.photos.push(photo._id);
				photo.save(function (err) {
					user.save(function (err) {
						res.json(photo);
					})
				})
			})
		},

		update: function (req, res) {
			Photo.findOne({ _id: req.body._id }, function (err, photo) {
				photo.title = req.body.title;
				photo.city = req.body.city;
				photo.country = req.body.country;
				photo.description = req.body.description;
				photo.save(function (err) {
					res.json(photo);
				})
			})
		},

		like: function (req, res) {
			Photo.update({ _id: req.body._id }, { $inc: { likes: 1 }}, function (err, results) {
				res.end()
			})
		},

		dislike: function (req, res) {
			Photo.update({ _id: req.body._id }, { $inc: { dislikes: 1 }}, function (err, results) {
				res.end()
			})
		},

		delete: function (req, res) {
			Photo.remove({ _id: req.body._id }, function (err, results) {
				res.end();
			})
		}
	}
})();