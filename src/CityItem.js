export default function CityItem ({city, selectCity, currentCity}){
    

    return(
        <section className= {`cityItemSection ${currentCity === city.cityName?'selectedCity':''}`} onClick={selectCity}>
            <div className='selectorDiv'></div>
            <div className='cityNameDiv'>{city.cityName}</div>
        </section>
    )
}