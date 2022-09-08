// get elements
const wrapper = document.querySelector(".wrapper"),
    // inputContent = document.querySelector(".input-content"),
    infoText = document.querySelector(".info-text"),
    inputField = document.querySelector("input[type=text]"),
    locationBtn = document.querySelector("button"),
    apiKey = "ee7c4b79648c7ec65f4c16b0b11a0ffe",
    returnArrow = document.querySelector("header i"),
    imgSrc = document.querySelector(".weather-container img")



// if user insert a city name
inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && inputField.value !== "") {
        getApi(inputField.value)
    }
})

// api function
function getApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fetchData(api)
}

//show weather details and if the city isnt vaild
function getWeatherDetails(data) {
    if (data.cod === "404") {
        // we can also use .replace .pending with .error
        infoText.classList.remove("pending")
        infoText.classList.add("error")
        infoText.innerHTML = `${inputField.value} isn't a vaild city name`
    }
    // else remove all classes and add to wrapper to show details
    else {
        infoText.classList.remove("pending", "error")
        wrapper.classList.add("active")

        // get the value
        let city = data.name,
            country = data.sys.country,
            description = data.weather[0].description,
            feelsLikeTemp = data.main.feels_like,
            humidity = data.main.humidity,
            mainTemp = data.main.temp,
            id = data.weather[0].id,
            minTemp = data.main.temp_min,
            maxTemp = data.main.temp_max

        // showing images depending on the id
        if (id === 800) {
            imgSrc.src = "imgs/clear.svg"
        }
        else if (id >= 200 && id <= 232) {
            imgSrc.src = "imgs/storm.svg"
        }
        else if (id >= 600 && id <= 622) {
            imgSrc.src = "imgs/snow.svg"
        }
        else if (id >= 701 && id <= 781) {
            imgSrc.src = "imgs/haze.svg"
        }
        else if (id >= 801 && id <= 804) {
            imgSrc.src = "imgs/cloud.svg"
        }
        else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            imgSrc.src = "imgs/rain.svg"
        }


        // pass their value to the html elements
        document.querySelector(".weather-container > .temp .number").innerHTML = `${Math.floor(mainTemp)}°C`
        document.querySelector(".weather").innerHTML = description
        document.querySelector(".col-feels .temp .number").innerHTML = Math.floor(feelsLikeTemp)
        document.querySelector(".col-humidity .number").innerHTML = `${Math.floor(humidity)}%`
        document.querySelector(".location span").innerHTML = `${city}, ${country}`
        document.querySelector(".col-min-heat .number").innerHTML = `${Math.floor(minTemp)}°`
        document.querySelector(".col-max-heat .number").innerHTML = `${Math.floor(maxTemp)}°`
    }
}

// ------------------------------------------------------- //

// get user location if btn pressed
locationBtn.addEventListener("click", () => {
    // if browser support geolocation
    if (navigator.geolocation) {
        // if we got the position then onSuccess fn will be called
        //if no then onError fn will be called cuz user 
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else {
        alert("Your browser does not support geolocation")
    }
})

// make the functions
function onSuccess(position) {
    let coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    }
    // console.log(coords)
    let locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`
    fetchData(locationApi)
}

function onError(error) {
    infoText.innerHTML = error.message
    infoText.classList.add("error")
}

// get data from api
function fetchData(apiLink) {
    infoText.innerHTML = "Getting Weather Details..."
    infoText.classList.add("pending")
    fetch(apiLink)
        .then(res => res.json())
        .then(result => getWeatherDetails(result))
}


// start new weather
returnArrow.addEventListener("click", () => {
    wrapper.classList.remove("active")
    inputField.value = ""
})



let time = document.querySelector(".time"),
    date = document.querySelector(".date")

//date and time
function dateAndTime() {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    let hours = new Date().getHours(),
    minutes = new Date().getMinutes(),
    month = new Date().getMonth(),
    theMonth = months[month],
    ampm = "AM"

    date.innerHTML = theMonth;

    if (hours >= 12) {
        hours = hours - 12;
        ampm = "PM";
    }
    hours === 0 ? (hours = 12) : hours

    hours = hours < 10 ? `0${hours}` : `${hours}`
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`

    time.innerHTML = `${hours} : ${minutes} ${ampm}`


}

setInterval(dateAndTime, 1000)