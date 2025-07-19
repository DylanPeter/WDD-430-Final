const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});