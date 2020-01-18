import { authReducer } from '../views/Auth/reducer/auth-reducer';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = combineReducers({
  user: authReducer
})

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2

}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer, composeWithDevTools())
const persistor = persistStore(store)

export { store, persistor }