/**
 * @fileoverview Builds hotel element from template.
 * @author German Topalov (ru00161131@gmail.com)
 */
(function () {
	/**
	* @param {Object} hotelData
	* @constructor
	*/
	function Hotel(hotelData) {
		this._data = hotelData;
	}

	/**
	* Build element from template
	*/
	Hotel.prototype.buildElement = function () {

		var template = document.getElementById('hotel-template');

		//check template tag browser support
		if ('content' in template) {
			this.domElement = template.content.children[0].cloneNode(true);
		}
		else {
			this.domElement = template.children[0].cloneNode(true);
		}

		//adds hotel name
		_addHotelName(this);

		//adds distance from center
		_addDistanceFromCenter(this);

		//adds stars rating
		_addStarRating(this);

		//adds user rating
		_addUserRating(this);

		//adds hotel price
		_addHotelPrice(this);

		//adds bg image
		_addBgImage(this);

	};

	function _addHotelName(hotel) {
		hotel.domElement.querySelector('.hotel__name').textContent = hotel._data.name;
	}

	function _addDistanceFromCenter(hotel) {
		hotel.domElement.querySelector('.hotel__distance').textContent = hotel._data.distance + ' км. до центра';
	}

	function _addStarRating(hotel) {
		for(i = 0; i < hotel._data.stars; i++){
			var starIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			starIcon.innerHTML = '<use xlink:href="#stars"></use>';
			hotel.domElement.querySelector('.hotel__stars').appendChild(starIcon);
		}
	}

	function _addUserRating(hotel) {
		var ratingContainer = hotel.domElement.querySelector('.hotel__rating');

		if(!hotel._data.rating) {
			var noRatingIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			noRatingIcon.innerHTML = '<use xlink:href="#question"></use>';
			ratingContainer.appendChild(noRatingIcon);
			return
		}

		if (hotel._data.rating > 0 && hotel._data.rating < 5) {
			ratingContainer.classList.add('hotel__rating--low');
		}
		else if (hotel._data.rating >=5 && hotel._data.rating < 7) {
			ratingContainer.classList.add('hotel__rating--neutral');
		}
		else if (hotel._data.rating >=7 && hotel._data.rating <= 10) {
			ratingContainer.classList.add('hotel__rating--high');
		}
		ratingContainer.textContent = hotel._data.rating;
	}

	function _addHotelPrice(hotel) {
		var priceContainer = hotel.domElement.querySelector('.hotel__price');
		priceContainer.innerHTML = '<span>' + hotel._data.price + '<\/span>';
		var priceIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		priceIcon.innerHTML = '<use xlink:href="#ruble"></use>';
		priceContainer.appendChild(priceIcon);
	}

	function _addBgImage(hotel) {
		var preview = hotel.domElement.querySelector('.hotel__preview');
		var noPreview = hotel.domElement.querySelector('.hotel__no-preview');

		if(!hotel._data.preview) {
			noPreview.style.display = 'block';
			return
		}

		/**
		 * Load background image from server
		 * @type {Image}
		 */
		var bgImg = new Image();

		bgImg.src = hotel._data.preview;

		bgImg.onload = function () {
			clearTimeout(imageLoadTimeout);
			preview.style.backgroundImage = 'url("' + hotel._data.preview + '")';
			preview.style.display = 'block';
		};

		bgImg.onerror = function () {
			noPreview.style.display = 'block';
		};

		//timeout for images loading
		/**
		* @const
		* @type {number}
		*/
		var IMAGE_TIMEOUT = 8000;

		var imageLoadTimeout = setTimeout(function () {
			bgImg.src = '';
			noPreview.style.display = 'block';
		}, IMAGE_TIMEOUT);
	}

	window.Hotel = Hotel;
}());