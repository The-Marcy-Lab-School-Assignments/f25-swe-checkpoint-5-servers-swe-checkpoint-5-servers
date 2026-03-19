const express = require('express');
const controllers = require('./controllers/petControllers')
const path = require('path');

let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend');
}


// TODO: Import your controllers from ./controllers/petControllers.js


const app = express();
/////////////////////
// Middleware
/////////////////////

// TODO: Create a logRoutes middleware function that logs the method and
// originalUrl of every incoming request, along with the current time.


// TODO: Add the express.json() middleware to parse JSON request bodies.



// Route Logger
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

//404 fallback
const _404 = (req,res,next) =>{
    res.send(`ERR: no resource found at path: '${req.path}'`)
    return
}
// static resource serving
const serveStatic = express.static(pathToFrontend);

//controller registry
app.use(logRoutes);
app.use(express.json())
app.use(serveStatic);

app.get('/api/pets',controllers.listPets)
app.get('/api/pets/:id',controllers.getPet)
app.post('/api/pets',controllers.createPet)
app.patch('/api/pets/:id',controllers.updatePet)
app.delete('/api/pets/:id',controllers.deletePet)

app.use(_404);


const port = 8080;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
