import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons';

const mockTracks = [
  { title: "Echoes from the Celestial Abyss", duration: 480, playlists: ["Space Odyssey", "Cosmic Sounds"] },
  { title: "Whispers of the Enchanted Forest", duration: 600, playlists: ["Fantasy Realm", "Magical Journey"] },
  { title: "Ethereal Symphony of Moonlit Dreams", duration: 720, playlists: ["Harmony Haven", "Soothing Ensemble"] },
  { title: "Midnight Serenade by the Seaside", duration: 540, playlists: ["Relaxation Station", "Nighttime Melodies"] },
  { title: "Metropolis Chronicles: Neon Nights", duration: 420, playlists: ["Chill Vibes", "Retrowave"] },
  { title: "Chronicles of the Cosmic Voyager", duration: 600, playlists: ["Ambient Exploration", "Immersive Journey"] },
  { title: "Reflections in the Sunset's Embrace", duration: 480, playlists: ["Reflective Moments", "Twilight Emotions"] },
  { title: "Harmonic Rhythms of the Whispering Winds", duration: 540, playlists: ["Calming Breeze", "Peaceful Ambiance"] },
  { title: "Celestial Dreamscape Chronicles", duration: 600, playlists: ["Dreamscapes", "Ambient Journeys"] },
  { title: "Serenade for the Dancing Fireflies", duration: 360, playlists: ["Chill Vibes", "Summer Mix"] },
  { title: "Symphony of the Mystic Aurora", duration: 720, playlists: ["Magical Aura", "Enigmatic Sounds"] },
  { title: "Mystical Overture in the Enchanted Garden", duration: 540, playlists: ["Meditation Mix", "Calming Sounds"] },
  { title: "Astral Waltz Among the Cosmos", duration: 420, playlists: ["Galactic Dance", "Cosmic Beats"] },
  { title: "Journey Through the Elysian Fields", duration: 600, playlists: ["Chill Vibes", "Mythical Tales"] },
  { title: "Melodies of the Ethereal Harmonies", duration: 360, playlists: ["Tranquil Melodies", "Inner Peace"] },
  { title: "Sonic Odyssey in the Enigmatic Abyss", duration: 540, playlists: ["Ambient Odyssey", "Mysterious Depths"] },
  { title: "Whispered Tales of Forgotten Realms", duration: 480, playlists: ["Lost Legends", "Epic Journeys"] },
  { title: "Chronicles of the Everlasting Serenity", duration: 720, playlists: ["Soothing Chronicles", "Eternal Peace"] },
  { title: "Rhythms of the Cosmic Infinity", duration: 420, playlists: ["Chill Vibes", "Universal Beats"] },
  { title: "Mystic Journey Across Ethereal Horizons", duration: 600, playlists: ["Mystical Adventures", "Enchanted Landscapes"] },
];

const mockPlaylists = [
  { name: "Epic Soundscapes", tracks: ["Metropolis Chronicles: Neon Nights", "Serenade for the Dancing Fireflies", "Journey Through the Elysian Fields", "Rhythms of the Cosmic Infinity"] },
  { name: "Mythical Tales", tracks: [] },
  { name: "Meditation Mix", tracks: [] },
  { name: "Mystical Adventures", tracks: [] },
  { name: "Enchanted Landscapes", tracks: [] },
  { name: "Mysterious Depths", tracks: [] }
]

function App() {
  const [activeTab, setActiveTab] = useState("tracks");

  const handleUploadClick = () => {
    console.log("Handling upload click!");
  }

  return (
    <>
      <div className="app">
        <div className="top-bar">
        </div>
        <div className="nav-bar">
          <div className="nav-bar-sub">
            <button className={activeTab === "tracks" ? "selected" : ""} onClick={() => setActiveTab("tracks")}>Tracks</button>
            <button className={activeTab === "playlists" ? "selected" : ""} onClick={() => setActiveTab("playlists")}>Playlists</button>
          </div>
          <div className="nav-bar-sub">
            <button onClick={() => handleUploadClick()}>Upload Track<FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
          </div>
        </div>
        <div className="body-container">
          {activeTab === "tracks" ?
            <TracksContent />
            :
            <PlaylistsContent />
          }
        </div>
      </div>
    </>
  )
}

const TracksContent = () => {
  const [trackIsPlaying, setTrackisPlaying] = useState(false);

  const handleTrackActivate = () => {
    console.log("Playing or pausing a track...!");
    setTrackisPlaying(!trackIsPlaying);
  }

  const TrackElements =
    <>
      {mockTracks.map((track => {
        return (
          <div className="column-item">
            <div className="action-button" onClick={() => handleTrackActivate()}>
              {trackIsPlaying ?
                <FontAwesomeIcon icon={faPlay} /> :
                <FontAwesomeIcon icon={faPause} />}
            </div>
            <div className="title-container">
              {track.title}
            </div>
            <div>
              {track.duration}
            </div>
          </div>
        )
      }))}
    </>
  return (
    <div className="inner-content-container">
      {TrackElements}
    </div>
  )
}

const PlaylistsContent = () => {
  const PlaylistElements =
    <>
      {mockPlaylists.map((playlist => {
        return (
          <div className="column-item">
            {playlist.name}
          </div>
        )
      }))}
      <div>
      </div>
    </>
  return (
    <div className="inner-content-container">
      {PlaylistElements}
    </div>
  )
}

export default App
