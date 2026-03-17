const express = require('express');
const path = require('path');

// TODO: Import your controllers from ./controllers/petControllers.js


const app = express();

/////////////////////
// Middleware
/////////////////////

// TODO: Create a logRoutes middleware function that logs the method and
// originalUrl of every incoming request, along with the current time.
// Register it with app.use() so it runs for ALL requests.


// TODO: Add the express.json() middleware to parse JSON request bodies.


// TODO: Serve the frontend/ folder as static assets using express.static()
// Hint: use path.join(__dirname, '..', 'frontend') to construct the filepath


/////////////////////
// Endpoints
/////////////////////

// TODO: Define RESTful endpoints for managing pets.
// You will need endpoints for:
//   - POST   /api/pets      → create a new pet
//   - GET    /api/pets      → get all pets
//   - GET    /api/pets/:id  → get a single pet by ID
//   - PATCH  /api/pets/:id  → update a pet by ID
//   - DELETE /api/pets/:id  → delete a pet by ID


const port = 8080;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
