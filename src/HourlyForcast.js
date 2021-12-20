import HourlyForcastItem from "./HourlyForcastItem"
import React from "react"

export default function HourlyForcast({hourlyForcastList, isMetric}){
    
    return(
            <section className='hourlyForcastSection'>
                {hourlyForcastList.map(forcastItem =>{
                return <HourlyForcastItem key={forcastItem.Key} forcastItem={forcastItem} isMetric={isMetric}/>
                })}
            </section>
    )
}