const {useState, useEffect, useRef} = React;

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const beepRef = useRef(null);
  
  useEffect(() => {
    if (isSession) setTimeLeft(sessionLength * 60);
  }, [sessionLength, isSession]);
  
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 0) {
            beepRef.current.play();
            if (isSession) {
              setIsSession(false);
              return breakLength * 60;
            } else {
              setIsSession(true);
              return sessionLength * 60;
            }
          }
          return prev - 1;
        })
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isSession, breakLength, sessionLength]);
  
  const formatTime = (time) => {
    const minutes = Math.floor(time/60).toString().padStart(2,"0");
    const seconds = (time%60).toString().padStart(2,"0");
    return `${minutes}:${seconds}`;
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25*60);
    setIsSession(true);
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
  };
  
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  
  const changeBreak = (amount) => {
    if (!isRunning) {
      setBreakLength(prev => {
        let newVal = prev + amount;
        if (newVal < 1) return 1;
        if (newVal > 60) return 60;
        return newVal;
      });
      if (!isSession) setTimeLeft((breakLength + amount) * 60);
    }
  };
  
  const changeSession = (amount) => {
    if (!isRunning) {
      setSessionLength(prev => {
        let newVal = prev + amount;
        if(newVal < 1) return 1;
        if(newVal > 60) return 60;
        return newVal;
      });
      if (isSession) setTimeLeft((sessionLength + amount) * 60);
    }
  };
  
  return (
    React.createElement('div', {className: 'container'},
      React.createElement('h1', null, '25 + 5 Clock'),
    
      React.createElement('div', {className: 'length-controls'},
        React.createElement('div', {className: 'break-control'},
          React.createElement('h2', {id: 'break-label'}, 'Break Length'),
          React.createElement('button', {id: 'break-decrement', onClick: () => changeBreak(-1)}, '-'),
          React.createElement('span', {id: 'break-length'}, breakLength),
          React.createElement('button', {id: 'break-increment', onClick: () => changeBreak(1)}, '+')
        ),
        React.createElement('div', {className: 'session-control'},
          React.createElement('h2', {id: 'session-label'}, 'Session Length'),
          React.createElement('button', {id: 'session-decrement', onClick: () => changeSession(-1)}, '-'),
          React.createElement('span', {id: 'session-length'}, sessionLength),
          React.createElement('button', {id: 'session-increment', onClick: () => changeSession(1)}, '+')
        )
      ),

      React.createElement('div', {className: 'timer'},
        React.createElement('h2', {id: 'timer-label'}, isSession ? 'Session' : 'Break'),
        React.createElement('span', {id: 'time-left'}, formatTime(timeLeft))
      ),

      React.createElement('div', {className: 'controls'},
        React.createElement('button', {id: 'start_stop', onClick: handleStartStop}, 'Start / Stop'),
        React.createElement('button', {id: 'reset', onClick: handleReset}, 'Reset')
      ),

      React.createElement('audio', {
        id: 'beep',
        ref: beepRef,
        src: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
      })
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
