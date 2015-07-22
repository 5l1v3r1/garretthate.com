(function() {

  var boxContent;
  var content;

  function handleScroll() {
    var scrollY = window.scrollY;
    if (scrollY > 50) {
      boxContent.style.position = 'fixed';
      boxContent.style.top = '50px';
      boxContent.style.left = Math.round(content.getBoundingClientRect().right - 270) + 'px';
      boxContent.style.right = 'auto';
    } else {
      boxContent.style.position = '';
      boxContent.style.top = '';
      boxContent.style.left = '';
      boxContent.style.right = '';
    }
  }

  window.addEventListener('load', function() {
    content = document.getElementById('content');
    boxContent = document.getElementById('box-content');
    window.addEventListener('resize', handleScroll);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });

})();
