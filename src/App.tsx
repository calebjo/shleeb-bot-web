import { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faForward,
  faTrashCan,
  faPhoneSlash,
  faShuffle
} from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import musicData from './data/tracks.json';
import axios from 'axios';

const playTrack = (source) => axios.post(`http://127.0.0.1:5000/play/query?query=${source}`);
const pauseTrack = () => axios.post(`http://127.0.0.1:5000/pause`);
const skipTrack = () => axios.post(`http://127.0.0.1:5000/skip`);
const clearQueue = () => axios.post(`http://127.0.0.1:5000/clear`);
const disconnect = () => axios.post(`http://127.0.0.1:5000/disconnect`);
const toggleFade = () => axios.post(`http://127.0.0.1:5000/fade`);
const toggleShuffle = () => { };
const setVolume = (value) => axios.post(`http://127.0.0.1:5000/volume/${value}`);

musicData.tracks = musicData.playlists.reduce((acc, playlist) => {
  return acc.concat(playlist.tracks);
}, []);

function App() {
  const [activeTab, setActiveTab] = useState<string>("tracks");
  const [volume, setVolume] = useState<number>(30);
  const [fadeVolume, setFadeVolume] = useState<boolean>(false);

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleFadeChange = () => {
    setFadeVolume(!fadeVolume);
    toggleFade();
  }

  return (
    <>
      <div className="app">
        <div className="top-bar">
        </div>
        <div className="nav-bar">
          <div className="nav-bar-sub">
            <button className={activeTab === "tracks" ? "selected" : ""} onClick={() => setActiveTab("tracks")}>Tracks</button>
            <button disabled={true} className={activeTab === "playlists" ? "selected" : ""} onClick={() => setActiveTab("playlists")}>Playlists</button>
          </div>
          <div className="nav-bar-sub">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faPause} size={"2x"} onClick={() => pauseTrack()} />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faForward} size={"2x"} onClick={() => skipTrack()} />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faTrashCan} size={"2x"} onClick={() => clearQueue()} />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faPhoneSlash} size={"2x"} onClick={() => disconnect()} />
            </div>
          </div>
          <div className="nav-bar-sub">
            <button className={fadeVolume ? "small activated" : "small"} onClick={() => handleFadeChange()}>Fade Volume</button>
          </div>
          <div className="nav-bar-sub volume">
            <Box sx={{ width: 200 }}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDown />
                <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} />
                <VolumeUp />
              </Stack>
            </Box>
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

  const checkPlaylist = (track) => {
    let matchedPlaylist;
    musicData.playlists.forEach((playlist) => {
      playlist.tracks.forEach((playlistTrack) => {
        if (track.title === playlistTrack.title) {
          matchedPlaylist = playlist.title;
        }
      })
    })
    return matchedPlaylist;
  }

  const TrackElements =
    <>
      {tracks.map(((track, idx) => {
        return (
          <div className="column-item" key={idx}>
            <div className="action-button" onClick={() => handleTrackActivate(track)}>
              {currentTrack === track ?
                <FontAwesomeIcon icon={faPause} onClick={() => pauseTrack()} /> :
                <FontAwesomeIcon icon={faPlay} onClick={() => playTrack(track.source)} />}
            </div>
            <div className="title-container">
              {track.title}
            </div>
            <div className="playlist-tag">
              {checkPlaylist(track)}
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
                  <FontAwesomeIcon icon={faPause} onClick={() => pauseTrack()} /> :
                  <FontAwesomeIcon icon={faPlay} onClick={() => playTrack(playlist.tracks[0].source)} />}
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
