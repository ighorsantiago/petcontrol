import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { useAuth } from '@/hooks';
import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { useToast } from '@/components/Toast';
import { isAppleSignInAvailable } from '@/services/auth.service';

import {
  Container,
  Header,
  RegisterBox,
  RigisterLabel,
  RegisterButton,
  RegisterText,
  SocialBox,
  SocialLabel,
  SocialButtonsBox,
  SocialButton,
  SignUpButton,
  SignUpButtonText,
} from './styles';

import header from '@/assets/header.png';

WebBrowser.maybeCompleteAuthSession();

export default function SignUp() {
  const { signInFirebase, logInWithGoogle, logInWithApple } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
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

  async function handleSignUp() {
    if (!name || !email || !password) {
      return toast('Preencha todos os campos.', 'destructive', 4000, 'top', false);
    }
    if (password !== passwordConfirm) {
      return toast('As senhas não coincidem.', 'destructive', 4000, 'top', false);
    }
    try {
      await signInFirebase(name, email, password);
      router.replace('/(tabs)/home');
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
    <KeyboardAwareScrollView>
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
              placeholderTextColor="gray"
            />
            <Input
              iconName="mail"
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
              placeholderTextColor="gray"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <PasswordInput
              iconName="lock"
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              placeholderTextColor="gray"
            />
            <PasswordInput
              iconName="lock"
              value={passwordConfirm}
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

          <SignUpButton onPress={() => router.navigate('/login')}>
            <SignUpButtonText>Já tem uma conta?</SignUpButtonText>
          </SignUpButton>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
