import { useDispatch } from "react-redux";
import { googleSignInAndUserSetup, login } from "../features/user/userSlice";

const Login = () => {
	const dispatch = useDispatch();
	const loginWithGoogle = () => {
		googleSignInAndUserSetup().then((userId) => {
			if (userId) {
				dispatch(login(userId));
			}
		});
	};

	return (
		<div className="fixed flex inset-0 items-center justify-center bg-gray-500">
			<div className="w-full max-w-xs">
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-8">
						<h1 className="text-3xl text-center text-gray-700 mt-4">
							Slackにログイン
						</h1>
					</div>
					<div className="flex items-center justify-center">
						<button
							className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
							onClick={loginWithGoogle}
						>
							ログイン
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
