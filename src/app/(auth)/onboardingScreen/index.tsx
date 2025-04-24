import { Image, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import { useTranslation } from 'react-i18next';

import { Redirect, router } from 'expo-router';

export default function OnboardingScreen() {

    const slides = [
        {
            backgroundColor: 'white',
            image: <Image source={require("@/assets/image-dogs.png")} />,
            title: 'Cuide do seu melhor amigo.',
            subtitle: 'Todas as informações importantes sobre o seu pet em um só lugar.',
        },
        {
            backgroundColor: "white",
            image: <Image source={require("@/assets/image-cat.png")} />,
            title: 'Vacinas, consultas, horários de remédios...',
            subtitle: 'Confira as informações a qualquer momento.',
        },
        {
            backgroundColor: "white",
            image: <Image source={require("@/assets/image-dog-hug.png")} />,
            title: 'Aprenda mais sobre seu pet.',
            subtitle: 'Artigos e vídeos para você aprender mais sobre o comportamento do seu pet.',
        },
    ];

    function handleNavigation() {
        router.replace('/welcome');
        // <Redirect href="/welcome" />
    }

    return (
        <Onboarding
            pages={slides}
            nextLabel='Próximo'
            skipLabel='Pular'
            showSkip={false}
            DoneButtonComponent={({ ...props }) => (
                <TouchableOpacity
                    {...props}
                >
                    <Text style={{ fontSize: 16, marginHorizontal: 20 }}>Entrar</Text>
                </TouchableOpacity>
            )}
            onDone={handleNavigation}
            bottomBarColor="white"
        />
    );
}
