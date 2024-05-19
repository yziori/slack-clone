import {
	Timestamp,
	addDoc,
	collection,
	getFirestore,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import type { Message, MessageRef } from "../../types/Message";

const db = getFirestore(firebaseApp);

/**
 * Firesotreの`message`コレクションを購読し、変更がある度に指定されたコールバック関数を通じて
 * messagesのリストを更新する。
 * @param channelId
 * @param onMessageUpdated
 * @returns
 */
export const subscribeMessage = (
	channelId: string,
	onMessageUpdated: (messages: MessageRef[]) => void,
) => {
	const q = query(
		collection(db, "message"),
		where("channelId", "==", channelId),
	);

	return onSnapshot(
		q,
		(querySnapshot) => {
			const messageRefs: MessageRef[] = [];
			// biome-ignore lint/complexity/noForEach: <explanation>
			querySnapshot.forEach((doc) => {
				messageRefs.push({
					id: doc.id,
					message: doc.data() as Message,
				});
			});
			onMessageUpdated(messageRefs);
		},
		(error) => {
			console.error("Faild to subscribe messages:", error);
		},
	);
};

/**
 * メッセージをfirestoreに追加する関数
 * @param message - 追加するメッセージ
 */
export const postMessage = async (message: Message) => {
	await addDoc(collection(db, "message"), message);
};

/**
 *　新規メッセージデータを作成する関数
 */
export const createMessage = (
	userId: string,
	channelId: string,
	messageText: string,
): Message => {
	const timestamp = Timestamp.fromDate(new Date());
	return {
		userId: userId,
		channelId: channelId,
		text: messageText,
		createAt: timestamp,
		isEdited: false,
		updateAt: timestamp,
	};
};
