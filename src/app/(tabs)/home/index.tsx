import { useEffect, useState } from 'react';
import { FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router } from 'expo-router';
// import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '@/context/AuthContext';

// import { AddPet } from '@/app/AddPet';

import {
      Container,
      Header,
      Title,
      Subtitle,
      UserIcon,
      Content,
      AddButton,
      Text,
      LogoutBtn,
      MessageBox,
      // Rect,
      ModalContainer,
      Avatar
} from './styles';

import { ImageOptionsCard } from '@/components/ImageOptionsCard';

import { optionsHome as options } from '@/utils/options';

export default function Home() {

      const { user } = useAuth();
      // const { t } = useTranslation();

      function handleNavigation(option: string) {

            if (option === 'vaccines' || option === 'medications' || option === 'deworming' || option === 'hygiene') {
                  // router.navigate(`/${option}`, { dropdown: true });
                  router.push({ pathname: `/${option}`, params: { dropdown: 'yes' } });
            }
      }

      return (
            <Container>
                  <Header>
                        <MessageBox>
                              <Title>Olá {user?.name}!</Title>
                              <Subtitle>O que seu pet precisa hoje?</Subtitle>
                        </MessageBox>
                        {/* <LogoutBtn title='X' onPress={handleSignOut} /> */}
                        <UserIcon>
                              {
                                    user?.avatar
                                          ? <Avatar src={user.avatar} />
                                          : <MaterialCommunityIcons name="account" size={60} color="#3E84A8" />
                              }
                        </UserIcon>
                  </Header>
                  <Content>
                        <AddButton onPress={() => router.navigate('/addPet')} activeOpacity={0.8}>
                              <Text>Adicionar o pet</Text>
                        </AddButton>
                        <FlatList
                              data={options}
                              keyExtractor={(item) => item.key}
                              numColumns={2}
                              renderItem={({ item }) => (
                                    <ImageOptionsCard
                                          type={item.icon}
                                          name={item.name}
                                          icon={item.icon}
                                          onPress={() => handleNavigation(item.key)}
                                    />
                              )}
                              scrollEnabled={options.length > 4}
                        />
                  </Content>
            </Container>
      )
}
