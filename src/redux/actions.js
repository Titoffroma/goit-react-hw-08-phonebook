import { createAction } from '@reduxjs/toolkit';
import { addContactToAPI, removeContactFromAPI } from '../API';
import types from './actionTypes';

const fetchContacts = createAction(types.FETCH_CONTACTS);

const addContact = (contact, token) => dispatch => {
  dispatch({
    type: types.SET_LOADING_STATE,
    payload: true,
  });
  addContactToAPI(contact, token)
    .then(data => {
      if (!data.error) {
        dispatch({
          type: types.ADD_CONTACT,
          payload: data,
        });
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { success: `${data.name} successfully added` },
        });
      }
      data.error &&
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { error: data.error },
        });
    })
    .catch(error =>
      dispatch({
        type: types.ADD_MESSAGE,
        payload: { error: error.message },
      }),
    )
    .finally(() => {
      dispatch({
        type: types.SET_LOADING_STATE,
        payload: false,
      });
    });
};

const removeContact = (id, token) => dispatch => {
  dispatch({
    type: types.SET_LOADING_STATE,
    payload: true,
  });
  removeContactFromAPI(id, token)
    .then(data => {
      if (!data.error) {
        dispatch({ type: types.REMOVE_CONTACT, payload: id });
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { success: `Successfully removed` },
        });
      }
      data.error &&
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { error: data.error },
        });
    })
    .catch(error =>
      dispatch({
        type: types.ADD_MESSAGE,
        payload: { error: error.message },
      }),
    )
    .finally(() => {
      dispatch({
        type: types.SET_LOADING_STATE,
        payload: false,
      });
    });
};

const filterContacts = createAction(types.FILTER_CONTACT);

const addMessage = createAction(types.ADD_MESSAGE);

const clearMessage = createAction(types.CLEAR_MESSAGE);

const setLoadingState = createAction(types.SET_LOADING_STATE);

export {
  fetchContacts,
  addContact,
  removeContact,
  filterContacts,
  addMessage,
  clearMessage,
  setLoadingState,
};
