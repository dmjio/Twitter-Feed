(function($){

   $.NS = {
      data : [], 
      users : [ 
					"narrativesci",
					"whisperspace",
					"larryadams",
					"stuartfrankel",
					"nickbeil" 
				],
		getUrl : function(user) {
			return "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=" + user + "&count=15";
		},

   };

   var $ns = $.NS;
	
	var ajaxCall = function(user, cb) {
		$.ajax({
		    url : $ns.getUrl(user),
		    dataType : 'jsonp',
		    type : 'GET',
		    processData: false,
		    success : function(data) {
		     	cb(data);		      
		    },
		    error : function(e) {
		    	cb();
		      console.log(e, "error retrieving tweets for: " + user);
		    }
		  });
	}

	var allCalls = function(cb) {
		$ns.data = [];
		$.each($ns.users, function(i, val){
			ajaxCall(val, cb);
		});
		console.log("tweets", $ns.data);
	}

	//export ajax calls out to our NS object
	if ($ns.makeCalls === undefined) {
			$ns.makeCalls = allCalls;
		};


})(jQuery);