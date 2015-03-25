;(function( $ ) {
  function App() {
    var $private = {};
    var $public = {};

    $public.init = function init() {
      $private.initEvents();
      $private.initInfiniteScroll();
    };

    $private.initEvents = function initEvents() {
      $( '.ads-da2k a' ).on( 'click', $private.handleAdsClick );
      $( '.banner-leokz' ).on( 'click', $private.handleBannerLeoClick );
    };

    $private.handleAdsClick = function handleAdsClick() {
      var _gaq = window._gaq || [];
      _gaq.push([ '_trackEvent', 'ADS', 'Curso Javascript Ninja - Origem: ' + $( '#script-main' ).data( 'url' )]);
    };

    $private.handleBannerLeoClick = function handleBannerLeoClick() {
      var _gaq = window._gaq || [];
      _gaq.push([ '_trackEvent', 'Banner Leokz', 'Post de origem: ' + $( '#script-main' ).data( 'url' )]);
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
