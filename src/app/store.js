import { configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from './services/auth/authServices';
import {persistStore,persistReducer} from 'redux-persist'
import  storage  from 'redux-persist/lib/storage';

const persistConfig={
  key:'root',
  storage
}
const persistedReducer=persistReducer(persistConfig,authReducer)

 let store = configureStore({
  reducer: {
    auth: persistedReducer,
    [authApi.reducerPath]:authApi.reducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware),
    
  
});
let persistor=persistStore(store);
export{persistor,store}
