/**
* @fileoverview Builds range sliders for filters.
* @author German Topalov (ru00161131@gmail.com)
*/
(function () {
	/**
	* @param {Object} maxValues - max values for range slider
	* @constructor
	*/
	function Filters(maxValues) {
		this.maxValues = maxValues;
		this.container = document.querySelector('.filter');
		this.sliderTemplate = document.getElementById('range-slider-template');
		this.types = [stars,rating,price,distance];
	}

	Filters.prototype.openFilters = function () {};

	Filters.prototype.buildFilters = function () {

	};

	window.RangeSliders = RangeSliders
}());


var filter = (function () {
	var filterSliders = {};
	var filterBtn = document.querySelector('.filter__button');
	var filterLayout = document.querySelector('.filter__layout');

	//filter window appear button bind
	filterBtn.addEventListener('click', function () {
		if (!this.classList.contains('active')) {
			this.classList.remove('inactive');
			filterLayout.classList.remove('hidden');
			this.classList.add('active');
			filterLayout.classList.add('active');
		}
		else {
			this.classList.remove('active');
			this.classList.add('inactive');
			filterLayout.classList.remove('active');
			filterLayout.classList.add('inactive');
			setTimeout(function () {
				filterLayout.classList.remove('inactive');
				filterLayout.classList.add('hidden');
			}, 300);
		}
	});

	var hotelData;
	//prepare data for filter-sliders
	function prepareFilterData(data, maxValues) {
		//push hotelData Object Array to global scope
		hotelData = data;

		var dragSlider = document.querySelectorAll('.drag-slider__scale-pointer');
		for (i = 0; i < dragSlider.length; i++) {
			var valPostfix;
			var self = dragSlider[i];
			var valContainer = self.parentElement.previousElementSibling;

			//get filter-type string
			var filterType = self.dataset.filter;
			switch (filterType) {
				case 'stars':
					maxValue = maxValues.stars;
					valPostfix = '';
					break;
				case 'rating':
					maxValue = maxValues.rating;
					valPostfix = '';
					break;
				case 'price':
					maxValue = maxValues.price;
					valPostfix = ' руб.';
					break;
				case 'distance':
					maxValue = maxValues.distance;
					valPostfix = ' км.';
					break;
			}
			//fill filterSliders object with inited sliders
			filterSliders[filterType] = buildSlider(self, maxValue, valContainer, valPostfix, filterType);
		}
	}

	//build jquery draggable
	function buildSlider(element, maxValue, valContainer, valPostfix, filterType) {
		var SCALE_WIDTH = 285;//SCALE_WIDTH = scale-width(px) - pointer-width(px)
		var segments = SCALE_WIDTH / maxValue;
		var mask = element.previousElementSibling;
		var dragValue;
		var sliderCurPosition;
		var sliderEndPosition;
		var slider = $(element).draggable({
			axis: 'x',
			containment: "parent",
			create: function () {
				element.setAttribute('data-filter-' + filterType + '-value', 0);
			},
			start: function () {
				sliderEndPosition = 0;
			},
			drag: function () {
				sliderCurPosition = slider.position().left;
				dragValue = Math.round(sliderCurPosition / segments);
				valContainer.textContent = dragValue + valPostfix;
				if (dragValue === 0) {
					valContainer.textContent = 'показать всё';
					element.classList.remove('active');
				}
				else {
					element.classList.add('active');
				}
				mask.style.width = (sliderCurPosition + 15) + "px";
			},
			stop: function () {
				sliderEndPosition = Math.round(dragValue * segments);
				slider.animate({left: sliderEndPosition}, 300);
				$(mask).animate({width: sliderEndPosition + 15}, 300);
				element.setAttribute('data-filter-' + filterType + '-value', dragValue);
			}
		});
		return slider
	}

	//functions for sorting and filtering
	var filterApplyBtn = document.querySelector('.filter__layout-apply-btn');
	filterApplyBtn.onclick = function () {
		var choosedFilterVal = {
			stars: document.querySelector('[data-filter-stars-value]').dataset.filterStarsValue,
			rating: document.querySelector('[data-filter-rating-value]').dataset.filterRatingValue,
			price: document.querySelector('[data-filter-price-value]').dataset.filterPriceValue,
			distance: document.querySelector('[data-filter-distance-value]').dataset.filterDistanceValue
		};
		mainFilter(hotelData, choosedFilterVal);
		console.log(choosedFilterVal);
	};

	function mainFilter(data, value) {
		console.log(value);
		var filteredHotels = data.filter(function (obj) {

			if (value.price == 0) {
				return (obj.stars >= value.stars && obj.rating >= value.rating && obj.price >= value.price && obj.distance >= value.distance);
			}
			else {
				return (obj.stars >= value.stars && obj.rating >= value.rating && obj.price <= value.price && obj.distance >= value.distance);
			}
		});
		console.log(filteredHotels);
		filteredHotels = sortByProp(filteredHotels, 'stars', 'min2max');
		hotelCard.clear();
		hotelCard.render(filteredHotels);
	}


	function sortByProp(array, propertyName, sortType) {
		return array.sort(function (a, b) {
			switch(sortType) {
				case 'min2max':
					return a[propertyName] - b[propertyName];
					break;
				case 'max2min':
					return b[propertyName] - a[propertyName];
					break;
			}
		});
	}

	function init(data, maxValues) {
		prepareFilterData(data, maxValues)
	}

	return {
		init: init
	}

}());