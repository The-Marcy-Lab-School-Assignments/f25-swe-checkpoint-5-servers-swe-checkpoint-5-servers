const express = require('express');
const path = require('path');

// TODO: Import your controllers from ./controllers/petControllers.js


const app = express();

/////////////////////
// Middleware
/////////////////////

// TODO: Create a logRoutes middleware function that logs the method and
// originalUrl of every incoming request, along with the current time.


// TODO: Add the express.json() middleware to parse JSON request bodies.


// TODO: Serve the frontend/ folder as static assets using express.static()


/////////////////////
// Endpoints
/////////////////////

// TODO: Define RESTful endpoints for managing pets.


const port = 8080;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
