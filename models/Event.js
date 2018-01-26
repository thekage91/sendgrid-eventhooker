var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var fields = {
	ip: { type: String },
	sg_event_id: { type: String },
	sg_message_id: { type: String },
	useragent: { type: String },
	event: { type: String },
	email: { type: String },
	timestamp: { type: Number },
	user_id: { type: String },
	spedition_id: { type: String },
	category: [{ type: String }]
}

var eventSchema = new Schema(fields);

module.exports = mongoose.model('Event', eventSchema);