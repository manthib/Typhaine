// Portfolio Pop Script
$('.portfolio_items').magnificPopup({

    delegate: 'a',
    filter: '.archi',
    type: 'image',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function () {
            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    closeOnBgClick: false,
    closeOnContentClick: false,
    midClick: true,
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
        tCounter: '<span class="mfp-counter">%curr% sur %total%</span>',
        enabled: true,

        navigateByImgClick: true,
        preload: [0, 1]
    },
    image: {


        titleSrc: function(item) {
              return item.el.attr('caption');
             },
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
}).magnificPopup('open');

$('.mfp-close').on( "click", function() {
    window.close();
});
