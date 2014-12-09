var mongoose = require('mongoose');
var Photo = require('./photo');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema ({
	name: String,
	admin: { type: Boolean, default: false },
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
	created_at: { type: Date, default: new Date }
});

module.exports = mongoose.model('User', UserSchema);