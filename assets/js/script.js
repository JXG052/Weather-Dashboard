



// This runs on submit of a form?
$("#search-form").on("submit", function (event){
    event.preventDefault()
    const cityName = $("#search-input").val()
    const apiKey = "ab9f8caa2dd9cd7134acc296912c94ae"
    const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
//  1st call returns lat and lon values from a given city. Those values are then used to return 5 day forecast
$.ajax({
    url: geoCodeURL,
    method: "GET"
}).then(function(response) {
    const weatherApiRootUrl = 'https://api.openweathermap.org';
    let lat = JSON.stringify(response[0].lat);
    let lon = JSON.stringify(response[0].lon);
    const apiUrl = weatherApiRootUrl + '/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + apiKey;

    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function(newResponse) {
        console.log(newResponse)
    })

    })
})

