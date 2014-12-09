var mongoose = require('mongoose');
var User = require('./user');
var Photo = require('./photo');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema ({
	_user: {type: Schema.ObjectId, ref: 'User'},
	_photo: {type: Schema.ObjectId, ref: 'Photo'},
	comment: String,
	created_at: { type: Date, default: new Date }
});

module.exports = mongoose.model('Comment', CommentSchema);