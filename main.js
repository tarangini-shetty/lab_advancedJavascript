const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
    units: "metric"
  }

  const searchbox = document.querySelector(".search-box");
  searchbox.addEventListener('keypress', setQuery);

  window.onload = function() {
    getResults("New Delhi ,India");
  };  

  function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchbox.value);
    }
  }

  function getResults(cityName){
    console.log("city is ",cityName);
    const url = `${api.base}weather?q=${cityName}&units=${api.units}&appid=${api.key}`;
    console.log("url is", url);
    fetch(url).then((response)=>{
        console.log(response);
        return response.json();
    }).then((responseJson) => {
        console.log(responseJson);
        if (responseJson.cod === 200){
            displayResults(responseJson);
            console.log(responseJson.name);
        }
        else if (responseJson.cod === '404') {
            alert(responseJson.message);
        } 
    })
    .catch((err)=>{
        console.log("Error in calling API", err);

    });
  }

  function displayResults(responseJson){
    document.querySelector(".city").innerHTML = `${responseJson.name}, ${responseJson.sys.country}`;

    document.querySelector(".temp").innerHTML = `${responseJson.main.temp}°c`;
    document.querySelector(".weather").innerHTML = responseJson.weather[0].main;
    document.querySelector(".hi-low").innerHTML = `${responseJson.main.temp_min}°c / ${responseJson.main.temp_max}°c` ;
    var d = new Date();
    var options = {   
        weekday: 'long',
        month: 'long', 
        year: 'numeric',
        day: 'numeric'
    };
    document.querySelector(".date").innerHTML = d.toLocaleDateString(undefined, options);
  }
