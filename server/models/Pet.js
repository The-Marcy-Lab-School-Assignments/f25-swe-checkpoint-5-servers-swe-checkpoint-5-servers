// A helper for generating unique IDs
let id = 1;
const getId = () => id++;

// TODO: Create an in-memory "database" array with 2-3 starter pets.
// Each pet should have an id (from getId) and a name.


class Pet {
  // TODO: Create a new pet and add it to the array. Return the new pet.
  static create(name) {

  }

  // TODO: Return a copy of all pets.
  static list() {

  }

  // TODO: Find and return a single pet by its ID.
  static find(id) {

  }

  // TODO: Update the name of a pet. Return the updated pet,
  // or null if not found.
  static update(id, newName) {

  }

  // TODO: Remove a pet from the array. Return the deleted pet,
  // or null if not found.
  static delete(id) {

  }
}

module.exports = Pet;
