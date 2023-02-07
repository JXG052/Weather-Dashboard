let myMoment = moment()
let today = myMoment.format("YYYY-MM-DD")
// This runs on submit of a form?
$("#search-form").on("submit", function (event){
    event.preventDefault()
    const cityName = $("#search-input").val()
    const apiKey = "ab9f8caa2dd9cd7134acc296912c94ae"
    const geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

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
        }).then(function(finalResponse) {
            getWeather(finalResponse)
 

                
               // .dt_txt: "2023-02-11 12:00:00")
        })

    })

})




// formats the response from Ajax call and calls the display function for both 5 day and today
function getWeather (response) {
    
    let forecast = response.list
    console.log(forecast);
    // let middayArray = forecast.filter(function (el){
    //     if(el.dt_txt)
    // })
    let arrayOfDT = forecast.map(function (el){
        return el.dt_txt.slice(11)
    })
    
   
    let indexofMidday = arrayOfDT.indexOf(`12:00:00`)
    
    // let indexofMidday = 
    // Next 5 days
    for (let i = indexofMidday; i < 40; i+=8){
        display5DayWeather(forecast[i])                      
        }
    displayCurrentWeather(forecast[0])
}

function displayCurrentWeather(el){
        // Assign variables
        let icon = (el.weather[0].icon)
        let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
        let temp = JSON.stringify(el.main.temp)
        let wind = JSON.stringify(el.wind.speed)
        let humidity = JSON.stringify(el.main.humidity)
        let description = JSON.stringify(el.weather[0].description)
        let date = JSON.stringify(el.dt_txt)
        const todayCard = $("<div class='card col-2 todayCard'>Current Weather</div>")
            // Render to HTML
        const iconDisplay = $(`<img src="${iconURL}" alt="todaysWeather"> `)
        const dateDisplay = $(`<p class="dateDisplay">Date and Time: ${date}</p> `)
        const tempDisplay = $(`<p class="tempDisplay">Temperature is: ${temp}</p>`)
        const windDisplay = $(`<p class="windDisplay">Wind is: ${wind}</p>`)
        const humidityDisplay = $(`<p class="humidityDisplay">Humidity is: ${humidity}</p>`)
        const descriptionDisplay = $(`<p class="description">${description}</p>`)

    $("#today").append(todayCard)
    todayCard.append([dateDisplay, iconDisplay, tempDisplay, windDisplay, humidityDisplay, descriptionDisplay])
}

// Renders weather to HTML for the 5 day forecast
function display5DayWeather(el){
    console.log(el)
    // Assign variables
    let icon = (el.weather[0].icon)
    let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    let temp = JSON.stringify(el.main.temp)
    let wind = JSON.stringify(el.wind.speed)
    let humidity = JSON.stringify(el.main.humidity)
    let description = JSON.stringify(el.weather[0].description)
    let date = JSON.stringify(el.dt_txt)
    const forecastCard = $("<div class='card col-2 forecastCard'></div>")
    
    // Render to HTML
    const iconDisplay = $(`<img src="${iconURL}" alt="picOfWeather"> `)
    const dateDisplay = $(`<p class="dateDisplay">Date and Time: ${date}</p> `)
    const tempDisplay = $(`<p class="tempDisplay">Temperature is: ${temp}</p>`)
    const windDisplay = $(`<p class="windDisplay">Wind is: ${wind}</p>`)
    const humidityDisplay = $(`<p class="humidityDisplay">Humidity is: ${humidity}</p>`)
    const descriptionDisplay = $(`<p class="description">${description}</p>`)
    
    // forecastCard.addClass("forecastCard")
    // forecastCard.text(`${el.dt_txt} : temp = ${temp} degrees, wind = ${wind}, humidity = ${humidity}. Description = ${description} icon = ${iconURL} `)
    $("#forecast").append(forecastCard)
    forecastCard.append([dateDisplay, iconDisplay, tempDisplay, windDisplay, humidityDisplay, descriptionDisplay])
}






    