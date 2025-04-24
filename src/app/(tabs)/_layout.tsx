import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarInactiveTintColor: "#BDBBBB",
				tabBarActiveTintColor: "#EA763B",
				tabBarStyle: {
					borderTopWidth: 2,
					borderLeftWidth: 2,
					borderRightWidth: 2,
					borderRightColor: "lightgray",
					borderLeftColor: "lightgray",
					position: "absolute",
					overflow: "hidden",
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					height: 85,
					paddingBottom: 20,
					paddingTop: 20,
				},
				tabBarLabelStyle: { fontSize: 10 },
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tabs.Screen
				name="home/index"
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="home" size={25} color={color} />
					),
				}}
			/>
			
			<Tabs.Screen
				name="pets/index"
				options={{
					tabBarLabel: "Pets",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="paw" size={25} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="tutor/index"
				options={{
					tabBarLabel: "Tutor",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="male" size={25} color={color} />
					),
				}}
			/>
			<Tabs.Screen name="addPet/index" options={{ href: null }} />
			<Tabs.Screen name="appointments/index" options={{ href: null }} />
			<Tabs.Screen name="deworming/index" options={{ href: null }} />
			<Tabs.Screen name="food/index" options={{ href: null }} />
			<Tabs.Screen name="hygiene/index" options={{ href: null }} />
			<Tabs.Screen name="medications/index" options={{ href: null }} />
			<Tabs.Screen name="petInfo/index" options={{ href: null }} />
			<Tabs.Screen name="vaccines/index" options={{ href: null }} />
			<Tabs.Screen name="weight/index" options={{ href: null }} />
		</Tabs>
	);
}
