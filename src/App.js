import React, {useState, useEffect} from "react";
import axios from "axios";
import apiURLs from './api-url-links';
import cities from './city-list'

import CurrentWeatherCondition from './CurrentWeatherCondition'
import CityName from './CityName'
import HourlyForcast from './HourlyForcast'
import DailyForcast from './DailyForcast'
import CityList from './CityList'
import ToggleMessuringType from './ToggleMessuringType'


import './styles.css'


function App() { 

  const [weather, setWeather] = useState()
  const [hourlyForcast, setHourlyForcast] = useState()
  const [dailyForcast, setDailyForcast] = useState()
  const [city, setCity] = useState('Toronto')
  

  const [isMetric, setIsMetric] = useState(true) 

  const [loadCurrentCondition,setLoadCurrentCondition] = useState(false)
  const [loadHourlyForcast,setLoadHourlyForcast] = useState(false)
  const [loadDailyForcast,setLoadDailyForcast] = useState(false)

  let newHourlyForcast = []
  let newDailyForcast = []
  let todayTempHighLow 
  let backgroundImageStyle = ''
  

  apiURLs.initURL(city)

  useEffect(()=>{
    getCurrentCondition()
    getHourlyForcast()
    getDailyForcast()

  },[])

  useEffect(()=>{
    setLoadCurrentCondition(false)
    setLoadHourlyForcast(false)
    setLoadDailyForcast(false)

    getCurrentCondition()
    getHourlyForcast()
    getDailyForcast()
  },[city])

  function getDailyForcast(){
    let cancel
    axios.get(apiURLs.getDailyForcastURL(),{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setDailyForcast(res.data.DailyForecasts)
      setLoadDailyForcast(true)
    })


    return () => cancel()
  }

  function getCurrentCondition(){
    let cancel
    axios.get(apiURLs.getCurrentConditionsURL(),{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setWeather(res.data[0])
      setLoadCurrentCondition(true)
    })


    return () => cancel()
  }

  function getHourlyForcast(){
    let cancel
    axios.get(apiURLs.getHourlyForcastURL(),{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setHourlyForcast(res.data)
      setLoadHourlyForcast(true)
    })


    return () => cancel()
  }

  function cleanOutHourlyForcast(){

    let countElement = 1
    hourlyForcast.forEach(hour => {
      let newElm = {}
      // time
      let time = parseInt(hour.DateTime.split('T')[1].split(':')[0])
      newElm.Key = countElement
      newElm.Time = (time === 0) ? '12 AM' :(time <= 12) ? time + ' AM': time - 12 + ' PM'
      // Temp
      newElm.Temperature = {
        Metric: {
          Value: Math.round(hour.Temperature.Value), 
          Unit: hour.Temperature.Unit
        },
        Imperial: {
          Value: Math.round((hour.Temperature.Value * 9/5) + 32), 
          Unit: 'F'
        }
      }
      // Weather Icon
      newElm.WeatherIcon = hour.WeatherIcon

      newHourlyForcast.push(newElm)

      countElement += 1
    })

  }

  function cleanOutDailyForcast(){
    let countElement = 1
    dailyForcast.forEach(day => {
      let newElm = {}
      
      // Name of the day
      let dayName
      switch (new Date(day.Date).getDay()) {
        case 0:
          dayName = "Sunday";
          break;
        case 1:
          dayName = "Monday";
          break;
        case 2:
          dayName = "Tuesday";
          break;
        case 3:
          dayName = "Wednesday";
          break;
        case 4:
          dayName = "Thursday";
          break;
        case 5:
          dayName = "Friday";
          break;
        case 6:
          dayName = "Saturday";
      }
      newElm.DayName = dayName

      // Weather Icon
      newElm.WeatherIcon = day.Day.Icon

      // High & Low Temp
      newElm.Temperature ={
        Maximum:{
          Metric:{
            Value: Math.round(day.Temperature.Maximum.Value),
            Unit: 'C'
          },
          Imperial:{
            Value: Math.round((day.Temperature.Maximum.Value * 9/5) + 32),
            Unit: 'F'
          }
        },
        Minimum:{
          Metric:{
            Value: Math.round(day.Temperature.Minimum.Value),
            Unit: 'C'
          },
          Imperial:{
            Value: Math.round((day.Temperature.Minimum.Value * 9/5) + 32),
            Unit: 'F'
          }
        }
      }

      // Key
      newElm.Key = countElement

      newDailyForcast.push(newElm)
      countElement += 1
    })

    todayTempHighLow = newDailyForcast[0]
    newDailyForcast.splice(0,1)
  }

  function showSideBarMenu(e){
    let darkBackgroundElm = document.getElementsByClassName('darkBackground')[0]
    let sideMenuPanel = document.getElementsByClassName('sideMenuPanel')[0]
    let sideMenuButton = document.getElementsByClassName('sideMenuButtonSection')[0]
    
    if (darkBackgroundElm.style.display === 'none' || darkBackgroundElm.style.display === ''){
      darkBackgroundElm.style.display = 'flex'
      sideMenuPanel.style.display = 'flex'
      sideMenuButton.classList.add('closeSideMenuButton')
    }
    else{
      darkBackgroundElm.style.display = 'none'
      sideMenuPanel.style.display = 'none'
      sideMenuButton.classList.remove('closeSideMenuButton')
    }
  }


  function selectCity(e){
    
      if(e.target.classList.contains('cityNameDiv') || e.target.classList.contains('selectorDiv')){

          setCity(e.target.parentElement.getElementsByClassName('cityNameDiv')[0].innerHTML)

      }else{
          setCity(e.target.getElementsByClassName('cityNameDiv')[0].innerHTML)
      }
  }


  if (!loadCurrentCondition || !loadHourlyForcast || !loadDailyForcast) {return 'Loading ....'}
  
  cleanOutHourlyForcast()
  cleanOutDailyForcast()

  if(!weather.IsDayTime){backgroundImageStyle='nightBackground'}
  else{backgroundImageStyle='dayBackground'}

  function toggleClick(e){
    setIsMetric(!isMetric)
  }

  return (
    <>
    <div className={'weatherPreviewBG '+backgroundImageStyle}>
      <section className='sideMenuButtonSection' onClick={showSideBarMenu}>
        <div></div><div></div><div></div>
      </section>

      <section className='darkBackground' onClick={showSideBarMenu}></section>
      <section className='sideMenuPanel'>
        <section className='sideMenuContainer'>
          <div className='sideBarTitle'>City</div>
          <CityList cityList ={cities.cityList} selectCity= {selectCity} currentCity={city}/>

          <div className='sideBarTitle'>Properties</div>
          <ToggleMessuringType isMetric={isMetric} toggleClick={toggleClick}/>
        </section>
      </section>

      
      <section className='weatherDetailSection'>

        <section className='leftPartPanel'>
          
          <CityName cityLocation={city}/>
          <CurrentWeatherCondition 
            tempDigit= {isMetric ? weather.Temperature.Metric: weather.Temperature.Imperial}
            imageSource = {'./accuWeather-icons/'+ weather.WeatherIcon +'.svg'}
            feelsTemp = {isMetric ? weather.RealFeelTemperature.Metric: weather.RealFeelTemperature.Imperial}
            currentWeatherText = {weather.WeatherText}
            humidity = {weather.RelativeHumidity}
            windSpeed = {isMetric ? weather.Wind.Speed.Metric: weather.Wind.Speed.Imperial}
            windDirection = {weather.Wind.Direction.English}
            highTemp = {isMetric ? todayTempHighLow.Temperature.Maximum.Metric.Value: todayTempHighLow.Temperature.Maximum.Imperial.Value}
            lowTemp = {isMetric ? todayTempHighLow.Temperature.Minimum.Metric.Value: todayTempHighLow.Temperature.Minimum.Imperial.Value}
          />
        </section>
        
        <section className='rightPartPanel'>
          
          <div className='sectionTitle'>Hourly Forcast</div>
          <HourlyForcast 
            hourlyForcastList = {newHourlyForcast} 
            isMetric = {isMetric}
          />

          <div className='sectionTitle'>Daily Forcast</div>
          <DailyForcast
            dailyForcastList = {newDailyForcast}
            isMetric = {isMetric}
          />
        </section>
      </section>
      
    </div>
    
    </>
  )
}

export default App;
