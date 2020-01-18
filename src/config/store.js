import { authReducer } from '../views/Auth/reducer/auth-reducer';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";


const rootReducer = combineReducers({
  user: authReducer
})

export const store = createStore(rootReducer, composeWithDevTools())