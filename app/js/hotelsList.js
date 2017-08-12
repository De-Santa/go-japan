/**
 * @fileoverview Renders hotels list and builds packery grid.
 * @author German Topalov (ru00161131@gmail.com)
 */
(function () {
	/**
	 * @constructor
	 */
	function HotelsList() {
		this.container = document.querySelector('.go-japan__hotels-list');
	}

	/**
	 * Renders hotels list
	 * @param {Object} hotelsData - hotels list to render
	 */
	HotelsList.prototype.render = function (hotelsData) {
		var fragment = document.createDocumentFragment();

		hotelsData.forEach(function (hotelData) {
			/** @type {Hotel} */
			var hotel = new Hotel(hotelData);
			hotel.buildElement();
			fragment.appendChild(hotel.domElement);
		});
		this.container.appendChild(fragment)
	};

	/**
		* Builds packery grid
	*/
	HotelsList.prototype.buildGrid = function () {
		this.grid = new Packery(this.container, {
			itemSelector: '.go-japan__hotels-list-item',
			percentPosition: true,
			columnWidth: '.go-japan__hotels-list-grid-sizer',
			rowHeight: '.go-japan__hotels-list-grid-sizer',
			gutter: '.go-japan__hotels-list-gutter-sizer'
		});

		this.container.addEventListener( 'click', function( event ) {
			// filter for grid-item clicks
			if (!event.target.classList.contains('go-japan__hotels-list-item')) {
				return;
			}

			if(this.lastClicked) {
				if(this.lastClicked !== event.target) {
					if(this.lastClicked.classList.contains('go-japan__hotels-list-item--active')) {
						this.lastClicked.classList.remove('go-japan__hotels-list-item--active', 'hotel--active');
					}
				}
			}

			event.target.classList.toggle('go-japan__hotels-list-item--active');
			event.target.classList.toggle('hotel--active');
			this.lastClicked = event.target;
			this.grid.layout();
		}.bind(this));
	};

	window.HotelsList = HotelsList;

}());