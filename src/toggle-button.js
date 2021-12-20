export default function toggleButton({isMetric, toggleClick}){
    return(
        <div className={`toggleBorder ${isMetric?'clickedToggle':''}`} onClick={toggleClick}>
            <div className='toggleBall'></div>
        </div>
    )
}