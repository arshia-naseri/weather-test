import React from "react"
export default function HourlyForcastItem({forcastItem, isMetric}){
    return (
        <section className='dailyForcastItem'>
            <div className='dailyNameDiv'>{forcastItem.DayName}</div>
            <img className='dailyForcastImage' width='30px'src={'./accuWeather-icons/'+ forcastItem.WeatherIcon +'.svg'}/>
            <div className='highTempDailyForcastDiv'>{(isMetric) ? forcastItem.Temperature.Maximum.Metric.Value : forcastItem.Temperature.Maximum.Imperial.Value}°</div>
            <div className='lowTempDailyForcastDiv'>{(isMetric) ? forcastItem.Temperature.Minimum.Metric.Value : forcastItem.Temperature.Minimum.Imperial.Value}°</div>
        </section>
    )
}