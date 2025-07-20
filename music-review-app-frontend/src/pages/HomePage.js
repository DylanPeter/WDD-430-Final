import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [importId, setImportId] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const [albums, setAlbums] = useState([]);

  // Fetch albums on load
  useEffect(() => {
    axios.get('http://localhost:5100/api/albums')
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Error fetching albums:', err));
  }, []);

  // Handle Deezer album import
  const handleImport = async (e) => {
    e.preventDefault();
    if (!importId) return;
  
    try {
      console.log('Importing album:', importId);
      const res = await axios.post('http://localhost:5100/api/albums/import', { name: importId });
      console.log('Import response:', res.data);
  
      setImportStatus(`✅ Imported: ${res.data.title}`);
      setImportId('');
  
      const updated = await axios.get('http://localhost:5100/api/albums');
      setAlbums(updated.data);
    } catch (err) {
      console.error('Error importing album:', err.response?.data || err.message);
      setImportStatus('⚠️ Failed to import album.');
    }
  };
  return (
<div className="home-container">
      <h1>🎵 MusicBoxd</h1>
      <p>Discover albums. Share your thoughts.</p>
  <form onSubmit={handleImport} className="import-form">
    <input
      type="text"
      placeholder="Search album by name"
      value={importId}
      onChange={(e) => setImportId(e.target.value)}
    />
    <button type="submit">Import Album</button>
  </form>

  {importStatus && <p className="import-status">{importStatus}</p>}

  <div className="album-grid">
        {albums.map(album => (
          <Link to={`/albums/${album._id}`} key={album._id} className="album-card">
            <img src={album.coverImage} alt={album.title} />
            <h3>{album.title}</h3>
            <p>{album.artist}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default HomePage;