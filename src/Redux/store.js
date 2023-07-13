import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggedInSlice } from './isLoggedInSlice';
import { userInfoSlice } from './UserInfoSlice';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  loggedIn: loggedInSlice.reducer,
  userInfo: userInfoSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add composeWithDevTools to enhance the store
const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export { store, persistor };
