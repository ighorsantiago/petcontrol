import { useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
// import { useTranslation } from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';

import {
    Container,
    Header,
    LogoImg,
    RegisterBox,
    RigisterLabel,
    RegisterButton,
    RegisterText,
    SocialBox,
    Footer,
    SocialLabel,
    SocialButtonsBox,
    SocialButton,
    SignUpText,
    SignUpButton,
    SignUpButtonText,
} from './styles';

import { useAuth } from '@/hooks';

import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';

import header from '@/assets/header.png';

export default function SignUp() {
    // const { signIn } = useSession();

    const { signInFirebase } = useAuth();
    // const { t } = useTranslation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    async function handleSignUp() {
        try {
            await signInFirebase(name, email, password);
            // signIn(name, email, password);

            // router.replace("/(auth)/(tabs)/Home");
        } catch (error) {
            console.log('Erro da tela SignUp:', error);
            throw error;
        }
    }

    // async function handleSocial(social: string) {
    //     // console.log("Clicou!");
    //     try {
    //         await signInGoogle();
    //     } catch (error) {
    //         console.log('Erro no login social:', error);
    //     }
    // }

    return (
        // <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header source={header} />

                <RegisterBox>
                    <RigisterLabel>Cadastro</RigisterLabel>

                    <Input
                        iconName="user"
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome"
                        //t('signup.name')
                        placeholderTextColor="gray"
                    />

                    <Input
                        iconName="mail"
                        value="email"
                        onChangeText={setEmail}
                        placeholder="E-mail"
                        placeholderTextColor="gray"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <PasswordInput
                        iconName="lock"
                        value="password"
                        onChangeText={setPassword}
                        placeholder="Senha"
                        placeholderTextColor="gray"
                    />

                    <PasswordInput
                        iconName="lock"
                        value="confirm"
                        onChangeText={setPasswordConfirm}
                        placeholder="Confirme a senha"
                        placeholderTextColor="gray"
                    />
                </RegisterBox>

                <RegisterButton onPress={handleSignUp}>
                    <RegisterText>Cadastrar</RegisterText>
                </RegisterButton>

                <SocialBox>
                    <SocialLabel>ou registre-se com</SocialLabel>
                    <SocialButtonsBox>
                        <SocialButton onPress={() => {}}>
                            <FontAwesome name="facebook-official" size={23} color="blue" />
                        </SocialButton>
                        <SocialButton onPress={() => {}}>
                            <FontAwesome name="google" size={23} color="red" />
                        </SocialButton>
                        <SocialButton onPress={() => {}}>
                            <FontAwesome name="apple" size={23} color="black" />
                        </SocialButton>
                    </SocialButtonsBox>
                </SocialBox>

                <SignUpButton onPress={() => router.navigate('/login')}>
                    <SignUpButtonText>Já tem uma conta?</SignUpButtonText>
                </SignUpButton>
            </Container>
        </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    );
}
