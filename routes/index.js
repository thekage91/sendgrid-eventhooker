var express = require('express');
var router = express.Router();
var Event = require('../models/Event.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("Qui")
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

		console.log(events);
		res.render('index', { title: 'Express', events: events });
	})

});

module.exports = router;
