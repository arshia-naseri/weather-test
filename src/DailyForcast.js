import DailyForcastItem from "./DailyForcastItem"
import React from "react"

export default function DailyForcast({dailyForcastList, isMetric}){

    return (
            <section className='daiylyForcastSection'>
                {dailyForcastList.map(forcastItem =>{
                return <DailyForcastItem key={forcastItem.Key} forcastItem={forcastItem} isMetric={isMetric}/>
                })}
            </section>
    )
}