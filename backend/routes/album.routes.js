const express = require('express');
const router = express.Router();

// Temporary mock data
let albums = [
    {
      _id: '4',
      title: 'Fearless (Taylor’s Version)',
      artist: 'Taylor Swift',
      genre: 'Pop',
      releaseDate: '2021-04-09',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Taylor_Swift_-_Fearless_%28Taylor%27s_Version%29.png'
    },
    {
      _id: '5',
      title: 'DAMN.',
      artist: 'Kendrick Lamar',
      genre: 'Hip-Hop',
      releaseDate: '2017-04-14',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png'
    },
    {
      _id: '6',
      title: 'Melodrama',
      artist: 'Lorde',
      genre: 'Alternative',
      releaseDate: '2017-06-16',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lorde_-_Melodrama.png'
    },
    {
      _id: '7',
      title: 'After Hours',
      artist: 'The Weeknd',
      genre: 'R&B',
      releaseDate: '2020-03-20',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png'
    },
    {
      _id: '8',
      title: 'evermore',
      artist: 'Taylor Swift',
      genre: 'Indie Pop',
      releaseDate: '2020-12-11',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Taylor_Swift_-_Evermore.png'
    },
    {
      _id: '9',
      title: 'good kid, m.A.A.d city',
      artist: 'Kendrick Lamar',
      genre: 'Hip-Hop',
      releaseDate: '2012-10-22',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/0/05/KendrickGKMC.jpg'
    },
    {
      _id: '10',
      title: 'folklore',
      artist: 'Taylor Swift',
      genre: 'Indie Folk',
      releaseDate: '2020-07-24',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png'
    },
    {
      _id: '11',
      title: 'CTRL',
      artist: 'SZA',
      genre: 'R&B',
      releaseDate: '2017-06-09',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/b/bf/SZA_-_Ctrl_cover.png'
    },
    {
      _id: '12',
      title: 'SOUR',
      artist: 'Olivia Rodrigo',
      genre: 'Pop Rock',
      releaseDate: '2021-05-21',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Olivia_Rodrigo_-_SOUR.png'
    },
    {
      _id: '13',
      title: 'Blonde',
      artist: 'Frank Ocean',
      genre: 'R&B',
      releaseDate: '2016-08-20',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
    }
  ];

// GET all albums
router.get('/', (req, res) => {
  res.json(albums);
});

// GET single album
router.get('/:id', (req, res) => {
  const album = albums.find(a => a._id === req.params.id);
  if (!album) return res.status(404).json({ message: 'Album not found' });
  res.json(album);
});

module.exports = router;