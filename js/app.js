;(function( $ ) {
  function App() {
    var $private = {};
    var $public = {};

    $public.init = function init() {
      $private.initInfiniteScroll();
    };

    $private.initInfiniteScroll = function initInfiniteScroll() {
      var infiniteScroll = new Module.InfiniteScroll();

      infiniteScroll.set( 'containerSelector', '[data-js="content"]' )
        .set( 'containerSelectorToShowLoader', '[data-js="pagination"]' )
        .set( 'itemSelector', 'article.post' )
        .set( 'nextButtonSelector', '.alignright.next' )
        .set( 'spaceBeforeInitInPx', 1000 )
        .init();
    };

    return $public;
  }

  App().init();
})( jQuery );
