export interface User {
	profilePicture: string;
	email: string;
	displayName: string;
}

export interface userRef {
	uid: string;
	user: User;
}
