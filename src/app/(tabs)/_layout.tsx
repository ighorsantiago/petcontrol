import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter, Redirect } from 'expo-router';
import { TouchableOpacity, View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks';

const VISIBLE_TABS = [
    { name: 'home/index', label: 'Home', icon: 'home' as const },
    { name: 'pets/index', label: 'Pets', icon: 'paw' as const },
    { name: 'tutor/index', label: 'Tutor', icon: 'male' as const },
];

function CustomTabBar({ state, descriptors, navigation }: any) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
            {VISIBLE_TABS.map((tab) => {
                const route = state.routes.find((r: any) => r.name === tab.name);
                if (!route) return null;
                const isFocused = state.routes[state.index]?.name === tab.name;
                const color = isFocused ? '#EA763B' : '#BDBBBB';

                return (
                    <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={() => navigation.navigate(tab.name)}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name={tab.icon} size={25} color={color} />
                        <Text style={[styles.label, { color }]}>{tab.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopColor: 'lightgray',
        borderLeftColor: 'lightgray',
        borderRightColor: 'lightgray',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'white',
        height: 85,
        paddingTop: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    label: {
        fontSize: 10,
    },
});

export default function TabLayout() {
    const { user } = useAuth();

    if (!user) {
        return <Redirect href="/onboardingScreen" />;
    }

    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="home/index" />
            <Tabs.Screen name="pets/index" />
            <Tabs.Screen name="tutor/index" />
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
