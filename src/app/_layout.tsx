import '@/utils/i18n';
import '@/styles/global.css';
import { useEffect, useState } from 'react';
import { Slot, SplashScreen } from 'expo-router';
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