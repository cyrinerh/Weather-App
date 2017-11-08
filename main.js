$(document).ready(function (){
	var positionElt = $(".position");
	function getCelcius(temp){
		var cel = (temp - 32) * 5/9;
		return cel;
	};

	function getFahrenheit(temp){
		var feh = (temp * 9/5 + 32)
		return feh;
	};

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			positionElt.html("Geolocation is not supported by this browser.")
		}
	}

	function showPosition(position) {

		$.get('https://fcc-weather-api.glitch.me/api/current?lat='+
			position.coords.latitude +'&lon=' + position.coords.longitude,
			function(data) {
				console.log(data)
				$('.loader').css('display','none')
				$('.location').text(data.name + ', ' + data.sys.country);
				$('.temp .deg').text(data.main.temp)
				$('.temp .unit').text('C')
				$('.temp').css('display','inline')
				$('.windSpeed').text(data.wind.speed + ' mph')
				$('.humidity').text(data.main.humidity + '%')
				$('.tempMinMax').text(data.main.temp_min + '°' + '/' + data.main.temp_max + '°')
				$('.pressure').text(data.main.pressure + ' SI')
				$('.visibility').text(data.visibility + ' mi')
				$('.image').attr('src' , "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=300x300&sensor=false") 
				$('.temp a').click(function(){

					if ($('.temp').hasClass('celsius')) {
						$('.temp .deg').text(getFahrenheit(data.main.temp))
						$('.temp .unit').text('F')
						$('.temp').attr('class', 'temp fahrenheit');

					} else {
						$('.temp .deg').text(data.main.temp)
						$('.temp .unit').text('C')
						$('.temp').attr('class', 'temp celsius');
					}

				});
				$('.weather').text(data.weather[0].description);

				switch (data.weather[0].description) {
					case "few clouds" :
					$('.iconDesc').append('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
					break;
					case "thunderstorm" :
					$('.iconDesc').append('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"></div></div>');
					break;
					case "scattered clouds" :
					$('.iconDesc').append('<div class="icon cloudy"><div class="cloud"></div><div class="sun"></div><div class="rain"></div></div>');
					break;
					case "sunny" :
					$('.iconDesc').append('<div class="icon sunny"><div class="sun"></div></div>');
					break;
					case "rainy" :
					$('.iconDesc').append('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
					break;
					case "light rain" :
					$('.iconDesc').append('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
					break;

				}

			});

	}
	getLocation();

});


