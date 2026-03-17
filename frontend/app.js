// ============================================
// DO NOT MODIFY THIS FILE
// This frontend interacts with YOUR server API.
// If your server is implemented correctly, this
// app will work without any changes.
// ============================================

let selectedPetId = null;

const fetchAllPets = async () => {
  try {
    const response = await fetch('/api/pets');
    if (!response.ok) throw new Error('Failed to fetch pets');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return [];
  }
};

const fetchPetById = async (id) => {
  try {
    const response = await fetch(`/api/pets/${id}`);
    if (!response.ok) throw new Error(`Pet with id ${id} not found`);
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
};

const createPet = async (name) => {
  try {
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to create pet');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
};

const updatePet = async (id, name) => {
  try {
    const response = await fetch(`/api/pets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to update pet');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
};

const deletePet = async (id) => {
  try {
    const response = await fetch(`/api/pets/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete pet');
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
};

const showError = (message) => {
  document.querySelector('#error-message').textContent = message;
};

const clearError = () => {
  document.querySelector('#error-message').textContent = '';
};

const renderPets = (pets) => {
  const list = document.querySelector('#pets-list');
  const count = document.querySelector('#pet-count');

  list.innerHTML = '';
  count.textContent = pets.length;

  pets.forEach((pet) => {
    const li = document.createElement('li');
    li.textContent = `${pet.name} (id: ${pet.id})`;
    li.dataset.petId = pet.id;
    list.append(li);
  });
};

const renderPetDetails = (pet) => {
  const detailsSection = document.querySelector('#pet-details');
  detailsSection.classList.remove('hidden');
  document.querySelector('#detail-id').textContent = pet.id;
  document.querySelector('#detail-name').textContent = pet.name;
  selectedPetId = pet.id;
};

const hideDetails = () => {
  document.querySelector('#pet-details').classList.add('hidden');
  selectedPetId = null;
};

const main = async () => {
  // Load and render all pets on page load
  const pets = await fetchAllPets();
  renderPets(pets);

  // Click a pet to view its details
  document.querySelector('#pets-list').addEventListener('click', async (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    clearError();

    const id = Number(li.dataset.petId);
    const pet = await fetchPetById(id);
    if (pet) renderPetDetails(pet);
  });

  // Create a new pet via the form
  document.querySelector('#pet-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const name = e.target.name.value;
    await createPet(name);

    const updated = await fetchAllPets();
    renderPets(updated);
    e.target.reset();
  });

  // Update the selected pet
  document.querySelector('#update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();
    if (!selectedPetId) return;

    const newName = e.target.newName.value;
    const updated = await updatePet(selectedPetId, newName);
    if (updated) {
      renderPetDetails(updated);
      const allPets = await fetchAllPets();
      renderPets(allPets);
    }
    e.target.reset();
  });

  // Delete the selected pet
  document.querySelector('#delete-btn').addEventListener('click', async () => {
    clearError();
    if (!selectedPetId) return;

    await deletePet(selectedPetId);
    hideDetails();

    const updated = await fetchAllPets();
    renderPets(updated);
  });
};

main();
