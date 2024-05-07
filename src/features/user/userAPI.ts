import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import type { User, UserRef } from "../../types/User";

const db = getFirestore(firebaseApp);

export const getUser = async (userId: string) => {
	const userRef = doc(db, "users", userId);
	const docSnap = await getDoc(userRef);
	if (docSnap.exists()) {
		return docSnap.data() as User;
	}
};

export const postUser = async (userRef: UserRef) => {
	const user = userRef.user;
	await setDoc(doc(db, "users", userRef.uid), {
		displayName: user.displayName,
		email: user.email,
		profilePicture: user.profilePicture,
	});
};
