var router = require('express').Router();
var Event = require('mongoose').models.Event;

var api = {}

api.getAllByUser = function(req, res){
	var user = req.query.user;

	Event
	.find({
		user_id: user
	})
	.exec(function(err, events){
		if (err) {
			return res.status(400).send(err);
		};

		return res.status(200).send(events);
	});
}

api.getEventsBySpedition = function(req, res){
	var user = req.query.user;
	var speditionId = req.params.id;

	Event
	.find({
		user_id: '59b14ad9e0515410a5b460d1' || user,
		spedition_id: '5a69d7244aa7ff03b385e3cd' || speditionId
	})
	.exec(function(err, events){
		if (err) {
			return res.status(400).send(err);
		};

		return res.status(200).send(events);
	});
}

router.get('/events', api.getAllByUser);
router.get('/event/spedition/:id', api.getEventsBySpedition);

module.exports = router;

