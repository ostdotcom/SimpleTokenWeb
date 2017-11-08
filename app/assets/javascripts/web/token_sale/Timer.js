;
(function (window) {

  var tsNs = ns("simpletoken.tokensale"),
    oThis;

  tsNs.timer = oThis = {

    countDownTime: new Date($('table[data-countdown]').data('countdown')).getTime(),

    init: function (config) {
      oThis.bindButtonActions();
      var cd = oThis.countDown();
      if (typeof cd != 'number') {
        oThis.updateTimer(cd)
      }
    },

    bindButtonActions: function () {

    },

    countDown: function () {

      var distance = oThis.countDownTime - new Date().getTime();

      if (distance < 0) {
        return distance;
      }

      var days = Math.floor(distance / (86400000)) + "";
      var hours = Math.floor((distance % (86400000)) / (3600000)) + "";
      var minutes = Math.floor((distance % (3600000)) / (60000)) + "";
      var seconds = Math.floor((distance % (60000)) / 1000) + "";

      while (days.length < 2) days = "0" + days;
      while (hours.length < 2) hours = "0" + hours;
      while (minutes.length < 2) minutes = "0" + minutes;
      while (seconds.length < 2) seconds = "0" + seconds;

      return {days: days, hours: hours, minutes: minutes, seconds: seconds}
    },

    updateTimer: function (cd) {
      $('table[data-countdown] .days').text(cd.days);
      $('table[data-countdown] .hours').text(cd.hours);
      $('table[data-countdown] .minutes').text(cd.minutes);
      $('table[data-countdown] .seconds').text(cd.seconds);
    }

  };

  $(document).ready(function () {
    oThis.init();
  });

  var x = setInterval(function () {
    var cd = oThis.countDown();
    if (typeof cd == 'number') {
      clearInterval(x);
      if(cd < 0 && cd > -1000){
        location.reload();
      }
    } else {
      oThis.updateTimer(cd)
    }
  }, 1000);

})(window);