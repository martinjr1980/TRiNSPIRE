var mongoose = require('mongoose');
var User = require('./user');
var Comment = require('./comment');
var Tag = require('./tag');
var Schema = mongoose.Schema;

var PhotoSchema = new mongoose.Schema ({
	_user: {type: Schema.ObjectId, ref: 'User'},
	title: String,
	url: String,
	url_large: String,
	city: String,
	country: String,
	description: String,
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	created_at: Date
});

module.exports = mongoose.model('Photo', PhotoSchema);