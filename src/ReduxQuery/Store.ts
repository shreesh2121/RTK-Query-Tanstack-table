import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { jsonServerApi } from './jsonServerApi'


export const Store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(Store.dispatch)