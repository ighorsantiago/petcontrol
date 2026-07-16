import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Container, Content, Box, Title, InfoBox, BoxContent, Label, Text } from './styles';

import type { Pet } from '@/types';

const HYGIENE_PT: Record<string, string> = {
    bath: 'Banho',
    shave: 'Tosa',
    Banho: 'Banho',
    Tosa: 'Tosa',
    'Banho e tosa': 'Banho e tosa',
};

type Props = {
    pet: Pet;
};

export function GeneralDisplay({ pet }: Props) {
    const { t } = useTranslation();

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <Content>
                    <Title>Últimas informações salvas</Title>
                    <Box>
                        <BoxContent>
                            <InfoBox>
                                <Label>Data de nascimento: </Label>
                                <Text>{pet.birth}</Text>
                            </InfoBox>
                        </BoxContent>

                        {!!pet.weight && (
                            <BoxContent>
                                <InfoBox>
                                    <Label>Peso: </Label>
                                    <Text>{pet.weight[pet.weight.length - 1].amount} quilos</Text>
                                </InfoBox>
                            </BoxContent>
                        )}

                        {!!pet.vaccines && (
                            <BoxContent>
                                <InfoBox>
                                    <Label>Vacina: </Label>
                                    <Text>{pet.vaccines[pet.vaccines.length - 1].name}</Text>
                                </InfoBox>
                            </BoxContent>
                        )}

                        {!!pet.medications && (
                            <BoxContent>
                                <InfoBox>
                                    <Label>Medicação: </Label>
                                    <Text>{pet.medications[pet.medications.length - 1].name}</Text>
                                </InfoBox>
                            </BoxContent>
                        )}

                        {!!pet.deworming && (
                            <BoxContent>
                                <InfoBox>
                                    <Label>Vermífugo: </Label>
                                    <Text>{pet.deworming[pet.deworming.length - 1].name}</Text>
                                </InfoBox>
                            </BoxContent>
                        )}

                        {!!pet.food && (
                            <BoxContent>
                                <InfoBox>
                                    <Label>Comida: </Label>
                                    <Text>{pet.food[pet.food.length - 1].name}</Text>
                                </InfoBox>
                            </BoxContent>
                        )}

                        {!!pet.hygiene && (
                            <BoxContent>
                                <InfoBox>
                                    <Label>Higiene: </Label>
                                    <Text>
                                        {HYGIENE_PT[pet.hygiene[pet.hygiene.length - 1].category] ??
                                            pet.hygiene[pet.hygiene.length - 1].category}
                                    </Text>
                                </InfoBox>
                            </BoxContent>
                        )}

                        {!!pet.appointments && (
                            <BoxContent>
                                <InfoBox>
                                    <Label>Compromisso: </Label>
                                    <Text>{pet.appointments[pet.appointments.length - 1].name}</Text>
                                </InfoBox>
                            </BoxContent>
                        )}
                    </Box>
                </Content>
            </ScrollView>
        </Container>
    );
}
