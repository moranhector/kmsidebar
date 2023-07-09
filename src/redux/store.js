import { createStore } from 'redux';

// Define los nombres de las variables globales
const initialState = {
  spotifyToken: '',
  albumId: '',
};

// Define los tipos de acciones para modificar las variables globales
const actionTypes = {
  SET_SPOTIFY_TOKEN: 'SET_SPOTIFY_TOKEN',
  SET_ALBUM_ID: 'SET_ALBUM_ID',
};

// Define el reducer para modificar las variables globales
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SPOTIFY_TOKEN:
      return {
        ...state,
        spotifyToken: action.payload,
      };
    case actionTypes.SET_ALBUM_ID:
      return {
        ...state,
        albumId: action.payload,
      };
    default:
      return state;
  }
};

// Crea el store de Redux
const store = createStore(reducer);

export default store;
