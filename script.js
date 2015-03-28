(function() {
  
  // PARALAX_STRENGTH is the number of pixels the body must scroll for the
  // background image to move one pixel.
  var PARALAX_STRENGTH = 6;
  
  // SCROLLBAR_DURATION is the number of milliseconds that skipping to a
  // section should take.
  var SCROLL_DURATION = 400;
  
  // background is the background image element.
  var background;
  
  function documentHeight() {
    var body = document.body;
    var html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,
      html.scrollHeight, html.offsetHeight);
  }
  
  function handleScroll() {
    // Do not use parallax on touchscreen devices since their viewports may
    // change height.
    if ('ontouchstart' in window) {
      return;
    }
    
    // Compute the translation of the background.
    var offset = Math.max(window.scrollY / PARALAX_STRENGTH, 0);
    background.style.top = '' + Math.round(offset) + 'px';
  }
  
  function layout() {
    // Anything that needs to be changed on browser resize or on load, do it
    // here!
    handleScroll();
  }
  
  function scrollToCreations() {
    // Setup animation state.
    var start = window.scrollY;
    var targetY = window.innerHeight;
    var startTime = new Date().getTime();
    var interval = null;
    
    // Don't overshoot the scrolling.
    if (targetY + window.innerHeight > documentHeight()) {
      targetY = documentHeight() - window.innerHeight;
    }
    
    interval = setInterval(function() {
      // Get the percent we have completed of the animation.
      var elapsed = new Date().getTime() - startTime;
      var pct = Math.min(Math.max(elapsed/SCROLL_DURATION, 0), 1);
      pct = -2*Math.pow(pct, 3) + 3*Math.pow(pct, 2);
      
      // If the animation is complete, stop the interval.
      if (elapsed >= SCROLL_DURATION) {
        clearInterval(interval);
      }
      
      window.scrollTo(0, start + (targetY-start)*pct);
    }, Math.floor(1000/60));
  }
  
  window.addEventListener('resize', layout);
  window.addEventListener('scroll', layout);
  window.addEventListener('load', function() {
    background = document.getElementById('background');
    layout();
  });
  
  window.scrollToCreations = scrollToCreations;
  
})();