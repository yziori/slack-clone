import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { createMessage } from "../../features/message/messageAPI";
import type { MessageRef } from "../../types/Message";
import MessageTile from "./MessageTile";

const MessageArea = () => {
	const [messageRefs, setMessageRefs] = useState<MessageRef[]>();
	const userId = useAppSelector((state) => state.user.userId);
	const channelId = useAppSelector((state) => state.channel.currentChannelId);

	const [message, setMessage] = useState<string>("");
	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	const sendMessage = async () => {
		if (userId) {
			try {
				await postMessage(createMessage(userId, channelId, message));
				setMessage("");
			} catch (error) {
				console.error("Error Sending Message: ", error);
			}
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if ((e.metaKey || e.ctrlKey) && e.code === "Enter") {
			sendMessage();
		}
	};
	return (
		<div className="flex-1 flex-col flex bg-gray-500">
			<div className="p-4 m-3">
				{messageRefs?.map((messageRef) => (
					<MessageTile message={messageRef.message} key={messageRef.id} />
				))}
			</div>

			<div className="mt-auto px-4 py-2 bottom-0 bg-gray-900">
				<div className="flex items-center">
					<TextareaAutosize
						placeholder="メッセージを入力"
						className="flex-1 bg-gray-700 text-white p-2 mx-2 rounded-lg focus:outline-none"
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						value={message}
					/>

					<button
						type="button"
						className="text-gray-400 hover:text-white"
						onClick={sendMessage}
					>
						<SendIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default MessageArea;
