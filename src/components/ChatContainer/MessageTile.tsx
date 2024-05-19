import { useEffect, useState } from "react";
import { getUser } from "../../features/user/userAPI";
import type { Message } from "../../types/Message";
import type { User } from "../../types/User";

interface MessageTileProps {
	message: Message;
}

const MessageTile = (message: MessageTileProps) => {
	const [owner, setOwnner] = useState<User | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const ownerData = await getUser(message.message.userId);
				if (ownerData) {
					setOwnner(ownerData);
				}
			} catch (error) {
				setOwnner(null);
			}
		};
		fetchUser();
	}, []);

	return (
		<div className="bg-gray-700 p-3 m-3 rounded-lg">
			<div className="flex items-center mb-2">
				<img
					src={owner?.profilePicture || "/default-user-icon.png"}
					alt="プロフィール画像"
					className="w-10 h-10 rounded-full mr-2"
				/>
				<div>
					<div className="text-sm text-white font-semibold">
						{owner?.displayName || "unkown"}
					</div>
					<div className="text-sm text-gray-400">
						{message.message.createAt.toDate().toLocaleString() || ""}
					</div>
				</div>
			</div>
			<p className="text-gray-300">{message.message.text}</p>
		</div>
	);
};

export default MessageTile;
