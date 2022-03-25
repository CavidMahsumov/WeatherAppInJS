$(document).ready(function() {
    $('#i').keypress(function(event){
	
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            formatSearchResults();
        }
    
    });
  });

  function formatSearchResults() {

    request = $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        type: "GET",
        data: { q: $("#i").val(), 
                appid: '8f43140d4ca112c994563620c99a1874',
                units: 'metric'}
    });

  


    request.done(function (response){
        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
        var city_name = response.name;
        city_name = city_name + ", " + response.sys.country;
        var city_weather = response.weather[0].main;
        var city_temp = response.main.temp;
        var imgurl  = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';
        var windspeed=response.wind.speed;
        var deg=response.wind.deg;
        var pres=response.main.pressure;
        console.log(windspeed)
        $("#mdi").attr('src', imgurl);
        $("#h11").text(city_name);
        $("#deg").text("Deg : "+deg);
        $("#h12").text(city_temp+" Celsius"); 
        $("#ws").text("Wind Speed : "+windspeed);
        $("#time").text("Date : "+strDate);
        $("#pres").text("Pressure : "+pres);
    });

    request.fail(function(){
        alert("Wrong City")
    });
    
    
  }