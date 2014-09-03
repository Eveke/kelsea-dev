(function(){

  var items = $('#work .item').map(function(index,element){return $(element).data('category');});

  var activateTab = function activateTab() {
    var category = $('#work .item.active').data('category');

    document.getElementById('workTabs').selected = category;
  };

  var retargetLinks = function retargetLinks() {
    $(document.links).filter(function() {
        return this.hostname != window.location.hostname;
    }).attr('target', '_blank');
  };

  var init = function init() {
    activateTab();
    retargetLinks();
  };

  $(document).on('click','#viewWork',function(e){
    e.preventDefault();
    $('body').addClass('is-showing-work');
  });

  $(document).on('click','.menu-button-wrapper',function(e){
    e.preventDefault();
    var $body = $('body');
    $body.addClass('is-showing-menu');
  });

  $(document).on('click','#closeBtn',function(e){
    e.preventDefault();
    var $body = $('body'),
        $about = $('#about');

    $about.removeClass();
    $body.removeClass('is-showing-menu');
  })

  $(document).on('click','#backToTop',function(e){
    e.preventDefault();
    $('body').removeClass('is-showing-work');
  });

  $(document).on('click','.work-tabs paper-tab',function(e) {
    e.preventDefault();
    var $this = $(this),
        index = $.inArray($this.attr('id'),items);
    $('#work').carousel(index);
  });


  $(document).on('submit','.contact-form form',function(e){
      e.preventDefault();
      var $this = $(e.target),
          $button = $this.find('.btn'),
          $about = $('#about');

      $.ajax({
          headers : {
             "X-Parse-Application-Id" : "T2u9K77ww0zPTmfTEB9mTk2TROLoaGSNEw4u8lqD",
             "X-Parse-REST-API-Key"   : "jLvRGi2vvEvrrR6orHP9zjLBMEC4U2V3NydbtzEu"
          },
          url: $this.attr('action'),
          data: $this.serialize(),
          dataType: 'json',
          method: 'post',
          beforeSend: function (xhr, settings) {
            $button.text("Sending...");
          },
          success: function(data) {
            $this.trigger('reset');
            $about.removeClass('is-error').addClass('is-success');
          },
          error: function(data) {
            $about.removeClass('is-success').addClass('is-error');
          }
        });
  });

  $('#work').on('slid.bs.carousel', activateTab);

  $(".carousel-inner").swipe({
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			$(this).parent().carousel('next');
		},
		swipeRight: function() {
			$(this).parent().carousel('prev');
		},
		threshold:0
	});

  $(document).ready(function() {
    init();
  });

})();
