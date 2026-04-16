import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";

import { useAuth } from "@/hooks";

export default function Index() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return <Redirect href={user?.email ? "/home" : "/onboardingScreen"} />;
}
