import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../firebase/firebaseConfig";

export const auth = getAuth(firebaseApp);

/**
 * Googleの認証プロバイダを使ってログイン処理を実行。
 * signInWithPopupメソッドを使用してポップアップウインドウを介したユーザー認証を行う。
 */
export const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(auth, provider);
};

/**
 * サインアウト処理
 */
export const signOut = () => {
	return auth.signOut();
};
