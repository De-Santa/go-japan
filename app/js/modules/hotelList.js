var hotelList = (function () {

	function getHotelData() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'data/hotels.json');
		xhr.send(null);
		xhr.onreadystatechange = function () {
			var OK = 200; // status 200 is a successful return.
			var ERROR = 400;
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === OK) {
				console.log(typeof xhr.response);
				var hotelData = JSON.parse(xhr.responseText);
				buildElement(hotelData);
			}
			else if (xhr.status >= ERROR) {
				console.log('Error: ' + xhr.status);
				return null; // An error occurred during the request.
			}
		};
	}

	/**
	* @return {Element}
	*/
	function buildElement(data) {
			var hotelTemplate = document.getElementById('hotel-profile-template');
			var hotelsContainer = document.querySelector('.go-japan__hotels-list');
			data.forEach(function (obj) {
				var element = (function () {
					//check template tag browser support
					if ('content' in document.createElement('template')) {
						return hotelTemplate.content.children[0].cloneNode(true);
					}
					else {
						return hotelTemplate.children[0].cloneNode(true);
					}
				}());
				//preview rendering
				var previewImg = new Image();
				previewImg.src = obj.preview;
				previewImg.onload = function () {
					console.log(element.style.backgroundImage);
					element.style.backgroundImage = 'url("' + obj.preview + '")';
				};
				previewImg.onerror = function () {
					console.log(element.style.backgroundImage);
					element.querySelector('.hotel-profile__no-preview').style.display = 'block';
				};

				//stars rendering
				var starsContainer = element.querySelector('.hotel-profile__info-stars');
				for(i = 0; i < obj.stars; i++){
					var starIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
					starIcon.innerHTML = '<use xlink:href="#stars"></use>';
					starsContainer.appendChild(starIcon);
				}
				//name rendering
				element.querySelector('.hotel-profile__info-name').textContent = obj.name;
				//destination rendering
				element.querySelector('.hotel-profile__info-distance').textContent = obj.distance + ' км до центра';
				//rating rendering
				var ratingContainer = element.querySelector('.hotel-profile__info-rating');
				ratingContainer.textContent = obj.rating;
				if (obj.rating >=0 && obj.rating < 5) {
					ratingContainer.classList.add('hotel-profile__info-rating--low')
				}
				else if (obj.rating >=5 && obj.rating < 7) {
					ratingContainer.classList.add('hotel-profile__info-rating--neutral')
				}
				else if (obj.rating >=7 && obj.rating <= 10) {
					ratingContainer.classList.add('hotel-profile__info-rating--high')
				}
				else {
					var questionIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
					questionIcon.innerHTML = '<use xlink:href="#question"></use>';
					ratingContainer.appendChild(questionIcon);
				}

				hotelsContainer.appendChild(element);
			});
	}

	function render() {
		getHotelData();
	}

	return {
		render: render
	};
}());