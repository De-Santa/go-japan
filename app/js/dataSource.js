/**
	* @fileoverview Data source for Go-Japan app.
	* @author German Topalov (ru00161131@gmail.com)
*/

(function () {
	/** @enum {number} */
	var HTTPStatus = {
		SUCCESS: 200,
		REDIRECT: 300,
		NOT_FOUND: 404,
		INTERNAL_ERROR: 500
	};

	/**
		* @constructor
	*/
	function DataSource() {
		this.source = 'data/hotels.json';
	}

	/**
		* Gets all hotels data from server.
		* @type {?Function}
	*/
	DataSource.prototype.getHotels = function () {

		/** @type {XMLHttpRequest} */
		var xhr = new XMLHttpRequest();
		xhr.open('GET', this.source);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === HTTPStatus.SUCCESS) {
				this.hotelsData = JSON.parse(xhr.responseText);
				console.log(this.hotelsData);
				window.a = this.hotelsData;
				this.getFilterMaxValues(this.hotelsData);
				if(typeof this.onHotelsLoad === 'function') this.onHotelsLoad(this.hotelsData);
			}

			else if (xhr.status >= HTTPStatus.NOT_FOUND) {
				if(typeof this.onHotelsLoadError === 'function') this.onHotelsLoadError(xhr.status);
			}
		}.bind(this);
	};

	/**
	* @callback DataSource~onHotelsLoad - Fires on hotels data load
	* @type {?Function}
	*/
	DataSource.prototype.onHotelsLoad = null;

	/**
	 * @callback DataSource~onHotelsLoadError  - Fires on hotels data load error
	 * @type {?Function}
	 */
	DataSource.prototype.onHotelsLoadError = null;

	/**
	 * Gets max data values for slide-filters.
	 * @param {Object} hotelsData - hotels to get max value from
	 */
	DataSource.prototype.getFilterMaxValues = function (hotelsData) {

		this.filterMaxValues = {};

		var maxValues = {
			stars: [],
			rating: [],
			price: [],
			distance: []
		};

		hotelsData.forEach(function (obj) {
			//convert null data
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if(key === 'stars' || key === 'rating' || key === 'price' || key === 'distance') {
						if(!obj[key]) obj[key] = 0;
						maxValues[key].push(obj[key]);
					}
				}
			}
		});

		for (var key in maxValues) {
			if (maxValues.hasOwnProperty(key)) {
				this.filterMaxValues[key] = Math.round(Math.max.apply(null, maxValues[key]));
			}
		}
	};

	window.DataSource = DataSource;

}());


/*
var dataHandler = (function () {


	function manageData(data) {
		//hotels card scroll-pagination init
		var currentPage = 0;
		var PAGE_SIZE = 12;
		var footerCoords = document.querySelector('.go-japan__footer').getBoundingClientRect();
		var viewportSize = window.innerHeight;

		//build and render hotel cards
		var container = document.querySelector('.go-japan__hotels-list');
		var fragment = document.createDocumentFragment();

		container.appendChild(fragment);

		if(footerCoords.bottom - viewportSize <= footerCoords.height) {
			currentPage++;
			console.log('lol');
			hotelCard.render(data, currentPage, PAGE_SIZE);
		}

		filter.init(data, maxValues);
	}

	function init() {
		getHotelData();
	}

	return {
		init: init
	};
}());*/
