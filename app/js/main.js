'use strict';

requirejs.config({
	baseUrl: 'js/',
	paths: {
		jquery: 'libs/jquery-3.2.1.min'
	}
});

document.addEventListener('DOMContentLoaded', function(){
	define([

	], function () {
		svgSprite.init();

		/** @type {DataSource} */
		var data = new DataSource;
		/** @type {HotelsList} */
		var hotelsList = new HotelsList();

		data.getHotels();

		/**
		 * @param {Object} hotels - hotels list loaded from server
		 */
		data.onHotelsLoad = function(hotels) {
			hotelsList.render(hotels);
			hotelsList.buildGrid();
			//filter.init(data, data.filterMaxValues);
		};

		/**
		 * @param {number} error - error code received from server
		 */
		data.onHotelsLoadError = function(error) {
			alert('Не удалось загрузить список отелей, код ошибки: ' + error);
		};

	});
}, false);