export default function CurrentWeatherCondition({tempDigit, imageSource, feelsTemp, currentWeatherText, humidity, windSpeed, windDirection, highTemp, lowTemp}){
    return(

        <section className='currentWeatherSection'>
            <section className='currentWeatherNumaricSection'> 
                <section className='currentWeatherDigit'>
                    <section className='nowWeatherDigit'>{Math.round(tempDigit.Value)}°</section>
                    <section className='tempDigitType'>{tempDigit.Unit}</section>
                </section>
                <section className='feelsSection'>Feels: {Math.round(feelsTemp.Value)}°</section>
                <section className='currentConditionHighTemp'>H: {highTemp}°</section>
                <section className='currentConditionLowTemp'>L: {lowTemp}°</section>
            </section>
            <div className='currentWeatherImagery'>
                <img className='currentWeatherIcon' src={imageSource}/>
                <section className='currentWeatherText'>{currentWeatherText}</section>

                <section className='currentWeatherStatus'>
                    <section className='currentHumidity'>Humidity: <b>{humidity}%</b></section>
                    <section className='currentWind'>Wind: <b>{Math.round(windSpeed.Value)} {windSpeed.Unit}</b></section>
                    <section className='currentDirection'>Direction: <b>{windDirection}</b></section>
                </section>
            </div>

        </section>
    )
}