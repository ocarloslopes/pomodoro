import React, { useState, useEffect } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import tomato from '../assets/images/il_pomodoro.png';
import alarm from '../assets/audio/alarm_clock.mp3';

function Progress(props) {
    const [imgClass, setImgClass] = useState('tomato');

    useEffect(() => {
        if(props.finished) {
            var audio = new Audio(alarm);
            audio.play();
            setImgClass('tomato shake');
            setTimeout(() => {setImgClass('tomato')}, 4000);
        }
    }, [props.finished]);

    return (
        <div className="progress">
            <CircularProgressbar 
                value={props.percentage} 
                text='' 
                styles={buildStyles({
                    pathColor: '#64908A',
                    trailColor: '#424254'
                })}
            />
            <img src={tomato} className={imgClass} alt="tomato" onClick={(ev) => {
                props.toggleTimer();
            }} />
        </div>
    );
}
    
export default Progress;
    