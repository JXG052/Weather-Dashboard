const apiKey = "ab9f8caa2dd9cd7134acc296912c94ae"
let lat;
let lon;


let cityName = "london"
const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

let weatherApiRootUrl = 'https://api.openweathermap.org';
// local variable  

    

  
$.ajax({
    url: geoCodeURL,
    method: "GET"
}).then(function(response) {
    
    lat = JSON.stringify(response[0].lat);
    lon = JSON.stringify(response[0].lon);
    let apiUrl = weatherApiRootUrl + '/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + apiKey;

    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function(newResponse) {
        console.log(newResponse)
    })

})


// $.ajax({
//     url: apiUrl,
//     method: "GET"
// }).then(function(response) {
//     console.log(response)
// })
