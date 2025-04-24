import { createContext, useContext, useEffect, useState } from "react";
import { Redirect, router } from "expo-router";

import type { UserDTO } from "@/dtos/UserDTO";
import { Loading } from "@/components/Loading";
import {
	storageChangeUserPassword,
	storageUserForgotPassword,
	storageUserGet,
	storageUserLogInFB,
	storageUserRemove,
	storageUserSave,
	storageUserSignInFB,
} from "@/storage/storageUser";

type AuthType = {
	user: UserDTO | null;
	loading: boolean;
	signInFirebase: (name: string, email: string, password: string) => void;
	logInFirebase: (email: string, password: string) => void;
	updateUser: (updatedUser: UserDTO) => void;
	changePassword: (newPassword: string) => void;
	logOut: () => void;
};

const AuthContext = createContext<AuthType>({
	user: null,
	loading: true,
	signInFirebase: (name: string, email: string, password: string) => {},
	logInFirebase: (email: string, password: string) => {},
	updateUser: (updatedUser: UserDTO) => {},
	changePassword: (newPassword: string) => {},
	logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
	children,
}: { children: JSX.Element }): JSX.Element {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<UserDTO | null>({} as UserDTO);

	useEffect(() => {
		loadUserData();
	}, []);

	async function loadUserData() {
		try {
			setLoading(true);
			const userLogged = await storageUserGet();

			if (userLogged) {
				setUser(userLogged);
			}
		} catch (error) {
			console.log("loadUserData =>", error);
		} finally {
			setLoading(false);
		}
	}

	async function signInFirebase(name: string, email: string, password: string) {
		const userFB = {
			...user,
			name,
			email,
		};

		try {
			setLoading(true);
			await storageUserSignInFB(userFB, password);
		} catch (error) {
			throw new Error();
		} finally {
			await loadUserData();
			setLoading(false);
		}
	}

	async function logInFirebase(email: string, password: string) {
		try {
			setLoading(true);
			await storageUserLogInFB(email, password);
		} catch (error) {
			console.log("logInFirebase =>", error);
		} finally {
			await loadUserData();
			setLoading(false);
		}
	}

	async function forgotPassword(email: string) {
		try {
			await storageUserForgotPassword(email);
		} catch (error) {
			console.log("forgotPassword =>", error);
		}
	}

	async function changePassword(newPassword: string) {
		try {
			await storageChangeUserPassword(newPassword);
		} catch (error) {
			console.log("changePassword =>", error);
		}
	}

	async function logOut() {
		try {
			setLoading(true);

			await storageUserRemove();

			setUser({} as UserDTO);

			setLoading(false);

			router.replace("/onboardingScreen");
		} catch (error) {
			console.log("logOut =>", error);
		} finally {
			// router.replace('/index');
		}
	}

	async function updateUser(updatedUser: UserDTO) {
		try {
			setUser(updatedUser);
			await storageUserSave(updatedUser);
		} catch (error) {
			console.log("updateUser =>", error);
		}
	}

	const authContext: AuthType = {
		user,
		loading,
		signInFirebase,
		logInFirebase,
		updateUser,
		changePassword,
		logOut,
	};

	return (
		<AuthContext.Provider value={authContext}>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	);
}
