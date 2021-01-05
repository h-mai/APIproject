document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {fullWidth: true, indicators: true});
    if(instances.length>0) {
    carouselInterval = setInterval(function(){
      instances[0].next();
    }, 5000);
  }
  });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
