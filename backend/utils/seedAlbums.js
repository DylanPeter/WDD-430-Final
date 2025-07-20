const Album = require('../models/album.model');

const seedAlbums = async () => {
  const existing = await Album.find();
  if (existing.length > 0) {
    console.log('Seed skipped: Albums already exist.');
    return;
  }

  const albums = [
    {
      title: 'Melodrama',
      artist: 'Lorde',
      genre: 'Alternative',
      releaseDate: '2017-06-16',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lorde_-_Melodrama.png',
      deezerId: 1230001
    },
    {
      title: 'folklore',
      artist: 'Taylor Swift',
      genre: 'Indie Folk',
      releaseDate: '2020-07-24',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png',
      deezerId: 1230002
    },
    {
      title: 'SOUR',
      artist: 'Olivia Rodrigo',
      genre: 'Pop Rock',
      releaseDate: '2021-05-21',
      coverImage: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Olivia_Rodrigo_-_SOUR.png',
      deezerId: 1230003
    }
  ];

  await Album.insertMany(albums);
  console.log('✅ Albums seeded to MongoDB.');
};

module.exports = seedAlbums;