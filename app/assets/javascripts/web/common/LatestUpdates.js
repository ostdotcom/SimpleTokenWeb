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

        videos: function(videos){

            var $template = $('#carousel-item').text();
            var $container = $('.latest-updates-carousel');
            var html = '';

            videos.forEach(function(video){
                var item_html = $template;
                item_html = item_html.replace(new RegExp('__video_embed__', 'g'), video.video_embed);
                item_html = item_html.replace(new RegExp('__title__', 'g'), video.title);
                item_html = item_html.replace(new RegExp('__image__', 'g'), video.image);
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

            $('.latest-updates-carousel').css('opacity', 1);
        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);