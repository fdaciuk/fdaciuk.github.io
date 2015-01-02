;(function( $ ) {
    $(function() {
        $( '[data-js="google-search-form"]' ).on( 'submit', function( e ) {
            e.preventDefault();
            var inputVal = $( '[data-js="google-search-input"]' ).val();
            window.location.href = $( this ).attr( 'data-action' ) + ' ' + inputVal;
        });
    });
})( jQuery );
