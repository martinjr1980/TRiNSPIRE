var User = require('./../models/user');
var Photo = require('./../models/photo');

module.exports = (function() {
	return {
		index: function (req, res) {
			User.find({}, function (err, results) {
				res.json(results);
			})
		},

		create: function (req, res) {
			User.findOne({ name: req.body.name }, function (err, user) {
				if (user === null) {
					user = new User(req.body);
					user.created_at = new Date();
					user.save(function (err) {
						res.json(user);
					})
				}
				else {
					res.json(user);
				}
			})
		},

		show: function (req, res) {
			User.findOne({ _id: req.params.id })
				.populate('photos')
				.exec(function (err, user) {
					res.json(user);
				})
		}
	}
})();