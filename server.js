const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);
  let contentType = 'text/html';

  // Verificați tipul de fișier și setați tipul de conținut corespunzător
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Pagina nu a fost găsită');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Eroare internă a serverului');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}/`);
});
