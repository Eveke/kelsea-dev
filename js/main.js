require(["jquery"], function($) {

    $(document).ready(function() {

      $(window).on('scroll',function() {
          var height = $(window).scrollTop();

          console.log("Height: "+height);

          if(height  > 0) {
              $('nav').addClass('scrolled');

              if (height >= 657)
              {
                $('#masthead').addClass('scrolled');
              }
              else
              {
                $('#masthead').removeClass('scrolled');
              }
          }
          else {
              $('nav').removeClass('scrolled');
              $('#masthead').removeClass('scrolled');
          }
      });

    });

});