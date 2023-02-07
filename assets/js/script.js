let myMoment = moment()
let today = myMoment.format("YYYY-MM-DD")
let history = []
let storedSearches = JSON.parse(localStorage.getItem("weatherHistory"))
console.log(storedSearches);
if (storedSearches != null){
    history = storedSearches.map(function(search){
        return search
    })
    history.forEach(element => {
        addButton(element.cityName)
        
    });
    $("#history").on("click", ".historyBtns", function(event){
        clear()
        let city = event.target.innerHTML.trim()
        console.log(city)
        history.forEach(function (element){
            if (city === element.cityName){
                getWeather(JSON.parse(element.data))
            }
        })
        

    })
    console.log("history");
    console.log(history);
}


// This runs on submit of a form?
$("#search-form").on("submit", function (event){
    
    event.preventDefault()
    clear()
    const cityName = $("#search-input").val().trim()
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
            let data = JSON.stringify(finalResponse)
            let toStore = {cityName, data}
            history.push(toStore)
            console.log(history);
            getWeather(finalResponse)
            localStorage.setItem("weatherHistory", JSON.stringify(history))
            addButton(cityName)

                
               // .dt_txt: "2023-02-11 12:00:00")
        })

    })
    

})

// Function to empty out the articles
function clear() {
    $("#today").empty();
    $("#forecast").empty();
  }


// formats the response from Ajax call and calls the display function for both 5 day and today
function getWeather (response) {
    console.log(response);
    let cityName = response.city.name
    let forecast = response.list
    
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
    displayCurrentWeather(forecast[0], cityName)
}

function displayCurrentWeather(el, cityName){
        
        // Assign variables
        let icon = (el.weather[0].icon)
        let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
        let temp = JSON.stringify(el.main.temp)
        let wind = JSON.stringify(el.wind.speed)
        let humidity = JSON.stringify(el.main.humidity)
        // let description = JSON.stringify(el.weather[0].description)
        let date = myMoment.format('DD/MM/YYYY')
        const todayCard = $("<div class='todayCard'></div>")
        // Render to HTML
        // const iconDisplay = $(` `)
        const dateDisplay = $(`<h2 class="dateDisplay">${cityName} (${date}) <img src="${iconURL}" alt="todaysWeather"></h2> `)
        const tempDisplay = $(`<p class="tempDisplay">Temp: ${temp}°C </p>`)
        const windDisplay = $(`<p class="windDisplay">Wind: ${wind} KPH</p>`)
        const humidityDisplay = $(`<p class="humidityDisplay">Humidity: ${humidity}%</p>`)
        // const descriptionDisplay = $(`<p class="description">${description}</p>`)

        $("#today").append(todayCard)
        todayCard.append([dateDisplay, tempDisplay, windDisplay, humidityDisplay, ])
}

// Renders weather to HTML for the 5 day forecast
function display5DayWeather(el){
    
    // Assign variables
    let icon = (el.weather[0].icon)
    let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    let temp = JSON.stringify(el.main.temp)
    let wind = JSON.stringify(el.wind.speed)
    let humidity = JSON.stringify(el.main.humidity)
    let description = JSON.stringify(el.weather[0].description)
    let date = el.dt_txt.slice(0, 10).split("-")
    let englishDate = []
    date.map(function (el){
        return englishDate.unshift(el)
    })
    
    const forecastCard = $("<div class='card col-2 forecastCard'></div>")
    
    // Render to HTML
    const iconDisplay = $(`<img src="${iconURL}" alt="picOfWeather"> `)
    const dateDisplay = $(`<h5 class="dateDisplay">${englishDate[0]}/${englishDate[1]}/${englishDate[2]}</h5> `)
    const tempDisplay = $(`<p class="tempDisplay">Temp: ${temp} °C</p>`)
    const windDisplay = $(`<p class="windDisplay">Wind: ${wind} KPH</p>`)
    const humidityDisplay = $(`<p class="humidityDisplay">Humidity: ${humidity} %</p>`)
    // const descriptionDisplay = $(`<p class="description">${description}</p>`)
    $("#forecast").append(forecastCard)
    forecastCard.append([dateDisplay, iconDisplay, tempDisplay, windDisplay, humidityDisplay])
}

function addButton(cityName) {
    const newBtn = $(`<button data-name="${cityName}" class="historyBtns">${cityName}</button>`)
    $("#history").append(newBtn)
}






    