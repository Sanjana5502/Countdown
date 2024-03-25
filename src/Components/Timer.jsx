import React, { useEffect, useState } from 'react';
import './timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let timer;

  useEffect(() => {
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive]);

  const restart = () => {
    clearInterval(timer);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  const stop = () => {
    setIsActive(false);
    clearInterval(timer);
  };

  return (
    <div className='timer'>
      <div className='container'>
        <div className='timer_container'>
          <h1>Timer</h1>
          <h2>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</h2>
          {isActive ? (
            <button onClick={stop} className='stop'>
              Stop
            </button>
          ) : (
            <button onClick={() => setIsActive(true)} className='start'>
              Start
            </button>
          )}
          <button onClick={restart} className='restart'>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
