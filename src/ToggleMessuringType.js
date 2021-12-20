import ToggleButton from './toggle-button'

export default function ToggleMessuringType ({isMetric,toggleClick}){
    return(
        <section className='messuringTypeSection'>
            <ToggleButton isMetric={isMetric} toggleClick={toggleClick}/>
            <div className='messuringTypeText'>Metric</div>
        </section>
    )
}