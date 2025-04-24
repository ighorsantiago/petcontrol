import "@/styles/global.css";

import { useEffect, useState } from "react";
import { Slot, SplashScreen } from "expo-router";

import { AuthProvider, useAuth } from "@/context/AuthProvider";

import { ToastProvider } from "@/components/Toast";

SplashScreen.preventAutoHideAsync();

import {
	configureReanimatedLogger,
	ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false,
});

function RootLayoutNav() {
	const { user, loading } = useAuth();
	const [isNavigationReady, setIsNavigationReady] = useState(false);

	useEffect(() => {
		if (!loading) {
			setIsNavigationReady(true);
			SplashScreen.hideAsync();
		}
	}, [loading]);

	if (!isNavigationReady) {
		return null;
	}

	return <Slot />;
}

export default function RootLayout() {
	return (
		<ToastProvider position="top">
			<AuthProvider>
				<RootLayoutNav />
			</AuthProvider>
		</ToastProvider>
	);
}
