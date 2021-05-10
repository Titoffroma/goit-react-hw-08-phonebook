const BASE_URL = 'https://connections-api.herokuapp.com/';

async function addContactToAPI(contact, token) {
  const headers = new Headers({
    'content-type': 'application/json',
    accept: 'application/json',
    authorization: 'Bearer ' + token,
  });
  const request = new Request(`${BASE_URL}contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(contact),
  });
  const response = await fetch(request);
  if (response.ok) {
    return response.json();
  }
  return {
    error: `Something went wrong with the contact ${contact.name}`,
  };
}

async function removeContactFromAPI(id, token) {
  const headers = new Headers({
    accept: 'application/json',
    authorization: 'Bearer ' + token,
  });
  const request = new Request(`${BASE_URL}contacts/${id}`, {
    method: 'DELETE',
    headers,
  });
  const response = await fetch(request);
  if (response.ok) {
    return response.json();
  }
  return { error: `Something went wrong with the contact with id=${id}` };
}

export { addContactToAPI, removeContactFromAPI, BASE_URL };
