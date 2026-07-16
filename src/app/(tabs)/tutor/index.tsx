import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { useAuth } from '@/hooks';
import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';

import {
  Container,
  UserAvatar,
  Avatar,
  ChangePhotoBtn,
  Form,
  LogoutBtnLabel,
  LogoutBtn,
} from './styles';

export default function Tutor() {
  const { user, updateUser, changePasswordFirebase, logOut } = useAuth();
  const { toast } = useToast();

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  async function handleSave() {
    try {
      if (newPassword === '') {
        const updatedUser = {
          ...user,
          email: user?.email ?? '',
          name,
        };

        updateUser(updatedUser);
        toast('Seu nome foi alterado com sucesso.', 'success', 4000, 'bottom', false);
      } else {
        await changePasswordFirebase(newPassword);
        toast('Sua senha foi alterada com sucesso.', 'success', 4000, 'bottom', false);
      }
    } catch (error) {
      toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
    }
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    setOpen(false);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          toast('Imagem muito grande. Escolha uma de até 5MB.', 'destructive', 4000, 'top', false);
          return;
        }

        const permanentUri = `${FileSystem.documentDirectory}user_avatar_${Date.now()}.jpg`;
        await FileSystem.copyAsync({ from: photoSelected.assets[0].uri, to: permanentUri });

        if (user) {
          updateUser({ ...user, avatar: permanentUri });
        }

        toast('Sua foto foi alterada com sucesso.', 'success', 4000, 'top', false);
      }
    } catch {
      toast('Ocorreu um problema, por favor tente novamente.', 'destructive', 4000, 'bottom', false);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleSignOut() {
    Alert.alert('Tem certeza?', `${user?.name}, se você sair precisará fazer login novamente.`, [
      { text: 'Cancelar' },
      { text: 'Sair', onPress: logOut },
    ]);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AddHeader
          style={{ height: 110 }}
          title="Profile"
          handleCancel={() => router.navigate('/home')}
          handleSave={handleSave}
        />

        <UserAvatar>
          {user?.avatar ? (
            <Avatar source={{ uri: user.avatar }} />
          ) : (
            <MaterialIcons name="person" size={100} color="#3E84A8" />
          )}
          <ChangePhotoBtn onPress={handleUserPhotoSelect}>
            <MaterialIcons name="add-a-photo" size={20} color="#FFEF61" />
          </ChangePhotoBtn>
        </UserAvatar>

        <Form>
          <InputForm
            placeholder={user?.name}
            placeholderTextColor="darkgray"
            onChangeText={setName}
          />
          <InputForm
            placeholder={user?.email ?? ''}
            placeholderTextColor="darkgray"
          />
          <InputForm
            icon={false}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nova senha"
            placeholderTextColor="darkgray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </Form>

        <LogoutBtn onPress={handleSignOut}>
          <LogoutBtnLabel>Sair</LogoutBtnLabel>
        </LogoutBtn>
      </Container>
    </TouchableWithoutFeedback>
  );
}
