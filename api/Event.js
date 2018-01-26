var router = require('express').Router();
var Event = require('mongoose').models.Event;

var api = {}

api.getAllByUser = function(req, res){
	var user = req.user;

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

api.getEvent = function(req, res){
	var user = req.user;
	var speditionId = req.params.id;

	Event
	.find({
		user_id: user,
		spedition_id: speditionId
	})
	.exec(function(err, events){
		if (err) {
			return res.status(400).send(err);
		};

		return res.status(200).send(events);
	});
}

router.get('/events', api.getAllByUser);
router.get('/event/spedition/:id', api.getEvent);

module.exports = router;

