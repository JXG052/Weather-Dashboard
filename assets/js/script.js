const apiKey = "ab9f8caa2dd9cd7134acc296912c94ae"


// var weatherApiRootUrl = 'https://api.openweathermap.org';
// // local variable  
//   var apiUrl =
//     weatherApiRootUrl +
//     '/data/2.5/forecast?lat=' +
//     lat +
//     '&lon=' +
//     lon +
//     '&units=metric&appid=' +
//     apiKey;
    
    
let cityName = "london"
  let geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

  console.log(geoCodeURL)
  
