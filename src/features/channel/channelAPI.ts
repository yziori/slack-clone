import {
	Timestamp,
	addDoc,
	collection,
	getFirestore,
	onSnapshot,
	query,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import type { Channel, ChannelRef } from "../../types/Channel";

const db = getFirestore(firebaseApp);

/**
 * Firestoreの`channels`コレクションを購読し、変更がある度に指定されたコールバック関数を通じて
 * チャンネルのリスト更新する。この関数は、Firestoreのスナップショットリスナーを設定し、
 * データの更新があるたびに、`onChannelUpdated`関数を呼び出す。
 * @param onChannelsUpdated
 * @returns {Function} Firebase のリスナーを解除するためのアンサブスクライブ関数。
 * @example
 * const unsubscribe = subscribeChannels((channels) => {
 *   console.log('Received channels:', channels);
 * });
 * // リスナーを解除するには
 * unsubscribe();
 */
export const subscribeChannels = (
	onChannelsUpdated: (channels: ChannelRef[]) => void,
) => {
	const q = query(collection(db, "channels"));

	return onSnapshot(
		q,
		(querySnapshot) => {
			const channelRefs: ChannelRef[] = [];
			// biome-ignore lint/complexity/noForEach: <explanation>
			querySnapshot.forEach((doc) => {
				channelRefs.push({
					id: doc.id,
					channel: doc.data() as Channel,
				});
			});
			onChannelsUpdated(channelRefs);
		},
		(error) => {
			console.error("Failed to subscribe channels:", error);
		},
	);
};

/**
 * チャンネルを追加する関数。
 * 公式ドキュメント：https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#add_a_document
 * @param channel - 追加するチャンネルデータ
 */
export const postChannel = async (channel: Channel) => {
	await addDoc(collection(db, "channels"), channel);
};

/**
 * チャンネルデータを作成する関数
 * @param name チャンネル名
 * @returns {Object} チャンネル名と作成時刻のオブジェクトを返す
 */
export const createChannel = (name: string): Channel => {
	const timestamp = Timestamp.fromDate(new Date());
	return {
		name: name,
		createAt: timestamp,
	};
};
