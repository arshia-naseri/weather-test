import React from "react"
export default function HourlyForcastItem({forcastItem, isMetric}){
    return (
        <section className='hourlyForcastItem'>
            <div className='hourlyForcastTime'>{forcastItem.Time}</div>
            <img className='hourlyForcastImage' src={'./accuWeather-icons/'+ forcastItem.WeatherIcon +'.svg'}/>
            <div className='hourlyForcastTemp'>{(isMetric) ? forcastItem.Temperature.Metric.Value : forcastItem.Temperature.Imperial.Value}°</div>
        </section>
    )
}