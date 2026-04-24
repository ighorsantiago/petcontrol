import { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { useToast } from '@/components/Toast';

import { useTranslation } from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '@/hooks';

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

import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';

import header from '@/assets/header.png';

export default function Login() {
  const { logInFirebase, forgotPasswordFirebase } = useAuth();
  // const { t } = useTranslation();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        toast('Digite seu e-mail e sua senha.', 'destructive', 4000, 'top', false);
        return
        // Alert.alert('Digite seu e-mail e sua senha.');
      }

      await logInFirebase(email, password);
    } catch (error) {
      // Alert.alert('E-mail ou senha incorretos.');
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
      toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);

    }
  }

  async function handleForgotPassword() {
    if (!email) {
      // return Alert.alert('Tutor', 'Por favor, informe seu e-mail.');
      return toast('Por favor, informe seu e-mail.', 'destructive', 4000, 'top', false);
    }

    try {
      await forgotPasswordFirebase(email);
      toast('Confira seu e-mail para redefinir a senha.', 'success', 4000, 'top', false);
    } catch (error) {

      toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
      // toast.show({
      //     placement: 'top',
      //     bgColor: 'red.500',
      //     description: 'Ocorreu um erro, por favor tente novamente.'
      // });
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
