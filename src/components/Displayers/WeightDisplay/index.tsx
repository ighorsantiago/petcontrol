import { FlatList } from 'react-native';
import { router } from 'expo-router';

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

export function WeightDisplay({ petId }: Props) {
    const { user } = useAuth();
    const pet = user?.pets ? user.pets.filter((item) => item.id === petId) : [];

    return (
        <Container>
            <AddButton
                onPress={() =>
                    router.navigate({
                        pathname: '/weight',
                        params: { dropdown: 'yes', petId: pet[0].id },
                    })
                }
            >
                <AddButtonText>Adicionar</AddButtonText>
            </AddButton>
            <Content>
                {!!pet[0].weight && (
                    <FlatList
                        data={pet[0].weight}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Box>
                                <Title>Peso</Title>
                                <BoxContent>
                                    <InfoBox>
                                        <Label>Data: </Label>
                                        <Text>{item.weighingDate}</Text>
                                    </InfoBox>
                                    <InfoBox>
                                        <Label>Peso: </Label>
                                        <Text>{item.amount}</Text>
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
