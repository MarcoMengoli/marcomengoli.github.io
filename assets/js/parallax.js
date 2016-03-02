function isScrolledIntoView(elem)
{
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

	var ret = ((elemTop > docViewBottom))
	return !ret;
    //return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function setJumbotronHeight()
{
	var textHeight = $('div[id="page-title"]').height();
	var socialBar = $('div[id="social-bar"]').height();
	var goDown = $('div[id="go-down"]').height();

    var padding_tb = ($window.height() - textHeight - socialBar - goDown)// / 2 + 1;
    $('div[id="page-title"]').css({ paddingTop: padding_tb*0.40 });
    $('div[id="page-title"]').css({ paddingBottom: padding_tb*0.60 });
}

$(document).ready(function()
{
   // cache the window object
	   $window = $(window);
     var scrollTime = 1.0;
     var scrollDistance = 170;

	   setJumbotronHeight();
	   window.onresize = function(event)
	   {
	   		setJumbotronHeight();
	   };

     $window.on("mousewheel DOMMouseScroll", function(event){

      		event.preventDefault();

      		var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
      		var scrollTop = $window.scrollTop();
      		var finalScroll = scrollTop - parseInt(delta*scrollDistance);

      		TweenMax.to($window, scrollTime, {
      			scrollTo : { y: finalScroll, autoKill:true },
      				ease: Power1.easeOut,
      				overwrite: 5
      			});

      	});

	   $('div[data-type="background"]').each(function()
	   {
			 // declare the variable to affect the defined data-type
			 var $element_scrolls = $(this);

			 var $offset = '50% -' +  $element_scrolls.data('offset') + 'px';
			 $element_scrolls.css({ backgroundPosition: $offset });

			 $(window).scroll(function()
			 {
				// HTML5 proves useful for helping with creating JS functions!
				// also, negative value because we're scrolling upwards

				var res = isScrolledIntoView($element_scrolls);
				if ( res == true )
				{
					var yPos = -(($window.scrollTop() - $element_scrolls.offset().top )/ $element_scrolls.data('speed') + $element_scrolls.data('offset'));

					// background position
					var coords = '50% '+ yPos + 'px';

					// move the background
					$element_scrolls.css({ backgroundPosition: coords });
				 }
			  }); // end window scroll
	   });  // end section function
	}); // close out script

/* Create HTML5 element for IE */
document.createElement("section");
