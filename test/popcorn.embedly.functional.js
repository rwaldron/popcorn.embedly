$(function() {

  var $pop = Popcorn("#video"), 
      rand = [];

  //  domains.js is sourced from: 
  //  https://gist.github.com/356104
  function domainUrls() {
    return $.ajax({
      url: "domains.js", 
      dataType: "json", 
      type: "get"
    });
  }

  $.when( domainUrls() ).then(function( data ) {

    var urls = data.urls;

    for( var i = 0; i < 10; i++ ) {
      rand.push( Math.floor( Math.random() * urls.length - 1 ) );
    }

    //console.log( rand );
    
    $.each( rand, function( i, idx ) {

      $pop.embedly({
        start: i + 1, 
        end: 24, 
        url: urls[ idx ]
      });
    });
  });
});
