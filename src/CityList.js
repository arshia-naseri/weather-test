import CityItem  from "./CityItem"
export default function CityList({cityList, selectCity, currentCity}){
    return (
        <section className='cityListSection'>
            {cityList.map(city =>{
                return <CityItem key={city.apiID} city={city} selectCity={selectCity} currentCity={currentCity}/>
            })}
        </section>
    )
}