import React, { useState, useEffect, useRef } from 'react';

import Progress from './Components/progress';
import Timer from './Components/timer';
import TimerPopup from './Components/timerPopup';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'react-circular-progressbar/dist/styles.css';
import './assets/css/main.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#64908A',
        },
        secondary: {
            main: '#CC2A41',
        },
    },
});

function App() {
    const [totalTime, setTotalTime] = useState(3);
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(totalTime);
    const [percentage, setPercentage] = useState(0);
    const [finished, setFinished] = useState(false);
    
    const [focusTime, setFocusTime] = useState(totalTime);
    const [shortBreakTime, setShortBreakTime] = useState(300);
    const [longBreakTime, setLongBreakTime] = useState(600);
    
    const [timerPopup, setTimerPopup] = useState(false);

    const states = [
        {index: 'focus', name: 'Focus'},
        {index: 'shortBreak', name: 'Short Break'},
        {index: 'longBreak', name: 'Long Break'}
    ];

    const [currentState, setCurrentState] = useState('focus');
    const [finishedSessions, setFinishedSessions] = useState([]);

    let timer = useRef(null);

    useEffect(() => {  
        if(running) {
            timer.current = setTimeout(() => {
                setTime(time-1);
            }, 1000);
    
            if(time === 0) {
                setRunning(false);
                setFinished(true);
                clearTimeout(timer.current);
            }
        } else {
            clearTimeout(timer.current);
        }
    }, [running, time, timer]);

    useEffect(() => {
        const perc = 100 - (time * 100) / totalTime;
        setPercentage(perc);
    }, [totalTime, time]);

    const toggleTimer = () => {
        if(time === 0) {
            resetTimer();
            setRunning(true);
        } else {
            setFinished(false);
            setRunning(!running);
        }
    }

    const resetTimer = (change) => {
        
        let state = currentState;
        if(finished || change) {
            state = changeState();
        }
        
        clearTimeout(timer.current);

        let newTime = focusTime;
        switch(state) {
            case 'shortBreak':
                newTime = shortBreakTime;
                break;
            case 'longBreak':
                newTime = longBreakTime;
                break;
            default:
                newTime = focusTime;
                break;
        }
                    
        setTotalTime(newTime);
        setTime(newTime);
        setFinished(false);
        setRunning(false);
    }

    const showPopup = () => {
        setTimerPopup(true);
    }

    const hidePopup = () => {
        setTimerPopup(false);
    }

    const setTimer = (times) => {
        setFocusTime(times.focus);
        setShortBreakTime(times.shortBreak);
        setLongBreakTime(times.longBreak);
        
        if(!running) {
            setTotalTime(times.focus);
            setTime(times.focus);
        } else {
            if(time < times.focus) {
                setTotalTime(times.focus);
            } else {
                clearTimeout(timer.current);
                
                setTotalTime(times.focus);
                setTime(times.focus);
                setRunning(true);
                
            }
        }
    }

    const changeState = () => {
        const newFinishedSessions = finishedSessions.map(item => item);
        newFinishedSessions.push(currentState);
        setFinishedSessions(newFinishedSessions);

        const finishedFocus = newFinishedSessions.filter(item => item === 'focus');
        
        let state = 'empty';
        if(finishedFocus.length === 4) {
            setCurrentState('longBreak');
            setFinishedSessions([]);
            state = 'longBreak';
        } else {
            state = currentState === 'focus' ? 'shortBreak' : 'focus';
            setCurrentState(state);
        }
        
        return state;
    }

    const setNewState = () => {
        resetTimer(true);
    }

    return (
        <div className="main">
            <h1>Tomato Timer</h1>

            <Progress percentage={percentage} toggleTimer={toggleTimer} finished={finished} />
            <ThemeProvider theme={theme}>
                <Timer 
                    time={time} 
                    resetTimer={resetTimer} 
                    showPopup={showPopup} 
                    currentState={states.filter(item => item.index === currentState)[0]}
                    states = {states}
                    setNewState = {setNewState}
                    />
                {
                    timerPopup && 
                        <TimerPopup 
                            hidePopup={hidePopup} 
                            focusTime={focusTime}
                            shortBreakTime={shortBreakTime}
                            longBreakTime={longBreakTime}
                            setTimer={setTimer}
                            />
                }
            </ThemeProvider>
        </div>
        );
    }
    
    export default App;
    