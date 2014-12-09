var mongoose = require('mongoose');
var Photo = require('./photo');
var Schema = mongoose.Schema;

var TagSchema = new mongoose.Schema ({
	name: String,
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
	created_at: { type: Date, default: new Date }
});

module.exports = mongoose.model('Tag', TagSchema);