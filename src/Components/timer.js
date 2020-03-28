import React from 'react';

import Button from '@material-ui/core/Button';
import { Update, AlarmOff } from '@material-ui/icons';

function Timer(props) {
    
    const showTime = () => {
        const hours = String(Math.floor(props.time / 3600));
        const minutes = String(Math.floor((props.time%3600) / 60));
        const seconds = String((((props.time%3600)%60)));

        return (
            hours.padStart(2, '0') + ':' + 
            minutes.padStart(2, '0') + ':' + 
            seconds.padStart(2, '0')
        );
    }

    return (
        <div className="timer">
            <h3 title="Change focus mode" onClick={() => props.setNewState()}>
                {props.currentState.name}
                <Update 
                    fontSize="large" 
                />
            </h3>
            <div className="counter">
                <span onClick={() => props.showPopup()}>{showTime()}</span>
            </div>
            <div>
                <Button variant="contained" color="secondary" onClick={() => props.resetTimer()}>
                    <AlarmOff />
                </Button>
            </div>
        </div>
    );
}
    
export default Timer;
    