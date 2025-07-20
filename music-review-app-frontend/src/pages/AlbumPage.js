import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './albumPage.css'

function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: '', comment: '' });

  // Fetch album data
  useEffect(() => {
    axios.get(`http://localhost:5100/api/albums/${id}`)
      .then(res => setAlbum(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Fetch reviews for this album
  useEffect(() => {
    axios.get(`http://localhost:5100/api/reviews/album/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Submit a new review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.rating || !form.comment) return;
    console.log('Submitting review:', form, 'Album ID:', id);

    axios.post('http://localhost:5100/api/reviews', {
      albumId: id,
      rating: Number(form.rating),
      comment: form.comment
    }).then(res => {
      setReviews([...reviews, res.data]);
      setForm({ rating: '', comment: '' });
    }).catch(err => console.error(err));
  };

  if (!album) return <div>Loading album...</div>;

  return (
    <div className="album-page">
  <div className="album-info">
    <img src={album.coverImage} alt={album.title} />
    <div className="album-meta">
      <h1>{album.title}</h1>
      <p><em>{album.artist}</em></p>
    </div>
  </div>

  <hr />

  <div className="review-form">
    <h2>Leave a Review</h2>
    <form onSubmit={handleSubmit}>
      <label className='rating'>Rating (1–5):</label>
      <select
        value={form.rating}
        onChange={e => setForm({ ...form, rating: e.target.value })}
      >
        <option value="" className='select'>Select</option>
        {[1, 2, 3, 4, 5].map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <label className='comment'>Comment:</label>
      <textarea
        rows="4"
        value={form.comment}
        onChange={e => setForm({ ...form, comment: e.target.value })}
      />

      <button type="submit" className='submit-review'>Submit Review</button>
    </form>
  </div>

  <hr />

  <div className="reviews-section">
    <h2>Reviews</h2>
    {reviews.length === 0 && <p className="no-reviews">No reviews yet.</p>}
    <div className="reviews-list">
      {reviews.map((r, i) => (
        <div key={i} className="review-card">
          <div className="stars">{'⭐️'.repeat(r.rating)}</div>
          <p className="comment">"{r.comment}"</p>
          <p className="date">{new Date(r.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}

export default AlbumPage;