import React, {useState} from 'react';

import Button from '@material-ui/core/Button';

function TimerPopup(props) {

    const splitTime = (timeInSeconds) => {
        const hours = String(Math.floor(timeInSeconds / 3600));
        const minutes = String(Math.floor((timeInSeconds%3600) / 60));
        const seconds = String((((timeInSeconds%3600)%60)));

        return {
            hours: hours.padStart(2, '0'),
            minutes: minutes.padStart(2, '0'),
            seconds: seconds.padStart(2, '0')
        };
    }

    const [times, setTimes] = useState({
       focus: splitTime(props.focusTime),
       shortBreak: splitTime(props.shortBreakTime),
       longBreak: splitTime(props.longBreakTime)
    });

    const onChangeTimes = (input, time, event) => {
        let newTimes = JSON.parse(JSON.stringify(times));
        newTimes[input][time] = event.target.value;
        setTimes(newTimes);
    }

    const onSubmit = () => {
        const timerValues = {
            focus: parseInt(times.focus.hours)*3600 + parseInt(times.focus.minutes)*60 + parseInt(times.focus.seconds),
            shortBreak: parseInt(times.shortBreak.hours)*3600 + parseInt(times.shortBreak.minutes)*60 + parseInt(times.shortBreak.seconds),
            longBreak: parseInt(times.longBreak.hours)*3600 + parseInt(times.longBreak.minutes)*60 + parseInt(times.longBreak.seconds)
        }

        props.setTimer(timerValues);
        props.hidePopup();
    }

    return (
        <div className="overlay">
            <div className="timerPopup">
                <section>
                    <h3>Focus</h3>
                    <input type="number" name="hours" value={times.focus.hours} onChange={(event) => onChangeTimes('focus', 'hours', event)} />
                    :
                    <input type="number" name="minutes" value={times.focus.minutes} onChange={(event) => onChangeTimes('focus', 'minutes', event)} />
                    :
                    <input type="number" name="seconds" value={times.focus.seconds} onChange={(event) => onChangeTimes('focus', 'seconds', event)} />
                </section>

                <section>
                    <h3>Short break</h3>
                    <input type="number" name="hours" value={times.shortBreak.hours} onChange={(event) => onChangeTimes('shortBreak', 'hours', event)} />
                    :
                    <input type="number" name="minutes" value={times.shortBreak.minutes} onChange={(event) => onChangeTimes('shortBreak', 'minutes', event)} />
                    :
                    <input type="number" name="seconds" value={times.shortBreak.seconds} onChange={(event) => onChangeTimes('shortBreak', 'seconds', event)} />
                </section>

                <section>
                    <h3>Long break</h3>
                    <input type="number" name="hours" value={times.longBreak.hours} onChange={(event) => onChangeTimes('longBreak', 'hours', event)} />
                    :
                    <input type="number" name="minutes" value={times.longBreak.minutes} onChange={(event) => onChangeTimes('longBreak', 'minutes', event)} />
                    :
                    <input type="number" name="seconds" value={times.longBreak.seconds} onChange={(event) => onChangeTimes('longBreak', 'seconds', event)} />
                </section>

                <Button variant="contained" color="primary" onClick={() => onSubmit()}>
                    Set Timer
                </Button>
                &nbsp;&nbsp;
                <Button variant="contained" color="secondary" onClick={() => props.hidePopup()}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
    
export default TimerPopup;
    