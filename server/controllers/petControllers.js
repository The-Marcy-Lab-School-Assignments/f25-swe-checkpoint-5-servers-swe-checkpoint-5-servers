const model = require('../models/petModel')
// TODO: Implement each controller function.
// Each controller should:
//   - Parse any needed data from req.params or req.body
//   - Call the appropriate Pet model method
//   - Send the appropriate response with the correct status code

module.exports.createPet = (req, res) => {
  const { name } = req.body;
  if(!name)
   return res.status(400).send({ message: "Invalid Name" });

  res.status(201).send(model.create(name))
  // If name is missing, send a 400 response with an error message
  // Otherwise, create the pet and send a 201 response
};

module.exports.listPets = (req, res) => {
  res.send(model.list())
};

module.exports.getPet = (req, res) => {
  const {id} = req.params;
  const pet = model.find(id)
  if(!pet)
    return res.status(404).send({ message: `No pet found with id: ${id}` });
  res.send(pet)
  // Parse the id from req.params (remember to convert to a Number!)
  // If the pet is not found, send a 404 response with an error message
  // Otherwise, send the pet
};

module.exports.updatePet = (req, res) => {
  //i am needlessly handling logic handled in the model, however just so it can send semantically accurate status codes i left this as is
    const {id} = req.params;
    const pet = model.find(id)
    if(!pet)
      return res.status(404).send({ message: `No pet found with id: ${id}` });
    const {name} = req.body;
    if(!name)
      return res.status(400).send({ message: `Invalid Name ${name}` });
    res.send(model.update(id,name))

  // Parse the id from req.params and the name from req.body
  // If name is missing, send a 400 response
  // If the pet is not found, send a 404 response
  // Otherwise, send the updated pet
};

module.exports.deletePet = (req, res) => {
    const {id} = req.params;
    const pet = model.find(id)
    if(!pet)
      return res.status(404).send({ message: `No pet found with id: ${id}` });
    let _del =model.destroy(id)
    return res.status(200).send(_del);
  // Parse the id from req.params
  // If the pet is not found, send a 404 response
  // Otherwise, send the deleted pet
};
