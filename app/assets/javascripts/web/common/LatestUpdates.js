;
(function (window) {

    var latestUpdates = ns("simpletoken.latestUpdates"),
        oThis;

    latestUpdates.index = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
            oThis.loadVideos();
        },

        bindButtonActions: function () {

        },

        loadVideos: function(){
            $.ajax({
                url: "https://s3.amazonaws.com/wa.simpletoken.org/assets/videos/latestupdates.jsonp",
                dataType: "jsonp"
            });
            // this calls simpletoken.videos.index.videos with data
        },

        updates: function(posts){

            var $template = $('#latest-update-carousel-item').text();
            var $container = $('.latest-updates-carousel');
            var html = '';

            posts.forEach(function(post){
                var item_html = $template;
                item_html = item_html.replace(new RegExp('__link__', 'g'), post.link);
                item_html = item_html.replace(new RegExp('__title__', 'g'), post.title);
                item_html = item_html.replace(new RegExp('__image__', 'g'), post.image);
                html += item_html;
            });
            $container.html(html);

            $('.latest-updates-carousel').slick({
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

            $('.latest-updates-carousel')
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