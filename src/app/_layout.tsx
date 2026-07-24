import '@/utils/i18n';
import '@/styles/global.css';
import { useEffect, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { AuthProvider } from '@/contexts';
import { useAuth } from '@/hooks';
import { ToastProvider } from '@/components/Toast';
import { requestNotificationPermissions } from '@/utils/notifications';

SplashScreen.preventAutoHideAsync();

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

function RootLayoutNav() {
    const { loading } = useAuth();
    const [isNavigationReady, setIsNavigationReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            setIsNavigationReady(true);
            SplashScreen.hideAsync();
            requestNotificationPermissions();
        }
    }, [loading]);

    if (!isNavigationReady) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="petInfo/index" />
            <Stack.Screen name="vaccines/index" />
            <Stack.Screen name="medications/index" />
            <Stack.Screen name="deworming/index" />
            <Stack.Screen name="hygiene/index" />
            <Stack.Screen name="appointments/index" />
            <Stack.Screen name="weight/index" />
            <Stack.Screen name="addPet/index" />
            <Stack.Screen name="food/index" />
        </Stack>
    );
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