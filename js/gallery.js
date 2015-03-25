(function($){
  // Caption
  $('.entry').each(function(i){
    if( $( this ).closest( 'article.page' )[0] ) {
      return;
    }

    $(this).find('img').each(function(){
      var alt = this.alt;
      var $this = $( this );
      var isFirstParagraph = !!$this.closest( 'p:first-child' )[0];
      var isAdsDa2k = !!$this.closest( '.ads-da2k' )[0];
      var $titleLink = $this.closest( '.post-content' ).find( 'header .title a' );
      var hasTitleLink = !!$titleLink[0];

      if (alt){
        $this.after('<span class="caption">' + alt + '</span>');
      }

      if( !isFirstParagraph && !isAdsDa2k ) {
        $this.wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox" rel="gallery' + i + '" />');
      }

      if( hasTitleLink && isFirstParagraph ) {
        $this.wrap('<a href="' + $titleLink[0].href + '" />');
      }
    });
  });

  // Gallery
  var play = function(parent, item, callback){
    var width = parent.width();

    item.imagesLoaded(function(){
      var _this = this[0],
        nWidth = _this.naturalWidth,
        nHeight = _this.naturalHeight;

      callback();
      this.animate({opacity: 1}, 500);
      parent.animate({height: width * nHeight / nWidth}, 500);
    });
  };

  $('.gallery').each(function(){
    var $this = $(this),
      current = 0,
      photoset = $this.children('.photoset').children(),
      all = photoset.length,
      loading = true;

    play($this, photoset.eq(0), function(){
      loading = false;
    });

    $this.on('click', '.prev', function(){
      if (!loading){
        var next = (current - 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    }).on('click', '.next', function(){
      if (!loading){
        var next = (current + 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    });
  });
})(jQuery);
