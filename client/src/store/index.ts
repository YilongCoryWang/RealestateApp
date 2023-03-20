import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import PropertyStatusReducer from "./propertyStatus.slice";

const persistConfig = { key: "propertyStatus", storage: storage };
const rootReducer = combineReducers({
  status: PropertyStatusReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  ];

  return middlewareList;
};
const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
