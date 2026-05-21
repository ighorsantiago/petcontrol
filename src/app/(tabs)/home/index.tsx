import { FlatList } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '@/hooks';
import { ImageOptionsCard } from '@/components/ImageOptionsCard';
import { optionsHome as options } from '@/constants/options';

import {
    Container,
    Header,
    Title,
    Subtitle,
    UserIcon,
    Content,
    AddButton,
    Text,
    MessageBox,
    Avatar,
} from './styles';

export default function Home() {
    const { user } = useAuth();

    function handleNavigation(option: string) {
        if (
            option === 'vaccines' ||
            option === 'medications' ||
            option === 'deworming' ||
            option === 'hygiene'
        ) {
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
                <UserIcon>
                    {user?.avatar ? (
                        <Avatar src={user.avatar} />
                    ) : (
                        <MaterialCommunityIcons name="account" size={60} color="#3E84A8" />
                    )}
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
                            type={item.key}
                            name={item.name}
                            icon={item.icon}
                            onPress={() => handleNavigation(item.key)}
                        />
                    )}
                    scrollEnabled={options.length > 4}
                />
            </Content>
        </Container>
    );
}
