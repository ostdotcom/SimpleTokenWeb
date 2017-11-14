;
(function (window) {

  var PNs = ns("simpletoken.progress"),
    oThis;

  PNs.animation = oThis = {

    stepCount: 1,

    init: function (config) {
      oThis.interval = setInterval(function () {
        oThis.step();
        if(oThis.stepCount > 5){
          clearInterval(oThis.interval);
        }
      }, 600)
    },

    step: function(){

      var $progressHorizontal = $('.container-timeline.horizontal .progress .pb-'+oThis.stepCount+' .pb-inner');
      var $progressVertical = $('.container-timeline.vertical .progress .pb-'+oThis.stepCount+' .pb-inner');
      $progressHorizontal.css(
        'width', $progressHorizontal.data('pc')+'%'
      );
      $progressVertical.css(
        'height', $progressVertical.data('pc')+'%'
      );
      $progressHorizontal.addClass($progressHorizontal.data('class'));
      $progressVertical.addClass($progressVertical.data('class'));

      var $milestone = $('.container-timeline .milestones .ms-'+oThis.stepCount);
      $milestone.addClass($milestone.data('class'));
      $milestone.find( ".o-circle").css({
        transform: 'inherit',
      });

      oThis.stepCount++;
    },

  };

  $(document).ready(function () {
    oThis.init();
  });

})(window);