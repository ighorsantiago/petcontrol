import '@/utils/i18n';
import '@/styles/global.css';
import { useEffect, useState } from 'react';
import { Slot, SplashScreen, useSegments, useRouter } from 'expo-router';
import { AuthProvider } from '@/contexts';
import { useAuth } from '@/hooks';
import { ToastProvider } from '@/components/Toast';

SplashScreen.preventAutoHideAsync();

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

function RootLayoutNav() {
    const { user, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const [isNavigationReady, setIsNavigationReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsNavigationReady(true);
            SplashScreen.hideAsync();
        }
    }, [loading]);

    useEffect(() => {
        if (!isNavigationReady) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!user?.email && !inAuthGroup) {
            router.replace('/onboardingScreen');
        } else if (user?.email && inAuthGroup) {
            router.replace('/(tabs)/home');
        }
    }, [user, isNavigationReady, segments]);

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