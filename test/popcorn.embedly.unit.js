var junk = [];

module("API");
test("Popcorn.prototype.embedly()", function() {
  
  expect(2);
  
  ok( Popcorn.prototype.embedly, "Popcorn.transform exists" );
  
  equal( typeof Popcorn.prototype.embedly, "function", "Popcorn.transform() is a function" );
  
});


$(function() {

	var $pop = Popcorn("#video"), 
			rand = [], 
			tests = [],
			getUrl = function( url ) {
				var urlexp = /^http(s?):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
				return urlexp.test(url) ? url : null;
			};

	//	domains.js is sourced from: 
	//	https://gist.github.com/356104
	function domainUrls() {
		return $.ajax({
			url: "domains.js", 
			dataType: "json", 
			type: "get"
		});
	}

	$.when( domainUrls() ).then(function( data ) {

		var urls = data.urls;

		for( var i = 0; i < 20; i++ ) {
			rand.push( Math.floor( Math.random() * urls.length - 1 ) );
		}		


		//console.log( rand );
	
		$.each( rand, function( i, idx ) {

			var url = urls[ idx ];

			$pop.embedly({
				start: i + 1, 
				end: 24, 
				url: url, 
				css: {
					width: "50%",
					height: "50%"
				}
			}).exec( i + 2, function() {

				ok( $('[requested="'+ url +'"]').length, "Content from: " + url + " is currently playing" );
				plus();
				
			});

			tests.push( url );
		});


		var count = 0;
		
		function plus() {
			if ( ++count===tests.length) {
				start();
			}
		}


		module("Functional");
		test("Embed the world", function() {
			
			expect( tests.length );

			$(".popcorn-embedly").each( function( i ) {

				equal( $(this).attr("requested"), tests[i], "Requested: " + $(this).attr("requested") + " === " +  tests[i] );

			});
		});


		test("Playback with embedded content", function() {

			stop();
			
			expect( tests.length );

			$pop.play();
			
		});


	});

});

