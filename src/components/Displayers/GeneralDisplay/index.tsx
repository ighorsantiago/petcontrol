import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
} from './styles';

import { useAuth } from '@/hooks';

import type { Pet } from '@/types';

interface RouteParams {
      pet: Pet;
}

type Props = {
      pet: Pet;
}

export function GeneralDisplay({ pet }: Props) {

      // const navigation = useNavigation();
      // const route = useRoute();

      // const { pet } = route.params as RouteParams;
      // const { user } = useAuth();
      // const pet = user.pets ? user.pets[0] : [];

      const { t } = useTranslation();

      let amountOfFood = 0;

      if (pet.food) {
            amountOfFood = Number(pet.food[pet.food.length - 1].amountPerMeal) / Number(pet.food[pet.food.length - 1].amountPerMeal);
      }

      function handleGoBack() {
            // navigation.goBack();
      }

      return (
            <Container>
                  <Content>
                        <Title>
                              Últimas informações salvas
                        </Title>
                        <Box>

                              <BoxContent>
                                    <InfoBox>
                                          <Label>Data de nascimento: </Label>
                                          <Text>{pet.birth}</Text>
                                    </InfoBox>
                              </BoxContent>
                              {/* <Title>{t('displayers.birth')}</Title>
                              <InfoBox>
                                    <Label>{pet.birth}</Label>
                              </InfoBox> */}


                              {
                                    !!pet.weight &&
                                    <>
                                          {/* <Title>{t('displayers.last.weight')}</Title> */}
                                          <BoxContent>
                                                <InfoBox>
                                                      <Label>Peso: </Label>
                                                      <Text>{pet.weight[pet.weight.length - 1].amount} quilos</Text>
                                                </InfoBox>
                                                {/* <InfoBox>
                                                <Label>{t('displayers.date')}: </Label>
                                                <Text>{pet.weight[pet.weight.length - 1].weighingDate}</Text>
                                          </InfoBox> */}
                                          </BoxContent>
                                    </>
                              }

                              {
                                    !!pet.vaccines &&
                                    <>
                                          {/* <Title>{t('displayers.last.vaccine')}</Title> */}
                                          <BoxContent>
                                                <InfoBox>
                                                      <Label>Vacina: </Label>
                                                      <Text>{pet.vaccines[pet.vaccines.length - 1].name}</Text>
                                                </InfoBox>
                                                {/* <InfoBox>
                                                <Label>{t('displayers.date')}: </Label>
                                                <Text>{pet.vaccines[pet.vaccines.length - 1].date}</Text>
                                          </InfoBox> */}
                                          </BoxContent>
                                    </>
                              }

                              {
                                    !!pet.medications &&
                                    <>
                                          {/* <Title>{t('displayers.last.medication')}</Title> */}
                                          <BoxContent>
                                                <InfoBox>
                                                      <Label>Medicação: </Label>
                                                      <Text>{pet.medications[pet.medications.length - 1].name}</Text>
                                                </InfoBox>
                                                {/* <InfoBox>
                                                <Label>{t('displayers.date')}: </Label>
                                                <Text>{pet.medications[pet.medications.length - 1].date}</Text>
                                          </InfoBox> */}
                                          </BoxContent>
                                    </>
                              }

                              {
                                    !!pet.deworming &&
                                    <>
                                          {/* <Title>{t('displayers.last.deworming')}</Title> */}
                                          <BoxContent>
                                                <InfoBox>
                                                      <Label>Vermífugo: </Label>
                                                      <Text>{pet.deworming[pet.deworming.length - 1].name}</Text>
                                                </InfoBox>
                                                {/* <InfoBox>
                                                <Label>{t('displayers.date')}: </Label>
                                                <Text>{pet.deworming[pet.deworming.length - 1].date}</Text>
                                          </InfoBox> */}
                                          </BoxContent>
                                    </>
                              }

                              {
                                    !!pet.food &&
                                    <>
                                          {/* <Title>{t('displayers.food')}</Title> */}
                                          <BoxContent>
                                                <InfoBox>
                                                      <Label>Comida: </Label>
                                                      <Text>{pet.food[pet.food.length - 1].name}</Text>
                                                </InfoBox>
                                                <InfoBox>
                                                      <Label>Quantidade total: </Label>
                                                      <Text>{pet.food[pet.food.length - 1].amount}</Text>
                                                </InfoBox>
                                                <InfoBox>
                                                      <Label>Quantidade: </Label>
                                                      <Text>
                                                            {amountOfFood} {t('displayers.perMeal')}
                                                      </Text>
                                                </InfoBox>
                                          </BoxContent>
                                    </>
                              }

                              {
                                    !!pet.hygiene &&
                                    <>
                                          {/* <Title>{t('displayers.last.hygiene')}</Title> */}
                                          <BoxContent>
                                                <InfoBox>
                                                      <Label>Categoria: </Label>
                                                      <Text>{pet.hygiene[pet.hygiene.length - 1].category}</Text>
                                                </InfoBox>
                                                {/* <InfoBox>
                                                <Label>{amountOfFood} {t('displayers.date')}: </Label>
                                                <Text>{pet.hygiene[pet.hygiene.length - 1].date}</Text>
                                          </InfoBox> */}
                                          </BoxContent>
                                    </>
                              }

                              {
                                    !!pet.appointments &&
                                    <>
                                          {/* <Title>{t('displayers.last.appointments')}</Title> */}
                                          <BoxContent>
                                                <InfoBox>
                                                      <Label>Consulta: </Label>
                                                      <Text>{pet.appointments[pet.appointments.length - 1].name}</Text>
                                                </InfoBox>
                                                {/* <InfoBox>
                                                <Label>{amountOfFood} {t('displayers.date')}: </Label>
                                                <Text>{pet.appointments[pet.appointments.length - 1].date}</Text>
                                          </InfoBox> */}
                                          </BoxContent>
                                    </>
                              }
                        </Box>
                  </Content>
            </Container>
      );
}
