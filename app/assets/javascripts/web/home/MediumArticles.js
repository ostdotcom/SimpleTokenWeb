;
(function (window) {

  var videosNs = ns("simpletoken.videos"),
    oThis;

  videosNs.index = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
      oThis.loadVideos();
    },

    bindButtonActions: function () {

      $("#youtube-video-modal").on('hide.bs.modal', function () {
        $("#frameVideo").attr('src', '');
      });

      $("#youtube-video-modal").on('show.bs.modal', function (e) {
        $("#frameVideo").attr('src', $(e.relatedTarget).data('src'));
      });

      $("#youtube-video-modal").on('shown.bs.modal', function (e) {
        var width = $("#frameVideo").width();
        $("#frameVideo").height(width/16*9);
      })

    },

    loadVideos: function(){
      $.ajax({
        url: "https://s3.amazonaws.com/wa.simpletoken.org/assets/videos/pressvideos.jsonp",
        dataType: "jsonp"
      });
      // this calls simpletoken.videos.index.videos with data
    },

    videos: function(videos) {

      var $template = $('#carousel-item').text();
      var $container = $('.video-carousel');
      var html = '';

      videos.forEach(function(video){
        var item_html = $template;
        item_html = item_html.replace(new RegExp('__video_embed__', 'g'), video.video_embed);
        item_html = item_html.replace(new RegExp('__title__', 'g'), video.title);
        item_html = item_html.replace(new RegExp('__image__', 'g'), video.image);
        html += item_html;
      });
      $container.html(html);

      $('.video-carousel').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });


      $('.video-carousel')
        .removeClass("with-placeholder")
        .css('opacity', 1)
      ;

      setTimeout(function () {
        $container.find("img").each(function () {
          var jImg = $( this )
            ,dataSrc = jImg.data("thumbSrc")
            ;
          console.log("dataSrc", dataSrc );
          if ( dataSrc && dataSrc.length ) {
            jImg.prop("src", dataSrc);
          }
        });
      }, 0);
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);