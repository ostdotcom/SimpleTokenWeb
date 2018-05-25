;
(function (window) {

  var KycNs = ns("kyc"),
      utilsNs = ns("simpletoken.utils"),
      oThis;

  KycNs.index = oThis = {
    jContactForm: null,
    jVideoCarousal: null,

    init: function (config) {
      oThis.jContactForm = $('#ost-kyc-contact-us-form');
      oThis.jContactForm.setCustomValidity();
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

      $("#ost-kyc-contact-us-submit").on("click", function (event) {
        event.preventDefault();
        oThis.onContactFormSubmit( event );
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

      $('#ost-kyc-contact-us-form').find('input[name=token_sale_start_date]')
        .datepicker({
          format: 'dd/mm/yyyy',
          autoclose: true,
          startDate: new Date(),
          orientation: 'bottom'
        })
        .on('changeDate', function (e) {
          $(this).trigger('change');
          var nextDate = new Date ($(this).datepicker('getDate'));
          nextDate.setDate(nextDate.getDate()+1);
          oThis.jContactForm.find('input[name=token_sale_end_date]').datepicker('setStartDate', nextDate);
        });

      $('#ost-kyc-contact-us-form').find('input[name=token_sale_end_date]')
        .datepicker({
          format: 'dd/mm/yyyy',
          autoclose: true,
          startDate: new Date(),
          orientation: 'bottom'
        })
        .on('changeDate', function (e) {
          $(this).trigger('change');
          var nextDate = new Date ($(this).datepicker('getDate'));
          nextDate.setDate(nextDate.getDate()-1);
          oThis.jContactForm.find('input[name=token_sale_start_date]').datepicker('setEndDate', nextDate);
        });

    },

    onContactFormSubmit: function () {

      //Validate Everything Again
      if ( !oThis.isContactFormValid() ) {
        console.log("Validation failed!");
        return;
      }
      $("#ost-kyc-contact-us-submit")
        .text('sending ...')
        .prop( "disabled", true );
      oThis.onSendMessage();
    },

    isContactFormValid: function () {
      simpletoken.utils.errorHandling.clearFormErrors();
      oThis.jContactForm.find('input, textarea').trigger('change');
      if(typeof oThis.jContactForm.find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
        if(grecaptcha.getResponse() == ''){
          oThis.jContactForm.find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
        }
      }
      return oThis.jContactForm.find('.error:not(:empty)').length == 0;
    },

    onSendMessage: function () {
      console.log("onSendMessage :: triggered!");
      var $contactusform = $('#ost-kyc-contact-us-form');
      var $contactusformurl = $contactusform.prop('action');
      var $formHeight = $contactusform.height();
      $('#successModal').modal('hide');
      $.ajax({
        url: $contactusformurl,
        dataType: 'json',
        method: 'POST',
        data: $contactusform.serialize(),
        success: function (response) {
          if (response.success == true) {
            $('#successModal').modal('show');
            oThis.jContactForm.find('input[name=token_sale_start_date]').datepicker('setEndDate', false);
            oThis.jContactForm.find('input[name=token_sale_end_date]').datepicker('setStartDate', new Date());
            oThis.jContactForm[0].reset();
          } else {
            simpletoken.utils.errorHandling.displayFormErrors(response);
            if(typeof grecaptcha  != 'undefined'){
              grecaptcha.reset();
            }
          }
        },
        error: function (jqXHR, exception) {
          utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        },

        complete: function (response) {
          $("#ost-kyc-contact-us-submit")
            .text('SUBMIT')
            .prop('disabled', false);

          if(typeof grecaptcha  != 'undefined'){
            grecaptcha.reset();
          }
        }

      });
    },

    isVideoPlaying: false,
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
      })

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