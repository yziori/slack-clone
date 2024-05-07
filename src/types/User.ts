export interface User {
	profilePicture: string;
	email: string;
	displayName: string;
}

export interface UserRef {
	uid: string;
	user: User;
}
