import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui:       uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth:     authSlice.reducer, 
  },
  //con esto elimino el error de serializableCheck
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
