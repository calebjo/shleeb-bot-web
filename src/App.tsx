import { useEffect, useRef, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons';
import musicData from './data/tracks.json'

musicData.tracks = musicData.playlists.reduce((acc, playlist) => {
  return acc.concat(playlist.tracks);
}, []);

function App() {
  const [activeTab, setActiveTab] = useState("tracks");

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
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleTrackActivate = (track) => {
    if (!currentTrack) {
      setCurrentTrack(track);
    } else {
      setCurrentTrack(null)
    }
  }

  useEffect(() => {
    setTracks(musicData.tracks);
  }, []);

  const TrackElements =
    <>
      {tracks.map(((track, idx) => {
        return (
          <div className="column-item" key={idx}>
            <div className="action-button" onClick={() => handleTrackActivate(track)}>
              {currentTrack === track ?
                <FontAwesomeIcon icon={faPause} /> :
                <FontAwesomeIcon icon={faPlay} />}
            </div>
            <div className="title-container">
              {track.title}
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
  const [playlists, setPlaylists] = useState([]);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handlePlaylistActivate = (playlist) => {
    if (!playingPlaylist) {
      setPlayingPlaylist(playlist);
    } else {
      setPlayingPlaylist(null);
    }
  }

  const handleSelectPlaylist = (playlist) => {
    setDropdownVisible(!dropdownVisible);
    setSelectedPlaylist(playlist)
  }

  useEffect(() => {
    setPlaylists(musicData.playlists);
  }, []);

  const PlaylistElements =
    <>
      {playlists.map(((playlist, idx) => {
        return (
          <>
            <div className="column-item" key={idx} onClick={() => handleSelectPlaylist(playlist)}>
              <div className="action-button" onClick={() => handlePlaylistActivate(playlist)}>
                {playingPlaylist === playlist ?
                  <FontAwesomeIcon icon={faPause} /> :
                  <FontAwesomeIcon icon={faPlay} />}
              </div>
              <div className="title-container">
                {playlist.title}
              </div>
            </div>
            {(dropdownVisible && selectedPlaylist === playlist) &&
              <div className="column-dropdown">
                {playlist.tracks.map((track, idx) => {
                  return (
                    <div className="dropdown-row" key={`${idx}${track.title}`}>
                      {track.title}
                    </div>
                  )
                })}
              </div>
            }
          </>
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
