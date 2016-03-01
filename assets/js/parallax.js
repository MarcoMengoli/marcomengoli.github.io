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
    
    var padding_tb = ($window.height() - textHeight - socialBar )// / 2 + 1;
    $('div[id="page-title"]').css({ paddingTop: padding_tb*0.40 });
    $('div[id="page-title"]').css({ paddingBottom: padding_tb*0.60 });
}

$('body').scrollspy({ target: '#my-navbar' })
 
    $(".navbar-collapse ul li a[href^='#']").on('click', function(e) {
	    
	    target = this.hash;
       // prevent default anchor click behavior
       e.preventDefault();

       // animate
       $('html, body').animate({
           scrollTop: $(this.hash).offset().top 
         }, 300, function(){
   
           // when done, add hash to url
           // (default click behaviour)
           window.location.hash = target;
         });

    });
    
   
   
   $(document).ready(function()
   {
   // cache the window object
	   $window = $(window);
	   
	   setJumbotronHeight();
	   window.onresize = function(event)
	   {
	   		setJumbotronHeight();
	   };
	 
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