// server.js
const express = require('express');
const app = express();
const port = 3000;

// Define route for serving static files (HTML, images, etc.)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
