import cityList from "./city-list"

let currentConditionsURL 
let hourlyForcastURL 
let dailyForcastURL


function initURL(cityName){
    let cityID = (cityList.cityList.find((elm) => elm.cityName === cityName)).apiID

    // let key = 'pGuO66eACAaohMRWg609GScW6WhSfrBS'
    let key = 'AGGlEh0AJojABzAfRuCHS7obG6AB9arV'

    currentConditionsURL = `http://dataservice.accuweather.com/currentconditions/v1/${cityID}?apikey=${key}&details=true`
    hourlyForcastURL = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityID}?apikey=${key}&metric=true`
    dailyForcastURL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityID}?apikey=${key}&metric=true`

}

function getCurrentConditionsURL(){
    return currentConditionsURL
}

function getHourlyForcastURL(){
    return hourlyForcastURL
}

function getDailyForcastURL(){
    return dailyForcastURL
}


export default {initURL ,getCurrentConditionsURL, getHourlyForcastURL, getDailyForcastURL}

// AGGlEh0AJojABzAfRuCHS7obG6AB9arV