import { ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
    Container,
    LogoImg,
    ButtonsBox,
    LogButton,
    LogText,
    SignButton,
    SignText
} from './styles';
import { router } from 'expo-router';

export default function Welcome() {


    function handleNavigation(screen: '/login' | '/signUp') {
        // router.navigate(screen);
    }

    return (

        <Container>
            <ImageBackground
                source={require('@/assets/welcome-background.png')}
                style={styles.backImage}
            />

            <LogoImg source={require('@/assets/logo.png')} />

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
        width: "100%",
        height: "100%",
    }
});
