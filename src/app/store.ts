import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

// 型推論で型を取り出している
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
