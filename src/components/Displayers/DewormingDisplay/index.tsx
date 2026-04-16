import { FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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

import { useAuth } from '@/context/AuthContext';

import { Header } from '../../Header';

import type{ PetDTO } from '@/dtos/PetDTO';

interface RouteParams {
      pet: PetDTO;
}

type Props = {
      petId: string;
}

export function DewormingDisplay({ petId }: Props) {
      
      const { user } = useAuth();
      const { t } = useTranslation();

      const pet = user?.pets 
            ? user.pets.filter(item => item.id === petId)
            : [];

      return (
            <Container>
                  <AddButton onPress={() => router.navigate({pathname: '/deworming', params: { dropdown: 'yes', petId: pet[0].id }})}>
                        <AddButtonText>Adiconar</AddButtonText>
                  </AddButton>
                  <Content>
                        {
                              !!pet[0].deworming &&
                              <FlatList
                                    data={pet[0].deworming}
                                    keyExtractor={item => item.id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) =>
                                          <Box>
                                                <Title>Vermífugo</Title>
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
