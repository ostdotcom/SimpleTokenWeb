;
(function (window) {

  var KycNs     = ns("kyc"),
      utilsNs   = ns("simpletoken.utils"),
      utilities = ns("simpletoken.utilities"),
      oThis;

  KycNs.index = oThis = {
    jContactForm: null,
    jContactBtn : null,
    formHelper: null,
    jVideoCarousal: null,
    isCaptchaValid : false,
    isVideoPlaying: false,

    init: function (config) {
      oThis.jContactForm = $('#ost-kyc-contact-us-form');
      oThis.jContactBtn = $('#ost-kyc-contact-us-btn');

      oThis.formHelper =  oThis.jContactForm.formHelper({
        success: function (response) {
          if (response.success == true) {
            $('#successModal').modal('show');
            oThis.jContactForm[0].reset();
            oThis.jContactForm.find('input[name=token_sale_start_date]').datepicker('setEndDate', false);
            oThis.jContactForm.find('input[name=token_sale_end_date]').datepicker('setStartDate', new Date());
          }
        },
        complete: function (response) {
          if(typeof grecaptcha  != 'undefined'){
            grecaptcha.reset();
          }
        }
      });

      oThis.jVideoCarousal = $("#kyc-video-carousel");
      oThis.bindEventListeners();
      oThis.bindButtonActions();
    },

    bindEventListeners: function () {
     
      var oThis = this;
      oThis.jVideoCarousal.swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
          if (direction == 'left') $(this).carousel('next');
          if (direction == 'right') $(this).carousel('prev');
        }
      });
      oThis.jVideoCarousal.on('slide.bs.carousel slid.bs.carousel', function ( event ) {
        var relatedTarget = event.relatedTarget
          , jEl          = $( relatedTarget )
          , indx         = jEl.data("indx")
        ;
        $('.carousel-indicators li').removeClass('active');
        $("[data-slide-to=" + indx + "]").addClass("active");
        oThis.hideVideo();
      });
    },

    bindButtonActions: function () {

      $(".carousel-inner .carousel-item .kyc-carousel-content").on("click", function () {
        oThis.showVideo( $(this) );
      });

      $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800);
        }
      });

      oThis.jContactForm .find('input[name=token_sale_start_date]')
        .datepicker({
          format: 'dd/mm/yyyy',
          autoclose: true,
          startDate: new Date(),
          orientation: 'bottom'
        })
        .on('changeDate', function (e) {
          $(this).valid();
          var nextDate = new Date ($(this).datepicker('getDate'));
          nextDate.setDate(nextDate.getDate()+1);
          oThis.jContactForm.find('input[name=token_sale_end_date]').datepicker('setStartDate', nextDate);
        });

      oThis.jContactForm .find('input[name=token_sale_end_date]')
        .datepicker({
          format: 'dd/mm/yyyy',
          autoclose: true,
          startDate: new Date(),
          orientation: 'bottom'
        })
        .on('changeDate', function (e) {
          $(this).valid();
          var nextDate = new Date ($(this).datepicker('getDate'));
          nextDate.setDate(nextDate.getDate()-1);
          oThis.jContactForm.find('input[name=token_sale_start_date]').datepicker('setEndDate', nextDate);
        });

      oThis.jContactForm.on("beforeSubmit", function (event) {
        if ( !oThis.isCaptchaValid ) {
          event.preventDefault();
        }
      });

      $('#ost-kyc-contact-us-btn').on('click' , function () {
         oThis.isCaptchaValid = utilities.validateCaptcha( oThis.jContactForm );
         oThis.formHelper.jForm.submit();
      });
    },


    showVideo: function( jItem ){
      oThis.isVideoPlaying = true;
      var jIframe = jItem.find('iframe');


      console.log( jIframe );
      console.log( jItem );
      console.log( oThis.jVideoCarousal );
      //Pause the Carousal
      oThis.jVideoCarousal.carousel('pause');

      //Hide Image
      jItem.find('img').css({
        visibility: "hidden"
      });

      //Show Iframe
      jIframe.attr({'src' : jIframe.data('src') }).show();

      //Hide the play button
      jItem.find("button").hide();
    },

    hideVideo: function(force){
      if( oThis.isVideoPlaying || force === true) {
        oThis.jVideoCarousal.carousel('cycle');
        oThis.jVideoCarousal.find('img').css({
          visibility: "visible"
        });
        oThis.jVideoCarousal.find("button").show();
        oThis.jVideoCarousal.find('iframe').removeAttr('src');
        oThis.jVideoCarousal.find('iframe').hide();
        oThis.isVideoPlaying = false;
      }
    }


  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

  $(window).on('load', function() {
    oThis.hideVideo(true);
  });

})(window);