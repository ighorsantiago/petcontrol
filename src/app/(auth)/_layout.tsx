import { Slot, Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Slot />
        // <Stack>
        // 	<Stack.Screen name="login" options={{ headerShown: false }} />
        // </Stack>
    );
}
