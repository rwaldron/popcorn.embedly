# Popcorn.embedly.js


Embed the hell out of anything!

1. Usage:


	```javascript
	var $pop = Popcorn( "#video-id" );

	$pop.embedly({
		start: 1, 
		end: 10, 
		url: "http://www.slideshare.net/BrendanEich/mozillas-nodeconf-talk",
		css: {
			// set style for the embedded content
		}
	});
	```



Unit Tests:
http://code.bocoup.com/popcorn.embedly/test/

Functional Demo (open and press play):
http://code.bocoup.com/popcorn.embedly/test/functional.html
