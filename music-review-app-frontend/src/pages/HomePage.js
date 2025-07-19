import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'; // Add this

function HomePage() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5100/api/albums')
      .then(res => setAlbums(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="homepage">
      <h1>🎵 MusicBoxd</h1>
      <p>Discover albums. Share your thoughts.</p>
      <div className="album-list">
        {albums.map(album => (
          <div key={album._id} className="album-card">
            <img src={album.coverImage} alt={album.title} />
            <h3>{album.title}</h3>
            <p><em>{album.artist}</em></p>
            <a href={`/albums/${album._id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;