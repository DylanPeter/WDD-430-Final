import { useState } from 'react';

function ReviewForm({ onAddReview }) {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || isNaN(rating) || rating < 0 || rating > 10) {
      alert('Please enter a valid rating (0–10)');
      return;
    }
    onAddReview({
      rating: Number(rating),
      text,
      createdAt: new Date().toISOString()
    });
    setRating('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <h4>Leave a Review</h4>
      <label>
        Rating (0–10):<br />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="10"
          required
        />
      </label>
      <br />
      <label>
        Your Thoughts:<br />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
          required
        />
      </label>
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;