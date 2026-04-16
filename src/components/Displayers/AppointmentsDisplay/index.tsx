import { FlatList } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import {
      Container,
      Content,
      Box,
      Title,
      InfoBox,
      BoxContent,
      Label,
      Text,
      AddButton,
      AddButtonText,
} from './styles';

import { useAuth } from '@/hooks';

import type { Pet } from '@/types';

type Props = {
      petId: string;
}

export function AppointmentsDisplay({ petId }: Props) {
      
      const { user } = useAuth();
      const { t } = useTranslation();

      const pet = user?.pets 
            ? user.pets.filter(item => item.id === petId)
            : [];

      return (
            <Container>
                  <AddButton onPress={() => router.navigate({pathname: '/appointments', params: { dropdown: 'yes', petId: pet[0].id }})}>
                        <AddButtonText>Adicionar</AddButtonText>
                  </AddButton>
                  <Content>
                        {
                              !!pet[0].appointments &&
                              <FlatList
                                    data={pet[0].appointments}
                                    keyExtractor={item => item.id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) =>
                                          <Box>
                                                <Title>Consultas</Title>
                                                <BoxContent>
                                                      <InfoBox>
                                                            <Label>Nome: </Label>
                                                            <Text>{item.name}</Text>
                                                      </InfoBox>
                                                      <InfoBox>
                                                            <Label>Data: </Label>
                                                            <Text>{item.date}</Text>
                                                      </InfoBox>
                                                </BoxContent>
                                          </Box>
                                    }
                              />

                        }

                  </Content>
            </Container>
      );
}
