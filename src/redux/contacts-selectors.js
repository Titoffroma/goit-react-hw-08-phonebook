import { createSelector } from 'reselect';

export const getContactsList = store => store.contacts.items;

export const getContactsFilter = store => store.contacts.filter;

export const getMessage = store => store.message;

export const getToken = store => store.Auth;

export const removeContactByID = createSelector(
  [(store, id) => id, getContactsList],
  (id, list) => list.filter(contact => contact.id !== id),
);
