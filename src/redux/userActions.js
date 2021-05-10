import { createAction } from '@reduxjs/toolkit';
import types from './actionTypes';

const setAuthState = createAction(types.SET_AUTH);

const setUserInfo = createAction(types.SET_USER_DATA);

export { setAuthState, setUserInfo };
