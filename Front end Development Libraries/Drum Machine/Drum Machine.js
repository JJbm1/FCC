const {useState, useEffect} = React;

const bank = [
  { key: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

function DrumPad({keyTrigger, clipId, clipUrl, onPlay}) {
  const playSound = () => {
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.play();
    onPlay(clipId);
  };
  
  const handleKeyPress = (e) => {
    if (e.ket.toUpperCase() === keyTrigger) {
      playSound();
    }
  };
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);
  
  return (
    <div className="drum-pad" id={clipId} onClick={playSound}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={clipUrl}></audio>
     </div>
  );
}

function App(){
  const [display, setDisplay] = useState("");
  
  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {bank.map((sound) => (
          <DrumPad 
            key={sound.key} 
            keyTrigger={sound.key}
            clipUrl = {sound.url}
            onPlay={(name) => setDisplay(name)}/>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
