import type { Timestamp } from "firebase/firestore";

export interface Message {
	userId: string;
	channelId: string;
	text: string;
	createAt: Timestamp;
	isEdited: boolean;
	updateAt: Timestamp;
}

export interface MessageRef {
	id: string;
	message: Message;
}
