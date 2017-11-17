const WEATHER_API = 'https://fcc-weather-api.glitch.me/api/current'
let positionElt = $(".position");
let tempInCelcius;
let tempInFahrenheit;

function getWeatherData(lat, lon) {

	$.ajax({
		url: WEATHER_API,
		data: {
			lat: lat,
			lon: lon
		},
		dataType: 'json',
		success: function (data) {
			tempInFahrenheit = (data.main.temp * 9/5 + 32)
			tempInCelcius = data.main.temp
			updateUI(data, {lat: lat, lon: lon});
		},
		error: function (xhr, error) {
			console.error(error);
		}
	});
	
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) { getWeatherData(position.coords.latitude, position.coords.longitude) },
			function (error) { console.error(error) },
		);
	} else {
		positionElt.html("Geolocation is not supported by this browser.")
	}
}

function convertTemperature (){
	if ($('.temp').hasClass('celsius')) {
		$('.temp .deg').text(tempInFahrenheit)
		$('.temp .unit').text('F')
		$('.temp').attr('class', 'temp fahrenheit');

	} else {
		$('.temp .deg').text(tempInCelcius)
		$('.temp .unit').text('C')
		$('.temp').attr('class', 'temp celsius');
	}
}

function getIcons (description){
	switch (description) {
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
}

function updateUI (data, position){
	console.log(data)
	$('.loader').hide();
	$('.location').text(data.name + ', ' + data.sys.country);
	$('.deg').text(data.main.temp)
	$('.unit').text('C')
	$('.temp').show()
	$('.windSpeed').text(data.wind.speed + ' mph')
	$('.humidity').text(data.main.humidity + '%')
	$('.tempMinMax').text(data.main.temp_min + '°' + '/' + data.main.temp_max + '°')
	$('.pressure').text(data.main.pressure + ' SI')
	$('.visibility').text(data.visibility + ' mi')
	$('.image').attr('src' , "https://maps.googleapis.com/maps/api/staticmap?center=" + position.lat + "," + position.lon + "&zoom=13&size=300x300&sensor=false") 
	$('.weather').text(data.weather[0].description);
	getIcons(data.weather[0].description);
}

$('.temp').click(function(){
	convertTemperature()
});

getLocation();