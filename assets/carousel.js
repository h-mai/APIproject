document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {fullWidth: true, indicators: true});
    carouselInterval = setInterval(function(){
        instances[0].next();
    }, 3000);
  });

  
