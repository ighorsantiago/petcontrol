import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { useToast } from '@/components/Toast';
import { useAuth } from '@/hooks';
import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';
import { isAppleSignInAvailable } from '@/services/auth.service';

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
} from './styles';

import header from '@/assets/header.png';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { logInFirebase, logInWithGoogle, logInWithApple, forgotPasswordFirebase } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [appleAvailable, setAppleAvailable] = useState(false);

  const [, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    androidClientId: '967896711448-sipu6kjcdkf3ujhknusqpjfv245lo0dh.apps.googleusercontent.com',
    webClientId: '967896711448-mfav5qflj356vfbesdkl370s32ahqbuc.apps.googleusercontent.com',
  });

  useEffect(() => {
    isAppleSignInAvailable().then(setAppleAvailable);
  }, []);

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const accessToken = googleResponse.authentication?.accessToken;
      if (accessToken) {
        handleGoogleSignIn(accessToken);
      }
    }
  }, [googleResponse]);

  async function handleLogIn() {
    try {
      if (!email || !password) {
        toast('Digite seu e-mail e sua senha.', 'destructive', 4000, 'top', false);
        return;
      }
      await logInFirebase(email, password);
      router.replace('/(tabs)/home');
    } catch (error) {
      toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      return toast('Por favor, informe seu e-mail.', 'destructive', 4000, 'top', false);
    }
    try {
      await forgotPasswordFirebase(email);
      toast('Confira seu e-mail para redefinir a senha.', 'success', 4000, 'top', false);
    } catch (error) {
      toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
    }
  }

  async function handleGoogleSignIn(accessToken: string) {
    try {
      await logInWithGoogle(accessToken);
      router.replace('/(tabs)/home');
    } catch (error) {
      toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
    }
  }

  async function handleAppleLogin() {
    try {
      await logInWithApple();
      router.replace('/(tabs)/home');
    } catch (error: any) {
      if (!error?.message?.includes('cancelado')) {
        toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
      }
    }
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header source={header} />

          <LoginBox>
            <LogLabel>Login</LogLabel>

            <Input
              iconName="mail"
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
              placeholderTextColor="darkgray"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <PasswordInput
              iconName="lock"
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              placeholderTextColor="darkgray"
            />

            <ForgotButton onPress={handleForgotPassword}>
              <ForgotLabel>Esqueceu a senha?</ForgotLabel>
            </ForgotButton>
          </LoginBox>

          <LogButton style={styles.logBtn} onPress={handleLogIn}>
            <LogText>Login</LogText>
          </LogButton>

          <SocialBox>
            <SocialLabel>ou entre com</SocialLabel>
            <SocialButtonsBox>
              <SocialButton onPress={() => googlePromptAsync()}>
                <FontAwesome name="google" size={23} color="red" />
              </SocialButton>
              {appleAvailable && (
                <SocialButton onPress={handleAppleLogin}>
                  <FontAwesome name="apple" size={23} color="black" />
                </SocialButton>
              )}
            </SocialButtonsBox>
          </SocialBox>

          <Footer>
            <SignUpText>Não tem uma conta? </SignUpText>
            <SignUpButton onPress={() => router.navigate('/signUp')}>
              <SignUpButtonText>Registre-se aqui!</SignUpButtonText>
            </SignUpButton>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
