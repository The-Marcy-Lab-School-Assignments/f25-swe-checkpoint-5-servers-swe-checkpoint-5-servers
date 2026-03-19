// A helper for generating unique IDs
let id = 1;
const getId = () => id++;

// TODO: Create an in-memory "database" array with 2-3 starter pets.
// Each pet should have an id (from getId) and a name.
pets = [
    {id:getId(),name:"Jake tha snake"},
    {id:getId(),name:"Sandra the panda"},
    {id:getId(),name:"Lana tha Llama"},
]


// TODO: Create a new pet and add it to the array. Return the new pet.
module.exports.create = (name) => {
    (name&&(pets.push({id:getId(),name})))
}

// TODO: Return a copy of all pets.
module.exports.list = () => {
return [...pets]
}

// TODO: Find and return a single pet by its ID.
module.exports.find = (id) => {
return pets.filter((pet)=>pet.id==id)[0]
}

// TODO: Update the name of a pet. Return the updated pet,
// or null if not found.
module.exports.update = (id, newName) => {
let x = module.exports.find(id)
if(x){
x.name=newName
return x
}
return null
}

// TODO: Remove a pet from the array. Return the deleted pet,
// or null if not found.
module.exports.destroy = (id) => {
const _x = pets.findIndex((pet)=>pet.id==id)
if(_x+1)
    return pets.splice(_x, 1)[0]
return null
}
