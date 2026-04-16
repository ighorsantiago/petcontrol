import { TouchableOpacity, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { getSlides } from '@/constants/slides';

export default function OnboardingScreen() {
    const { t } = useTranslation();
    const slides = getSlides(t);

    function handleNavigation() {
        router.replace('/welcome');
    }

    return (
        <Onboarding
            pages={slides}
            nextLabel="Próximo"
            skipLabel="Pular"
            showSkip={false}
            DoneButtonComponent={({ ...props }) => (
                <TouchableOpacity {...props}>
                    <Text style={{ fontSize: 16, marginHorizontal: 20 }}>Entrar</Text>
                </TouchableOpacity>
            )}
            onDone={handleNavigation}
            bottomBarColor="white"
        />
    );
}
