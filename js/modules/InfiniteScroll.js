;(function ( root, factory ) {
  'use strict';
  /* istanbul ignore next */
  if ( typeof define === 'function' && define.amd ) {
    define([ 'jquery' ], factory );
  }
  else if ( typeof exports === 'object' ) {
    exports = module.exports = factory( require( 'jquery' ) );
  }
  else {
    root.Module = ( root.Module || {} );
    root.Module.InfiniteScroll = factory( jQuery );
  }
})(this, function( $ ) {

  'use strict';

  var InfiniteScroll = function() {

    var $public = {};
    var $private = {};


    // --------------------------------------------------


    $private.defaults = {
      containerSelector : null,
      containerSelectorToShowLoader : null,
      itemSelector : null,
      nextButtonSelector : null,

      delayBeforeLoad : 300,
      loadingContainer : null,
      loadingImageSrc : 'data:image/gif;base64,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',
      spaceBeforeInitInPx : 150
    };

    $private.canScroll = true;
    $private.doneInfiniteScroll = false;
    $private.isAjaxLoading = false;
    $private.loadingImage = null;
    $private.scrollTimer = null;


    // --------------------------------------------------


    $public.init = function init() {
      console.log( 'carregou InfiniteScroll.js' );

      $private.checkInfiniteScrollIsReady();
    };


    // --------------------------------------------------


    $public.set = function set( property, value ) {
      $private.defaults[ property ] = value;
      return $public;
    };


    // --------------------------------------------------


    $public.help = function help() {
      var styleH1 = 'font: bold 16px sans-serif';
      var styleH2 = 'font: bold 14px sans-serif';
      var styleH3 = 'font-weight: 700; background: #f0f0f0; color: #333';
      var styleP = 'color: #333';

      console.log( '' );
      console.log( '%cINFINITE SCROLL (HELP)', styleH1 );
      console.log( '%cPARÂMETROS OBRIGATÓRIOS:', styleH2 );
      console.log( '%ccontainerSelector(string CSS selector): null %c Seletor CSS para a div que receberá os itens buscados com Ajax (essa div deve existir em todas as páginas).', styleH3, styleP );
      console.log( '%ccontainerSelectorToShowLoader (string CSS selector): null %c Seletor CSS para a div que irá receber a imagem de loading', styleH3, styleP );
      console.log( '%citemSelector (string CSS selector): null %c Seletor CSS para o item que será buscado com Ajax.', styleH3, styleP );
      console.log( '%cnextButtonSelector (string CSS selector): null %c Seletor para o botão que linka para a próxima página.', styleH3, styleP );
      console.log( '%cIMPORTANTE: %c Na última página, é verificado se o botão de "próximo" existe. Se não existir, não é feita mais nenhuma requisição. Logo, no seu código, você deve remover o botão quando for a última página.', styleH3, styleP );
      console.log( '' );
      console.log( '%cOUTROS PARÂMETROS:', styleH2 );
      console.log( '%cdelayBeforeLoad (number): 300 %c Valor em milissegundos antes de iniciar a próxima requisição.', styleH3, styleP );
      console.log( '%cloadingContainer (string html): null %c marcação HTML para mostrar o loader. Ao setar esse parâmetro, o loadingImageSrc será ignorado.', styleH3, styleP );
      console.log( '%cloadingImageSrc (url): base64 %c URL (ou código base64) para o GIF de loading.', styleH3, styleP );
      console.log( '%cspaceBeforeInitInPx (number): 150 %c Quantidade de pixels para iniciar a requisição antes de chegar ao final da página.', styleH3, styleP );
      console.log( '' );
    };


    // --------------------------------------------------


    $private.get = function get( property ) {
      return $private.defaults[ property ];
    };


    // --------------------------------------------------


    $private.checkInfiniteScrollIsReady = function checkInfiniteScrollIsReady() {
      if( ! $private.isInfiniteScrollReady() ) {
        console.error( 'Antes de iniciar o Infinite Scroll, é necessário definir os parâmetros obrigatórios. Para saber quais são, execute Module.InfiniteScroll().help() no console.' );
        return false;
      }

      return $private.initInfiniteScroll();
    };


    // --------------------------------------------------


    $private.isInfiniteScrollReady = function isInfiniteScrollReady() {
      return (
        $private.get( 'containerSelector' ) &&
        $private.get( 'containerSelectorToShowLoader' ) &&
        $private.get( 'itemSelector' ) &&
        $private.get( 'nextButtonSelector' )
      );
    };


    // --------------------------------------------------


    $private.initInfiniteScroll = function initInfiniteScroll() {
      console.log( 'initInfiniteScroll iniciado!' );
      $private.handleWindowScroll();
      $private.initEvents();
    };


    // --------------------------------------------------


    $private.initEvents = function initEvents() {
      $( window ).on( 'scroll.infinite', $private.handleWindowScroll );
    };


    // --------------------------------------------------


    $private.handleWindowScroll = function handleWindowScroll() {
      if( ! $private.canScroll ) {
        window.clearTimeout( $private.scrollTimer );
      }

      $private.canScroll = false;
      $private.scrollTimer = window.setTimeout( $private.handleScroll, $private.get( 'delayBeforeLoad' ) );
    };


    // --------------------------------------------------


    $private.handleScroll = function handleScroll() {
      if( ! $private.isReadyToScroll() ) {
        return false;
      }

      console.log( 'Inicia requisição...' );
      $private.beforeInitRequest();
      return $.get( $( $private.get( 'nextButtonSelector' ) )[0].href ).done( $private.successNextPage );
    };


    // --------------------------------------------------


    $private.beforeInitRequest = function beforeInitRequest() {
      $private.isAjaxLoading = true;

      $private.createLoadingContainer();
    };


    // --------------------------------------------------


    $private.createLoadingContainer = function createLoadingContainer() {
      // Cria imagem de loading
      if( ! $private.loadingImage ) {
        var $loadingContainer = $( $private.get( 'loadingContainer' ) );
        $private.loadingImage = $loadingContainer || $private.defaultLoadingContainer();
      }

      $private.loadingImage.hide();

      // Adiciona imagem no container
      $( $private.get( 'containerSelectorToShowLoader' ) ).append( $private.loadingImage );

      // Mostra imagem
      $private.loadingImage.show();
    };


    // --------------------------------------------------


    $private.defaultLoadingContainer = function defaultLoadingContainer() {
      var $img = $( document.createElement( 'img' ) );
      return $img.attr({ src: $private.get( 'loadingImageSrc' ) });
    };


    // --------------------------------------------------


    $private.isReadyToScroll = function isReadyToScroll() {
      console.log( 'Executar somente a cada %dms', $private.get( 'delayBeforeLoad' ) );
      var $infiniteNextButton = $( $private.get( 'nextButtonSelector' ) );

      if( $private.doneInfiniteScroll ) {
        $( window ).off( 'scroll.infinite' );
      }

      if(
        $private.doneInfiniteScroll ||
        $private.isAjaxLoading ||
        ! $private.isEndPage() ||
        ! $infiniteNextButton[0]
      ) {
        return false;
      }

      return true;
    };


    // --------------------------------------------------


    $private.isEndPage = function isEndPage() {
      var $w = $( window );
      var windowHeight = $w.height();
      var windowScrollTop = $w.scrollTop();
      var documentHeight = $( document ).height();

      var pixelsFromWindowBottomToBottom = + documentHeight - windowScrollTop - windowHeight;
      var pixelsFromNavToBottom = documentHeight;

      return ( pixelsFromWindowBottomToBottom - $private.get( 'spaceBeforeInitInPx' ) <= 0 );
    };


    // --------------------------------------------------


    $private.successNextPage = function successNextPage( response ) {
      var $infiniteContainer = $( $private.get( 'containerSelector' ) );

      var $response = $( response );
      var $responseItems = $response.find( $private.get( 'itemSelector' ) );
      var $responsePagination = $response.find( $private.get( 'containerSelectorToShowLoader' ) );
      var $responseNextButton = $response.find( $private.get( 'nextButtonSelector' ) );

      $( $private.get( 'containerSelectorToShowLoader' ) ).remove();

      $private.afterRequest();

      $infiniteContainer.append( $responseItems ).append( $responsePagination );

      if( ! $responseNextButton[0] ) {
        $private.doneInfiniteScroll = true;
        return console.log( 'Não tem mais páginas!' );
      }
    };


    $private.afterRequest = function afterRequest() {
      console.log( 'depois da requisição' );
      $private.isAjaxLoading = false;
      $private.loadingImage.hide();
    };


    // --------------------------------------------------


    return $public;

  }; // InfiniteScroll


  return InfiniteScroll;

});
