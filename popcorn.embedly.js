/*!
 * Popcorn.prototype.embedly()
 *
 * Copyright 2011, Rick Waldron
 * MIT License
 *
 */

// Requires Popcorn.js
(function( global, Popcorn ) {

	var 
	// Localize global references
	doc = global.document,

	// From Embed.ly API
	getUrl = function( url ) {
		var urlexp = /^http(s?):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		return urlexp.test(url) ? url : null;
	};

	Popcorn.plugin( "embedly", {

		manifest: {
			about:{
				name: "Popcorn Embedly Plugin",
				version: "0.1",
				author: "@rwaldron",
				website: "http://github.com/rwldrn"
			},
			options: {
				start: { elem: "input", type: "text", label:"In" },
				end: { elem: "input", type: "text", label:"Out" },
				url: { elem: "input", type: "text", label:"Text" }
			}
		},
		_setup: function( options ) {

			var parentTo, container, requestUrl;

			// Create html container element
			container = doc.createElement( "div" );
			container.innerHTML = options.text;
			container.setAttribute("class", "popcorn-embedly");

			// Create unique target ids if none was passed
			if ( !options.target ) {
				options.target = Popcorn.guid("__embedly");
			}

			// Find the provided container by name or use the media node parent
			parentTo = doc.getElementById( options.target ) || 
									this.media.parentNode;

			// Append the new container element
			parentTo.appendChild( container );

			// Store display type (could be inline, block, inline-block)
			options._defaultDisplay = container.style.display;
			
			// Hide container until start fires
			container.style.display = "none";

			if ( options.url ) {

				requestUrl = encodeURIComponent( getUrl( options.url ) );

				if ( !requestUrl ) {
					Popcorn.error("Invalid url");
				}
				
				Popcorn.getJSONP( "http://api.embed.ly/1/oembed?url=" + requestUrl + "&format=json&callback=embedly", function( data ) {

					// In the case of images, raw src url is provided
					if ( typeof data.html === "undefined" ) {
						data.html = '<img src="' + data.url + '" width="' + data.width + '" height="' + data.height + '">';
					}

					// Store the requested url for test comparisons
					data.requested = options.url;

					// Set the embeddable content
					container.innerHTML = data.html;

					// Copy properties to container element
					Popcorn.forEach( data, function( val, key ) {
						if ( key !== "html" ) {
							container.setAttribute( key, val );
						}
					});

					// Apply styles
					if ( options.css ) {
						// this might be a bit brutish
						Popcorn.extend( 
							container.firstChild.style, 
							options.css 
						);
					}

				});
			}

			options._container = container;
		},
		start: function( event, options ) {
			options._container.style.display = options._defaultDisplay;
		},
		end: function( event, options ) {
			options._container.style.display = "none";
		}
	});

})( this, Popcorn );

