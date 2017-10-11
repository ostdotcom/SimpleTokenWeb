;
(function (window) {

  var homeNs = ns("simpletoken.platform"),
    oThis;

  homeNs.index = oThis = {

    animCount: 0,
    totalAnims: 3,
    logoPos: $('.container-stack-band .logo').offset().top + 150,
    imagesPos: 60,
    partsPos: $('.parts-container').offset().top,
    imagesDesktopAnimation: false,
    modulesAnimation: false,

    init: function (config) {
        oThis.bindButtonActions();
        oThis.modulesInit();
        oThis.imagesDesktopInit();
        oThis.onScroll();
        oThis.copyModulesMobile();
    },

    bindButtonActions: function () {
        $('.module-wrapper').click(function(){
            oThis.moduleClick(this);
        });
        $('.part-wrapper').click(function(){
            oThis.partClick(this);
        });
    },

    copyModulesMobile: function(){
        var data = [];
        $('.container-stack-modules .module-container .module-wrapper').each(function(i){
            data[i] = {
                title: $(this).find('.title').text(),
                icon: $(this).find('.module-outer').html(),
                class: $(this).data('module')
            }
            $('.container-stack-modules-mobile .panel').eq(i).addClass(data[i].class);
            $('.container-stack-modules-mobile .panel').eq(i).find('.panel-title a').html(data[i].icon + '<span>'+data[i].title+'</span>');
        })
        $('.container-stack-modules .module-contents .module-content').each(function(i){
            data[i] = {
                html: $(this).find('.row div').eq(0).html(),
                image: $(this).find('.row div').eq(1).html()
            }
            $('.container-stack-modules-mobile .panel').eq(i).find('.panel-body').html(data[i].image + data[i].html);
        })
    },

    moduleClick: function(elem){
        var module = $(elem).data('module');
        $('.module-wrapper').removeClass('active');
        $(elem).addClass('active');
        $('.module-content').hide();
        $('[data-module="'+module+'"].module-content').show();
    },

    partClick: function(elem){
        var part = $(elem).data('part');
        var currentPartNum = $('.part-wrapper.active').data('partnum');
        var newPartNum = $('[data-part="'+part+'"]').data('partnum');
        $('.part-wrapper').removeClass('active');
        $(elem).addClass('active');
        $('.part-content').hide();
        if($(window).width() > 767){
            oThis.architectureAnimController(currentPartNum, newPartNum);
        } else {
            $('.part-content').fadeOut(500);
            $('[data-part="'+part+'"].part-content').fadeIn(500);
        }
    },

    imagesDesktopInit: function(){

        $('.images-desktop .ipad') .css({
            top: '50px',
            opacity: 0
        });
        $('.images-desktop .iphone') .css({
            bottom: '-30px',
            opacity: 0
        });
    },

    imagesDesktopAnimate: function(){

        if(oThis.imagesDesktopAnimation === true)
            return;

        oThis.imagesDesktopAnimation = true;

        move('.images-desktop .ipad').set({
            top: 0,
            opacity: 1
        }).ease('out').duration(800).end();

        setTimeout(function(){
            move('.images-desktop .iphone').set({
                bottom: 0,
                opacity: 1
            }).ease('out').duration(600).end();
        }, 400);

        oThis.animCount++;
    },

    modulesInit: function(){
        $('[data-module="transaction"].module-wrapper') .css('transform', 'translate(0px, -270px)');
        $('[data-module="wallet"].module-wrapper')      .css('transform', 'translate(130px, -270px)');
        $('[data-module="admin"].module-wrapper')       .css('transform', 'translate(260px, -270px)');
        $('[data-module="identity"].module-wrapper')    .css('transform', 'translate(390px, -270px)');
        $('[data-module="ledger"].module-wrapper')      .css('transform', 'translate(-130px, -270px)');
        $('[data-module="rights"].module-wrapper')      .css('transform', 'translate(-260px, -270px)');
        $('[data-module="token-design"].module-wrapper').css('transform', 'translate(-390px, -270px)');
        $('.module-wrapper .title').css('opacity', '0');
        $('.container-stack-heading').css('opacity', '0');
        $('.module-contents').css('opacity', '0');
    },

    modulesAnimate: function(){

        if(oThis.modulesAnimation === true)
            return;

        oThis.modulesAnimation = true;

        move('[data-module="transaction"].module-wrapper').translate(0, 0).ease('out').duration(600).end();
        move('[data-module="wallet"].module-wrapper').translate(0, 0).ease('out').duration(700).end();
        move('[data-module="ledger"].module-wrapper').translate(0, 0).ease('out').duration(700).end();
        move('[data-module="admin"].module-wrapper').translate(0, 0).ease('out').duration(800).end();
        move('[data-module="rights"].module-wrapper').translate(0, 0).ease('out').duration(800).end();
        move('[data-module="identity"].module-wrapper').translate(0, 0).ease('out').duration(900).end();
        move('[data-module="token-design"].module-wrapper').translate(0, 0).ease('out').duration(900).end(function(){
            move('[data-module="transaction"].module-wrapper .title').set({opacity: 1}).ease('in').duration(100).end();
            move('[data-module="wallet"].module-wrapper .title').set({opacity: 1}).ease('in').duration(100).end();
            move('[data-module="ledger"].module-wrapper .title').set({opacity: 1}).ease('in').duration(100).end();
            move('[data-module="admin"].module-wrapper .title').set({opacity: 1}).ease('in').duration(100).end();
            move('[data-module="rights"].module-wrapper .title').set({opacity: 1}).ease('in').duration(100).end();
            move('[data-module="identity"].module-wrapper .title').set({opacity: 1}).ease('in').duration(100).end();
            move('[data-module="token-design"].module-wrapper .title').set({opacity: 1}).ease('in').duration(100).end();
        });
        move('.container-stack-heading').set({opacity: 1}).ease('in').duration(800).end();
        move('.module-contents').set({opacity: 1}).ease('in').duration(800).end();
        oThis.animCount++;
    },

    architectureAnimController: function(currentPartNum, newPartNum){

        if(currentPartNum < newPartNum){

            if(currentPartNum == 1 && newPartNum == 2){
                oThis.architectureAnim(1.5);
                oThis.architectureAnim(2);
            }

            if(currentPartNum == 1 && newPartNum == 3){
                oThis.architectureAnim(1.5);
                oThis.architectureAnim(3);
            }

            if(currentPartNum == 1 && newPartNum == 4){
                oThis.architectureAnim(1.5);
                oThis.architectureAnim(3);
                oThis.architectureAnim(3.5);
                oThis.architectureAnim(4);
            }

            if(currentPartNum == 2 && newPartNum == 3){
                oThis.architectureAnim(1.5);
                oThis.architectureAnim(3);
            }

            if(currentPartNum == 2 && newPartNum == 4){
                oThis.architectureAnim(1.5);
                oThis.architectureAnim(3);
                oThis.architectureAnim(3.5);
                oThis.architectureAnim(4);
            }

            if(currentPartNum == 3 && newPartNum == 4){
                oThis.architectureAnim(3.5);
                oThis.architectureAnim(4);
            }

        } else if(currentPartNum > newPartNum){

            oThis.architectureAnim('hide');
            oThis.architectureAnim(-1*newPartNum);

        }

    },

    architectureAnim: function(step, defaultDuration){

        if(typeof defaultDuration != 'undefined'){
            var duration = defaultDuration;
        } else {
            var duration = 1500;
        }

        switch(step) {
            case 0:
                // Initiate
                move('.p1-i1')
                    .set({
                        opacity: 1,
                        left: '267px',
                        top: '125px'
                    })
                    .duration(1)
                    .end();
                break;
            case 1:
                // Initiate
                move('.p1-i2')
                    .set({
                        opacity: 0,
                        left: '265px',
                        top: '260px'
                    })
                    .duration(1)
                    .end();
                move('.p1-i3')
                    .set({
                        opacity: 0,
                        left: '370px',
                        top: '130px'
                    })
                    .duration(1)
                    .end();
                // Animate
                move('.p1-i1')
                    .set('left', '167px')
                    .duration(duration)
                    .end();
                move('.p1-i2')
                    .set({
                        opacity: 1,
                        left: '405px'
                    })
                    .duration(duration)
                    .end();
                move('.p1-i3')
                    .set({
                        opacity: 1,
                        left: '505px'
                    })
                    .duration(duration)
                    .end();
                oThis.animCount++;
                break;
            case 1.5:
                // Initiate
                move('.p2-i1')
                    .set({
                        opacity: 0,
                        left: '420px',
                        top: '260px'
                    })
                    .duration(1)
                    .end();
                move('.p2-i2')
                    .set({
                        opacity: 0,
                        left: '500px',
                        top: '180px'
                    })
                    .duration(1)
                    .end();
                move('.p2-i3')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.5, 0.5)',
                        left: '510px',
                        top: '120px'
                    })
                    .duration(1)
                    .end();
                // Animate
                move('.p1-i1')
                    .set('left', '-28px')
                    .scale(0.75)
                    .duration(duration)
                    .end();
                move('.p1-i2')
                    .set('left', '170px')
                    .scale(0.75)
                    .duration(duration)
                    .end();
                move('.p1-i3')
                    .set('left', '220px')
                    .scale(0.75)
                    .duration(duration)
                    .end();
                move('.p2-i1')
                    .set({
                        opacity: 1,
                        left: '455px'
                    })
                    .scale(0.75)
                    .duration(duration)
                    .end();
                move('.p2-i2')
                    .set({
                        opacity: 1,
                        left: '535px'
                    })
                    .scale(0.75)
                    .duration(duration)
                    .end();
                break;
            case 2:
                // Animate
                move('.p3-i1')
                    .set({
                        opacity: 0
                    })
                    .duration(duration)
                    .end();
                move('.p3-i2')
                    .set({
                        opacity: 0
                    })
                    .duration(duration)
                    .end();
                move('.p2-i3')
                    .set({
                        opacity: 1,
                        left: '595px'
                    })
                    .scale(0.75)
                    .duration(duration)
                    .end();
                break;
            case 3:
                // Initiate
                move('.p3-i1')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.65, 0.65)',
                        left: '550px',
                        top: '60px'
                    })
                    .duration(500)
                    .end();
                move('.p3-i2')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.65, 0.65)',
                        left: '535px',
                        top: '115px'
                    })
                    .duration(1)
                    .end();
                // Animate
                move('.p2-i3')
                    .set({
                        opacity: 0
                    })
                    .duration(1)
                    .end();
                move('.p3-i1')
                    .set({
                        opacity: 1
                    })
                    .duration(duration)
                    .end();
                move('.p3-i2')
                    .set({
                        opacity: 1
                    })
                    .duration(duration)
                    .end();
                break;
            case 3.5:
                // Initiate
                move('.p4-i1')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.75, 0.75)',
                        left: '535px',
                        top: '170px'
                    })
                    .duration(1)
                    .end();
                move('.p4-i2')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.75, 0.75)',
                        left: '455px',
                        top: '370px'
                    })
                    .duration(1)
                    .end();
                move('.p4-i3')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.75, 0.75)',
                        left: '455px',
                        top: '-30px'
                    })
                    .duration(1)
                    .end();
                move('.p4-i5')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.75, 0.75)',
                        left: '420px',
                        top: '130px'
                    })
                    .duration(1)
                    .end();
                move('.p4-i6')
                    .set({
                        opacity: 0,
                        transform: 'scale(0.75, 0.75)',
                        left: '420px',
                        top: '335px'
                    })
                    .duration(1)
                    .end();
                break;
            case 4:
                // Animate
                move('.p2-i2')
                    .set({
                        opacity: 0
                    })
                    .duration(1)
                    .end();
                move('.p2-i3')
                    .set({
                        opacity: 0
                    })
                    .duration(duration)
                    .end();
                move('.p3-i1')
                    .set({
                        opacity: 0
                    })
                    .duration(duration)
                    .end();
                move('.p3-i2')
                    .set({
                        opacity: 0
                    })
                    .duration(duration)
                    .end();
                move('.p4-i5')
                    .set({
                        opacity: 1,
                    })
                    .duration(duration)
                    .end();
                move('.p4-i6')
                    .set({
                        opacity: 1,
                    })
                    .duration(1500)
                    .end(function(){
                        move('.p4-i1')
                            .set({
                                opacity: 1
                            })
                            .duration(duration)
                            .end();
                        move('.p4-i2')
                            .set({
                                opacity: 1
                            })
                            .duration(duration)
                            .end();
                        move('.p4-i3')
                            .set({
                                opacity: 1
                            })
                            .duration(duration)
                            .end();
                    });
                break;
            case -1:
                $('.asset')
                    .fadeOut(500, function(){
                        $('.asset').removeAttr('style');
                        oThis.architectureAnim(0, 1);
                        oThis.architectureAnim(1, 1);
                    })
                break;
            case -2:
                $('.asset')
                    .fadeOut(500, function(){
                        $('.asset').removeAttr('style');
                        oThis.architectureAnim(0, 1);
                        oThis.architectureAnim(1, 1);
                        oThis.architectureAnim(1.5, 1);
                        oThis.architectureAnim(2, 1);
                    })
                break;
            case -3:
                $('.asset')
                    .fadeOut(500, function(){
                        $('.asset').removeAttr('style');
                        oThis.architectureAnim(0, 1);
                        oThis.architectureAnim(1, 1);
                        oThis.architectureAnim(1.5, 1);
                        oThis.architectureAnim(3, 1);
                    })
                break;
        }

    },

    onScroll: function(){
        if(oThis.animCount >= oThis.totalAnims)
            return;

        var topOfWindow = $(window).scrollTop(),
            bottomOfWindow = topOfWindow + $(window).height();

        if(oThis.imagesPos <= bottomOfWindow || (oThis.imagesPos <= bottomOfWindow && oThis.imagesPos >= topOfWindow)){
            oThis.imagesDesktopAnimate();
        }

        if(oThis.logoPos <= bottomOfWindow || (oThis.logoPos <= bottomOfWindow && oThis.logoPos >= topOfWindow)){
            oThis.modulesAnimate();
        }

        if(oThis.partsPos <= bottomOfWindow || (oThis.partsPos <= bottomOfWindow && oThis.partsPos >= topOfWindow)){
            oThis.architectureAnim(0);
            oThis.architectureAnim(1);
        }
    }

  };

  $(document).ready(function () {
      oThis.init({i18n: {}});
  });

  $(window).scroll(function () {
      oThis.onScroll();
  });

})(window);