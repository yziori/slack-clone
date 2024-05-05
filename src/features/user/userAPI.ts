import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import type { User } from "../../types/User";

const db = getFirestore(firebaseApp);

export const getUser = async (userId: string) => {
	const userRef = doc(db, "users", userId);
	const docSnap = await getDoc(userRef);
	if (docSnap.exists()) {
		return docSnap.data() as User;
	}
};
