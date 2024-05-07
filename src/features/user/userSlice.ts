import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/User";
import { signInWithGoogle } from "../auth/Auth";
import { getUser, postUser } from "./userAPI";

const initialState = {
	userId: "",
};

export const googleSignInAndUserSetup = async () => {
	try {
		const result = await signInWithGoogle();
		const loginUser = result.user;
		const user = await getUser(loginUser.uid);

		if (!user) {
			const newUser: User = {
				profilePicture: loginUser.photoURL ?? "",
				email: loginUser.email ?? "",
				displayName: loginUser.displayName ?? "",
			};
			await postUser({
				uid: loginUser.uid,
				user: newUser,
			});
		}
		return loginUser.uid;
	} catch (error) {
		console.error("login failed: ", error);
	}
};

export const userSlice = createSlice({
	name: "userId",
	initialState,
	reducers: {
		login: (state, action) => {
			state.userId = action.payload;
		},
		logout: (state) => {
			state.userId = "";
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
