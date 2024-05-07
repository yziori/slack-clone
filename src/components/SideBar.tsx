import { ChatBubble, Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { getUser } from "../features/user/userAPI";
import type { User } from "../types/User";

const SideBar = () => {
	const userId = useAppSelector((state) => state.user.userId);
	const [user, setUser] = useState<User | null>();

	useEffect(() => {
		const fetchUser = async () => {
			if (userId) {
				const userRef = await getUser(userId);
				setUser(userRef);
			}
		};
		fetchUser();
	}, [userId]);

	return (
		<div className="w-16 h-screen bg-gray-900 flex flex-col items-center text-white">
			<div className="py-5 flex flex-col items-center">
				<div className="bg-gray-700 p-2 rounded-lg">
					<Home />
				</div>
				<span className="text-xs">Home</span>
			</div>
			<div className="py-5 flex flex-col items-center">
				<div className="bg-gray-700 p-2 rounded-lg">
					<ChatBubble />
				</div>
				<span className="text-xs">DM</span>
			</div>
			<div className="py-5 mt-auto mx-2 flex flex-col items-center">
				<div className="bg-gray-700 p-2 rounded-lg">
					<img src="/default-user-icon.png" alt="" />
				</div>
				<span className="text-xs">{user?.displayName}</span>
			</div>
		</div>
	);
};

export default SideBar;
