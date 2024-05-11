import {
	collection,
	getFirestore,
	onSnapshot,
	query,
} from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebaseConfig";
import type { Channel, ChannelRef } from "../../types/Channel";

const db = getFirestore(firebaseApp);

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
