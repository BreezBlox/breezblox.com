const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname); // Decode URI components like %20

  // Log every request with details
  console.log(`\n--- REQUEST RECEIVED ---`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`URL: ${req.url}`);
  console.log(`Pathname: ${pathname}`);
  console.log(`Method: ${req.method}`);
  console.log(`Referrer: ${req.headers.referer || 'None'}`);

  // Default to index.html if the path is '/'
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
    console.log(`Default path applied: ${pathname}`);
  }

  // Prevent directory traversal
  const safePathSuffix = path.normalize(pathname).replace(/^(?:\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePathSuffix);
  console.log(`Constructed file path: ${filePath}`);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // File or directory doesn't exist
      console.log(`Initial path not found: ${filePath} (Error: ${err.code})`);

      // If it was a path without an extension, try adding .html
      if (!path.extname(filePath)) {
        const htmlFilePath = filePath + '.html';
        console.log(`Trying alternative path: ${htmlFilePath}`);
        fs.stat(htmlFilePath, (htmlErr, htmlStats) => {
          if (!htmlErr && htmlStats.isFile()) {
            console.log(`Serving file: ${htmlFilePath}`);
            serveFile(htmlFilePath, res);
          } else {
            // Neither original nor .html path found
             console.log(`Alternative path not found or not a file: ${htmlFilePath}`);
            sendNotFound(res, pathname);
          }
        });
      } else {
        // Path had an extension but wasn't found
        sendNotFound(res, pathname);
      }
    } else {
      // Path exists, check if it's a file or directory
      if (stats.isFile()) {
        console.log(`Serving file: ${filePath}`);
        serveFile(filePath, res);
      } else if (stats.isDirectory()) {
        console.log(`Path is a directory: ${filePath}. Trying index.html within.`);
        // If it's a directory, try serving index.html inside it
        const indexFilePath = path.join(filePath, 'index.html');
         fs.stat(indexFilePath, (indexErr, indexStats) => {
           if (!indexErr && indexStats.isFile()) {
             console.log(`Serving directory index: ${indexFilePath}`);
             serveFile(indexFilePath, res);
           } else {
             console.log(`Directory index not found: ${indexFilePath}`);
             sendNotFound(res, pathname); // No index.html in directory
           }
         });
      } else {
         // Exists but is not a file or directory (e.g., socket, symbolic link)
         console.log(`Path exists but is not a file or directory: ${filePath}`);
         sendNotFound(res, pathname);
      }
    }
  });
});

function serveFile(filePath, res) {
  const extname = path.extname(filePath).toLowerCase();
  let contentType = 'application/octet-stream'; // Default content type

  // Determine content type (add more as needed)
  const mimeTypes = {
      '.html': 'text/html',
      '.htm': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.wasm': 'application/wasm'
  };

  contentType = mimeTypes[extname] || contentType;
  console.log(`Content type determined as: ${contentType}`);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(`Error reading file: ${filePath} (Error: ${err.code})`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${err.code}`);
       console.log(`--- REQUEST FAILED (Read Error) ---\n`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
      console.log(`Successfully served: ${filePath}`);
       console.log(`--- REQUEST COMPLETED ---\n`);
    }
  });
}

// Function to send a 404 Not Found response
function sendNotFound(res, resourcePath) {
    console.error(`Resource not found: ${resourcePath}`);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
     console.log(`--- REQUEST FAILED (404 Not Found) ---\n`);
}

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Server root directory: ${__dirname}`);
  console.log(`Ready to serve files. Watch logs for activity.`);
});
