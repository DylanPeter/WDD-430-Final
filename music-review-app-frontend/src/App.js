import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import UserProfile from './pages/UserProfile.js';
import FetchDeezerAlbums from './utils/FetchDeezerAlbums';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/users/:id" element={<UserProfile />} />
        {/* 🔧 Temporary route for fetching Deezer albums */}
        <Route path="/debug/deezer" element={<FetchDeezerAlbums />} />
      </Routes>
    </Router>
  );
}

export default App;