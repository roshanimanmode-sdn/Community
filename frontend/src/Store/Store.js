import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../Slice/AuthSlice";
import postDataReducer from "../Slice/PostData";
import userProfileSlice from "../Slice/ProfileData";


const reducerlist = combineReducers({
        auth : authReducer,
        postData: postDataReducer,
        profileData: userProfileSlice
       
    });
const persistConfig ={
    key:'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig,reducerlist)
    export const store= configureStore({
        reducer: persistedReducer,
        devTools:true
    })
    export const persistor=persistStore(store)
