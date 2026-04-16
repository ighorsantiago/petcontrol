import { ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Container, LogoImg, ButtonsBox, LogButton, LogText, SignButton, SignText } from './styles';

import welcome from '@/assets/welcome-background.png';
import logo from '@/assets/logo.png';

export default function Welcome() {
    function handleNavigation(screen: '/login' | '/signUp') {
        // router.navigate(screen);
    }

    return (
        <Container>
            <ImageBackground source={welcome} style={styles.backImage} />

            <LogoImg source={logo} />

            <ButtonsBox>
                <LogButton onPress={() => router.navigate('/login')}>
                    <LogText>Entrar</LogText>
                </LogButton>
                <SignButton onPress={() => router.navigate('/signUp')}>
                    <SignText>Cadastrar</SignText>
                </SignButton>
            </ButtonsBox>
        </Container>
    );
}

const styles = StyleSheet.create({
    backImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});
