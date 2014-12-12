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
			if (req.body.like_status === true) {
				User.findOne({ _id: req.body.user_id }, function (err, user) {
					user.like_photos.push(req.body._id);
					Photo.update({ _id: req.body._id }, { $inc: { likes: 1 }}, function (err, results) {
						user.save(function (err) {
							res.end()
						})
					})
				})	
			}
			else {
				User.findOne({ _id: req.body.user_id }, function (err, user) {
					for (var j=0; j<user.like_photos.length; j++) {
						if (user.like_photos[j] == req.body._id) {
							user.like_photos[j] = user.like_photos[user.like_photos.length-1];
							user.like_photos.pop();
							j--;
						}
					}
					Photo.update({ _id: req.body._id }, { $inc: { likes: -1 }}, function (err, results) {
						user.save(function (err) {
							res.end()
						})
					})
				})
			}
		},

		delete: function (req, res) {
			Photo.remove({ _id: req.body._id }, function (err, results) {
				res.end();
			})
		}
	}
})();