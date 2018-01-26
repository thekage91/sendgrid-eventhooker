var async = require('async');
var router = require('express').Router();
var Event = require('mongoose').models.Event;

var hook = {};

hook.emailEventsHook = function(req, res, next){
	var bodyEvents = req.body;

	async.eachLimit(bodyEvents, 100, function(emailEvent, done){
		var newEvent = new Event(emailEvent);

		newEvent.save(done);
	}, function(err){
		if (err) {
			return res.status(400).send(err);
		};

		return res.status(200).send({ message: "All events are been saved." });
	});
}


router.post('/email-events-hook', hook.emailEventsHook);

module.exports = router
