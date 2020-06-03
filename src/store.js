import { createStore } from 'redux';
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


// const store = configureStore({
//     reducer: rootReducer,
//     middleware: [...getDefaultMiddleware()]
// })


export default store;