import { FlatList } from 'react-native';
import { router } from 'expo-router';

const HYGIENE_PT: Record<string, string> = {
    bath: 'Banho',
    shave: 'Tosa',
    Banho: 'Banho',
    Tosa: 'Tosa',
    'Banho e tosa': 'Banho e tosa',
};

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

import { Header } from '../../Header';

import type { Pet } from '@/types';

interface RouteParams {
    pet: Pet;
}

type Props = {
    petId: string;
};

export function HygieneDisplay({ petId }: Props) {
    const { user } = useAuth();
    const pet = user?.pets ? user.pets.filter((item) => item.id === petId) : [];

    return (
        <Container>
            <AddButton
                onPress={() =>
                    router.push({
                        pathname: '/hygiene',
                        params: { petId: pet[0].id },
                    })
                }
            >
                <AddButtonText>Adicionar</AddButtonText>
            </AddButton>
            <Content>
                {!!pet[0].hygiene && (
                    <FlatList
                        data={pet[0].hygiene}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Box>
                                <Title>Higiene</Title>
                                <BoxContent>
                                    <InfoBox>
                                        <Label>Tipo: </Label>
                                        <Text>{HYGIENE_PT[item.category] ?? item.category}</Text>
                                    </InfoBox>
                                    <InfoBox>
                                        <Label>Data: </Label>
                                        <Text>{item.date}</Text>
                                    </InfoBox>
                                </BoxContent>
                            </Box>
                        )}
                    />
                )}
            </Content>
        </Container>
    );
}
