var parsingDate = {};

(function($, window){
	
	function _parsingDate(timestamp){
		return moment(timestamp).format("DD/MM/YYYY");
	}

	parsingDate = _parsingDate;

})($, window)