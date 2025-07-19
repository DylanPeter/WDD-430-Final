import { useEffect } from 'react';
import axios from 'axios';

function FetchDeezerAlbums() {
  useEffect(() => {
    const PROXY = 'https://cors-anywhere.herokuapp.com/';
    const URL = 'https://api.deezer.com/search/album?q=taylor';

    axios.get(PROXY + URL)
      .then(res => {
        const cleaned = res.data.data.map(album => ({
          title: album.title,
          artist: album.artist.name,
          coverImage: album.cover_big,
          releaseDate: '2000-01-01',
          genre: 'Pop'
        }));
        console.log(cleaned);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  return <p>Check the console for album data</p>;
}

export default FetchDeezerAlbums;