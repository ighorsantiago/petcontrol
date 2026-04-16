import { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
// import { useToast } from 'native-base';
import { useTranslation } from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '@/context/AuthContext';

import {
    Container,
    Header,
    LoginBox,
    LogLabel,
    ForgotButton,
    ForgotLabel,
    LogButton,
    LogText,
    SocialBox,
    Footer,
    SocialLabel,
    SocialButtonsBox,
    SocialButton,
    SignUpText,
    SignUpButton,
    SignUpButtonText,
} from "./styles";

import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/PasswordInput";

export default function Login() {

    const { logInFirebase } = useAuth();
    // const { t } = useTranslation();
    // const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // function handleSocial() {
    //     Alert.alert("Clicou!");
    // }

    function handleNavigateToRegister() {
        // navigation.navigate('signUp');
        router.navigate('/signUp');

    }

    async function handleLogIn() {

        try {
            if (!email || !password) {
                // return toast.show({
                //     placement: 'top',
                //     bgColor: 'red.500',
                //     description: 'Digite seu e-mail e sua senha.'
                // });
                Alert.alert('Digite seu e-mail e sua senha.');
            }

            logInFirebase(email, password);
        } catch (error) {
            Alert.alert('E-mail ou senha incorretos.');
            // if (error.message.includes('wrong-password')) {
            //     toast.show({
            //         placement: 'top',
            //         bgColor: 'red.500',
            //         description: 'E-mail ou senha incorretos.'
            //     });
            // } else {
            //     toast.show({
            //         placement: 'top',
            //         bgColor: 'red.500',
            //         description: 'Ocorreu um erro, por favor tente novamente.'
            //     });
            // }
        }
    }

    async function handleForgotPassword() {

        if (!email) {
            return Alert.alert("Tutor", "Por favor, informe seu e-amil.");
        }

        try {

            // await forgotPassword(email);

            // alert("Confira seu e-mail (inclusive a caixa de spam) para alterar a senha.");
            alert("Que pena!");
        } catch (error) {
            // toast.show({
            //     placement: 'top',
            //     bgColor: 'red.500',
            //     description: 'Ocorreu um erro, por favor tente novamente.'
            // });
        }
    }

    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior="position"
        //     // behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        // >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header source={require("@/assets/header.png")} />

                <LoginBox>
                    <LogLabel>
                        Login
                    </LogLabel>

                    <Input
                        iconName="mail"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="E-mail"
                        placeholderTextColor="darkgray"
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <PasswordInput
                        iconName="lock"
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Senha'
                        placeholderTextColor="darkgray"
                    />

                    <ForgotButton onPress={handleForgotPassword}>
                        <ForgotLabel>
                            Esqueceu a senha?
                        </ForgotLabel>
                    </ForgotButton>
                </LoginBox>

                <LogButton style={styles.logBtn} onPress={handleLogIn}>
                    <LogText>Login</LogText>
                </LogButton>

                {/* <SocialBox>
                        <SocialLabel>{t("login.socialLogin")}</SocialLabel>
                        <SocialButtonsBox>
                            <SocialButton onPress={handleSocial}>
                                <FontAwesome name="facebook-official" size={23} color="blue" />
                            </SocialButton>
                            <SocialButton onPress={handleSocial}>
                                <FontAwesome name="google" size={23} color="red" />
                            </SocialButton>
                            <SocialButton onPress={handleSocial}>
                                <FontAwesome name="apple" size={23} color="black" />
                            </SocialButton>
                        </SocialButtonsBox>
                    </SocialBox> */}

                <Footer>
                    <SignUpText>Não tem uma conta? </SignUpText>
                    <SignUpButton onPress={handleNavigateToRegister}>
                        <SignUpButtonText>
                            Registre-se aqui!
                        </SignUpButtonText>
                    </SignUpButton>
                </Footer>
            </Container>
        </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logBtn: {
        width: 330,
        height: 53,

        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 80,
        marginBottom: 5,

        borderRadius: 6,

        backgroundColor: '#3E84A8',
    },
});
