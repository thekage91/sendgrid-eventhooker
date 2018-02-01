var express = require('express');
var router = express.Router();
var Event = require('../models/Event.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	Event
	.aggregate([
		{ $match: { event: 'delivered' } },
		{ 
			$group: {
				_id: "$email",
				count: { $sum: 1 },
				
			}
		}, { $sort: { count: -1 }}
	])
	.exec(function(err, events){
		if (err) {
			return res.status(400).send(err);
		};

		res.render('index', { title: 'Sendgrid Eventhooker', events: events });
	})

});

router.get('/statistics/:email', function(req, res, next){
	var email = req.params.email;

	Event
	.find({ email: email })
	.exec(function(err, events){
		if (err) {
			return res.status(400).send(err);
		};

		events.forEach(function(event){
			event.date = new Date(event.timestamp * 1000);
		})

		res.render('stats', { title: 'Stats: ' + email, email: email, events: events, total_email: req.query.total_email });
	});
});

module.exports = router;
