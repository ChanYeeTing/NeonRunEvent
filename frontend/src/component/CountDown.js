import React, { useState, useEffect,useMemo } from 'react';
import './CountDown.css'
function CountDown ()
{
    const deadline = useMemo(() => new Date(2025, 6, 10), []);
    const [days, setDays] = useState(0);
    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const currentDate = new Date();
            const timeLeft = deadline.getTime() - currentDate.getTime();
    
            const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
            const hours = 23 - currentDate.getHours();
            const minutes = 59 - currentDate.getMinutes();
            const seconds = 59 - currentDate.getSeconds();
    
            setDays(days);
            setTimer({ hours, minutes, seconds });
        };
    
        calculateTimeLeft();
        const intervalId = setInterval(calculateTimeLeft, 1000);
    
        return () => clearInterval(intervalId);
    }, [deadline]);

    const TimeBox = ({ label, value }) => (
        <div className="container">
            <p className="p1">{label}</p>
            <p className="p2">{value}</p>
        </div>
    );

    return (
        <div className='containerCount'>
            <div className="containerCountDown">
                <h1>Event Left</h1>
                <div className="timer">
                    <TimeBox label="Days" value={days} />
                    <TimeBox label="Hours" value={timer.hours} />
                    <TimeBox label="Minutes" value={timer.minutes} />
                    <TimeBox label="Seconds" value={timer.seconds} />
                </div>
            </div>
        </div>
    );
};

export default CountDown;
