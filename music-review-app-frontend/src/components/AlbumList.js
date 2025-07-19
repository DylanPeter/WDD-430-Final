import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/albums')
      .then(res => {
        setAlbums(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching albums:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading albums...</p>;

  return (
    <div className="album-list">
      {albums.map(album => (
        <div key={album._id} className="album-card">
          <h3>{album.title}</h3>
          <p>by {album.artist}</p>
          {album.coverImage && (
            <img src={album.coverImage} alt={album.title} width="150" />
          )}
          <Link to={`/albums/${album._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default AlbumList;