# swe-checkpoint-5-servers

**Sections:**
- [Setup](#setup)
- [Build a Server (28 points)](#build-a-server-28-points)
  - [API Reference](#api-reference)
  - [Step 1: Set Up the Express App](#step-1-set-up-the-express-app)
  - [Step 2: Build the Model](#step-2-build-the-model)
  - [Step 3: Build the Controllers](#step-3-build-the-controllers)
  - [Step 4: Define REST Endpoints](#step-4-define-rest-endpoints)
- [Testing with Curl](#testing-with-curl)
- [Complete Code Grading Checklist (28 points)](#complete-code-grading-checklist-28-points)

**<details><summary>Asking ChatGPT for Help</summary>**

If you're stuck, you may use ChatGPT to clarify the assignment — but not to solve it for you. To do this, copy the meta-prompt below into ChatGPT along with the assignment question.

> You are acting as a tutor. Your job is to explain what this coding question is asking, clarify confusing wording, and highlight the relevant concepts students need to know — but do not provide the full solution or code that directly answers the question. Instead, focus on rephrasing the problem in simpler terms, identifying what's being tested, and suggesting what steps or thought processes might help. Ask guiding questions to ensure the student is thinking critically. Do not write the final function, algorithm, or code implementation.

Be mindful of your AI usage on assignments. AI can be a great tool to help your learning but it can also be detrimental if you let it do too much of the thinking for you.

</details>

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy Lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/working-with-assignments#how-to-work-on-assignments).

```sh
git checkout -b draft   # switch to the draft branch before starting

npm i                   # install dependencies
npm run dev             # start the server with nodemon

git add -A              # add changed files to the staging area
git commit -m 'message' # create a commit with the changes
git push                # push the new commit to the remote repo
```

When you are finished, create a pull request and tag your instructor for review.

## Build a Server (28 points)

Build a working Express server with MVC architecture that powers the provided frontend application.

**Provided (do not modify):**
- `frontend/` — A frontend application (HTML, CSS, and JavaScript) that sends `fetch` requests to your server's API. If your server is implemented correctly, the frontend will work without any changes.
- `package.json` — Project configuration with `express` as a dependency

**Files you complete:**
- `server/index.js` — Express app setup, middleware, and endpoint definitions
- `server/models/Pet.js` — In-memory data model
- `server/controllers/petControllers.js` — Controller functions

### API Reference

The frontend expects the following API endpoints to exist on your server:

| Method   | Endpoint        | Request Body        | Description            | Success Status |
| -------- | --------------- | ------------------- | ---------------------- | -------------- |
| `POST`   | `/api/pets`     | `{ "name": "..." }` | Create a new pet       | `201`          |
| `GET`    | `/api/pets`     | —                   | Get all pets           | `200`          |
| `GET`    | `/api/pets/:id` | —                   | Get a single pet by ID | `200`          |
| `PATCH`  | `/api/pets/:id` | `{ "name": "..." }` | Update a pet's name    | `200`          |
| `DELETE` | `/api/pets/:id` | —                   | Delete a pet           | `200`          |

**Error responses:**
- Return `404` with `{ "message": "..." }` when a pet is not found
- Return `400` with `{ "message": "..." }` when a required field (`name`) is missing

### Step 1: Set Up the Express App

In `server/index.js`:
1. Create a `logRoutes` middleware function that logs the method and URL of every request (along with the current time) and calls `next()`
2. Register middleware in this order: `logRoutes`, `express.json()`, `express.static()`
3. The `express.static()` middleware should serve static assets from the `frontend/` folder.
4. The server should listen on port `8080`

### Step 2: Build the Model

In `server/models/Pet.js`:
1. Create an in-memory array with 2-3 starter pets (each with an `id` and `name`). Use the `getId()` helper to assign each pet's `id`.
2. Implement all 5 static methods: `create`, `list`, `find`, `update`, `delete`
3. Model methods should NOT use `req` or `res` — they only manage data

### Step 3: Build the Controllers

In `server/controllers/petControllers.js`:
1. Import the `Pet` model
2. Implement all 5 controller functions: `createPet`, `listPets`, `getPet`, `updatePet`, `deletePet`
3. Each controller should parse inputs from `req`, call the appropriate model method, and send the response with the correct status code
4. Handle error cases: return `400` for missing `name`, return `404` for pets not found

### Step 4: Define REST Endpoints

In `server/index.js`:
1. Import the controllers
2. Define all 5 RESTful routes (see the API Reference table above)
3. Routes should be defined after middleware registration

## Testing with Curl

After your server is working, use `curl` to test each endpoint.

You must demonstrate:
1. A `GET` retrieving all pets
2. A `GET` with a valid ID showing a 200 response
3. A `GET` with an invalid ID showing a 404 response
4. A successful `POST` creating a new pet (showing 201 status)
5. A `PATCH` successfully updating a pet
6. A `DELETE` removing a pet
7. A follow-up `GET` confirming the pet was deleted

For reference, you can send an HTTP request using `curl`. Paste these curl requests one at a time and inspect the responses (Note: the `-i` flag shows response headers, the `-X` flag sets the method, the `-H` flag sets the headers, and the `-d` flag sets the request body):

```sh
# GET All
curl http://localhost:8080/api/pets -i

# GET One (invalid id)
curl http://localhost:8080/api/pets/10000 -i

# GET One
curl http://localhost:8080/api/pets/1 -i

# POST
curl http://localhost:8080/api/pets -X POST -H "Content-Type: application/json" -d '{"name":"Skittles"}' -i

# PATCH
curl http://localhost:8080/api/pets/1 -X PATCH -H "Content-Type: application/json" -d '{"name":"Updated Name"}'

# DELETE
curl http://localhost:8080/api/pets/1 -X DELETE

# GET All (confirm deletion)
curl http://localhost:8080/api/pets -i
```

## Complete Code Grading Checklist (28 points)

**Express Setup (6 pts)**
- [ ] Express app is created and listens on a port
- [ ] `express.json()` middleware is registered
- [ ] `express.static()` serves the `frontend/` folder
- [ ] A custom `logRoutes` middleware logs method and URL for every request
- [ ] Middleware is registered before routes
- [ ] Server starts without errors

**Model (8 pts)**
- [ ] In-memory array is private to the module (not exported directly)
- [ ] `create()` returns a new pet with a unique `id`
- [ ] `list()` returns a copy of all pets
- [ ] `find()` returns a single pet by ID or `undefined`
- [ ] `update()` modifies and returns the pet, or returns `null` if not found
- [ ] `delete()` removes and returns the pet, or returns `null` if not found
- [ ] IDs are unique and auto-incrementing
- [ ] Model methods do not use `req` or `res` (proper separation of concerns)

**Controllers (10 pts)**
- [ ] Controllers import and use the model (no direct array manipulation)
- [ ] `createPet` reads from `req.body`, returns `201` status with the new pet
- [ ] `listPets` sends the full list of pets
- [ ] `getPet` parses `req.params.id`, returns `404` with message if not found
- [ ] `updatePet` parses params and body, returns `404` if not found
- [ ] `deletePet` parses `req.params.id`, returns `404` if not found
- [ ] All controllers send appropriate status codes
- [ ] Request body validation (returns `400` if `name` is missing for create/update)
- [ ] Controllers are exported and imported properly
- [ ] No model logic lives in controllers (separation of concerns)

**REST Endpoints (4 pts)**
- [ ] Routes follow REST conventions (correct methods + URL patterns)
- [ ] Path parameters are used for single-resource endpoints (`:id`)
- [ ] All 5 CRUD routes are defined
- [ ] Routes are defined after middleware registration
