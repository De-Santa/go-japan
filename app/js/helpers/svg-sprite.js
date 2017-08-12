; var svgSprite = (function () {
	/*
	 returns svgSprite.init() method
	 param '' - saves svg-sprite to localstorage and renders it on page
	 */
	function svgSpriteLocalstorage() {
		function spriteCache( window, document ){
			'use strict';
			var file = 'img/icons-sprite.html';
			var revision = 10;
			if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
				return true;
			var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
				request,
				data,
				insertIT = function()
				{
					document.body.insertAdjacentHTML( 'afterbegin', data );
				},
				insert = function()
				{
					if( document.body ) insertIT();
					else document.addEventListener( 'DOMContentLoaded', insertIT );
				};
			if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
			{
				data = localStorage.getItem( 'inlineSVGdata' );
				if( data )
				{
					insert();
					return true;
				}
			}
			try
			{
				request = new XMLHttpRequest();
				request.open( 'GET', file, true );
				request.onload = function()
				{
					if( request.status >= 200 && request.status < 400 )
					{
						data = request.responseText;
						insert();
						if( isLocalStorage )
						{
							localStorage.setItem( 'inlineSVGdata',  data );
							localStorage.setItem( 'inlineSVGrev',   revision );
						}
					}
				};
				request.send();
			}
			catch( e ){}
		}
		spriteCache( window, document );
	}

	function init() {
		svgSpriteLocalstorage();
	}

	return {
		init: init
	};
}());
