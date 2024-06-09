import { useState } from 'react'
import './App.css';
import './App.scss';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, ] = useState(1);
  const [forwardRate, setForwardRate] = useState(10);
  const [backwardRate, setBackwardRate] = useState(10);
  const [player, setPlayer] = useState(null);
  const [visibleList, setVisibleList] = useState(false); // Afficher ou masquer la liste des protagonistes

  const people1 = [
    { name: 'Todos', time: 0 },
    { name: 'Tía Rossy y Tío Andres', time: 0 },
    { name: 'Cristian y Dayana', time: 11 },
    { name: 'Don Robert', time: 17 },
    { name: 'Ginger', time: 36 },
    { name: 'Familia de Quito', time: 52 },
    { name: 'Ricci', time: 64 },
    { name: 'Tío Cecar', time: 71 },
    { name: 'Cheche y Tía Rosana', time: 77 },
    { name: 'Juan Pablo y su familia', time: 87 },
    { name: 'Tía Ana Emilia y Renato', time: 96 },
    { name: 'Don Didier', time: 152 },
    { name: 'Dona Raquel', time: 167 },
    { name: 'Valeria y Elisabeth', time: 174 },
    { name: 'Andreita', time: 207 },
    { name: 'Victor', time: 230 },
    { name: 'David', time: 272 },
    { name: 'Amiga Manaba', time: 293 },
    { name: 'Santiago', time: 339 },
    { name: 'Tiffany', time: 359 },
  ];

  const people2 = [
    { name: 'Dona Loly', time: 407 },
    { name: 'Lenin', time: 453 },
    { name: 'Manuelita', time: 474 },
    { name: 'Murya', time: 484 },
    { name: 'Edwin y Lolita', time: 507 },
    { name: 'Belen', time: 566 },
    { name: 'Cindy', time: 579 },
    { name: 'Mafer', time: 601 },
    { name: 'Analia', time: 638 },
    { name: 'Dona Ceci', time: 659 },
    { name: 'Dona Vicky', time: 668 },
    { name: 'Federico y Romeo', time: 698 },
    { name: 'Amiga de Manabi', time: 717 },
    { name: 'Anita Victoria', time: 740 },
    { name: 'Tito', time: 746 },
    { name: 'Max', time: 755 },
    { name: 'Tiana', time: 758 },
    { name: 'Roberto', time: 769 },
    { name: 'Ana Ligia', time: 782 },
    { name: 'Tifany', time: 816 },
    { name: 'Myriam y Bruno', time: 842 },
  ];

  const allPeople = [...people1, ...people2];

  const renderPersonOptions = (list) => {
    return list.map((person, index) => (
      <div key={index} onClick={() => goToTime(person.time)} className="person">
        {person.name}
      </div>
    ));
  };

  const renderSelectOptions = () => {
    return allPeople.map((person, index) => (
      <option key={index} value={person.time}>
        {person.name}
      </option>
    ));
  };

  const onPlayerReady = (event) => {
    const player = event.target;
    setPlayer(player);
    player.setPlaybackRate(playbackRate);
    player.setVolume(100); // Régler le volume au maximum
    player.unMute(); // Activer le son
    // Injection du script pour fermer automatiquement les pubs
    player.getIframe().contentWindow.postMessage('{"event":"command","func":"skipAd","args":""}', '*');
    setInterval(() => {
      player.getIframe().contentWindow.postMessage('{"event":"command","func":"skipAd","args":""}', '*');
    }, 1000);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds) => {
    const currentTime = player.getCurrentTime();
    player.seekTo(currentTime + seconds, true);
  };

  const handleForwardRate = (e) => {
    const newRate = parseInt(e.target.value, 10);
    setForwardRate(newRate);
  };

  const handleBackwardRate = (e) => {
    const newRate = parseInt(e.target.value, 10);
    setBackwardRate(newRate);
  };

  const goToTime = (time) => {
    player.seekTo(time, true);
  };

  const toggleVisibleList = () => {
    setVisibleList(!visibleList); // Inverser la visibilité de la liste des protagonistes
  };

  return (
    <>
      <header className="headerBox">
        <div className='fecu'>Feliz Cumpleaños </div>
        <div className="head"> Anita</div>
      </header>
      <main className='main'>
        <div className='mensaje'>De la parte de tus seres queridos con mucho amor</div>
        <div className="container">
          <div className="masterBox">
            <div className="lista1">
              {visibleList ? renderPersonOptions(people1) : null}
            </div>

            <YouTube
              className='vido-container'
              videoId="opk5C6K1zuU"
              opts={{
                playerVars: {
                  autoplay: 1, // Autoplay pour démarrer la vidéo automatiquement
                  mute: 0, // Désactiver la mise en sourdine par défaut
                },
              }}
              onReady={onPlayerReady}
            />
            <div className="lista2">
              {visibleList ? renderPersonOptions(people2) : null}
            </div>
          </div>

          <div className="controls">
          </div>
        </div>
      </main>
      <footer>
        <div className="regular">
          <div className="p1">
            <select value={backwardRate} onChange={handleBackwardRate}>
              <option value={10}>10sec</option>
              <option value={20}>20sec</option>
              <option value={50}>50sec</option>
              <option value={60}>1min</option>
              <option value={120}>2min</option>
              <option value={180}>3min</option>
            </select>
            <button className="skip" onClick={() => handleSkip(-backwardRate)}><FontAwesomeIcon icon={faArrowRotateLeft} /></button>

            <button onClick={handlePlayPause} className='button'>
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button className="skip" onClick={() => handleSkip(forwardRate)}><FontAwesomeIcon icon={faArrowRotateRight} /></button>
            <select value={forwardRate} onChange={handleForwardRate}>
              <option value={10}>10sec</option>
              <option value={20}>20sec</option>
              <option value={50}>50sec</option>
              <option value={60}>1min</option>
              <option value={120}>2min</option>
              <option value={180}>3min</option>
            </select>
          </div>
          <div className="p2">
            <div className="protagonistas" onClick={toggleVisibleList}>{visibleList ? "Ocultar" : "Los Protagonistas"}</div>
          </div>
        </div>
        <div className="cell">
          <div>
            <button className="button" onClick={handlePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
          <div className="selector">
            <select className="select" defaultValue={'Protagonistas'} onChange={(e) => goToTime(parseInt(e.target.value, 10))}>
              {renderSelectOptions()}
            </select>
          </div>
        </div>
      </footer>
    </>
  );
}


//makit



export default App
