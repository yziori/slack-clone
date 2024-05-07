import { useAppSelector } from "./app/hooks";
import ChatContainer from "./components/ChatContainer";
import Login from "./components/Login";
import SideBar from "./components/SideBar";

function App() {
	const userId = useAppSelector((state) => state.user.userId);

	return (
		<div className="flex">
			{userId.trim() === "" ? (
				<Login />
			) : (
				<>
					<SideBar />
					<ChatContainer />
				</>
			)}
		</div>
	);
}

export default App;
