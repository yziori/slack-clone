import type { Timestamp } from "firebase/firestore";

export interface Channel {
	name: string;
	createAt: Timestamp;
}

export interface ChannelRef {
	id: string;
	channel: Channel;
}
