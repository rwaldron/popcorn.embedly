# Popcorn.embedly.js


Embed the hell out of anything!

1. Usage:


	```javascript
	var $pop = Popcorn( "#video-id" );

	$pop.embedly({

		// Start-time, in seconds. Required.
		start: 1, 

		// End-time, in seconds. Required.
		end: 10, 

		// Url to contenxt. Required.
		url: "http://www.slideshare.net/BrendanEich/mozillas-nodeconf-talk",

		// Style properties to apply to container. Optional.
		css: {
			// set style for the embedded content
		},

		// HTML Element Target. Optional.
		target: "embed-placeholder"
	});
	```



Unit Tests:
http://code.bocoup.com/popcorn.embedly/test/

Functional Demo (open and press play):
http://code.bocoup.com/popcorn.embedly/test/functional.html
