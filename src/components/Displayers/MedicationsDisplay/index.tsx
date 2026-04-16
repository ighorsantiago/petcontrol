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

export function MedicationsDisplay({ petId }: Props) {
    const { user } = useAuth();
    const pet = user?.pets ? user.pets.filter((item) => item.id === petId) : [];

    return (
        <Container>
            <AddButton
                onPress={() =>
                    router.navigate({
                        pathname: '/medications',
                        params: { dropdown: 'yes', petId: pet[0].id },
                    })
                }
            >
                <AddButtonText>Adicionar</AddButtonText>
            </AddButton>
            <Content>
                {!!pet[0].medications && (
                    <FlatList
                        data={pet[0].medications}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Box>
                                <Title>Medicação</Title>
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
                        )}
                    />
                )}
            </Content>
        </Container>
    );
}
