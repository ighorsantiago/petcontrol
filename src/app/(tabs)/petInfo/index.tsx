import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
// import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks';

import {
    Container,
    Header,
    Button,
    Title,
    PetInfoBox,
    PetIcon,
    Avatar,
    ChangePhotoBtn,
    PetInfoText,
    Content,
    Subscreen,
} from './styles';

import { OptionsCard } from '@/components/OptionsCard';
import { useToast } from '@/components/Toast';

import { GeneralDisplay } from '@/components/Displayers/GeneralDisplay';
import { VaccinesDisplay } from '@/components/Displayers/VaccinesDisplay';
import { MedicationsDisplay } from '@/components/Displayers/MedicationsDisplay';
import { DewormingDisplay } from '@/components/Displayers/DewormingDisplay';
import { HygieneDisplay } from '@/components/Displayers/HygieneDisplay';
import { AppointmentsDisplay } from '@/components/Displayers/AppointmentsDisplay';
import { WeightDisplay } from '@/components/Displayers/WeightDisplay';

import { options } from '@/utils/options';
import { getPetAge } from '@/utils/getPetAge';

import { updatePetAvatar } from '@/services/user.service';

type RouteParams = {
    petId: string;
};

interface OptionsProps {
    key: string;
    name: string;
    icon: string;
}

export default function PetInfo() {

    const route = useLocalSearchParams();
    const { petId } = route as RouteParams;

    const { user, updateUser } = useAuth();
    // const { t } = useTranslation();

    const { toast } = useToast();

    const userPet = user?.pets ? user.pets.filter(item => item.id === petId) : [];
    const pet = userPet[0];
    const { yearsOld, monthsOld } = getPetAge(pet.birth);

    const [modalOpen, setModalOpen] = useState(false);
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [screenSelected, setScreenSelected] = useState('info');

    async function handlePetPhotoSelect() {

        setPhotoIsLoading(true);
        setOpen(false);

        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });

            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets[0].uri) {

                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
                    setOpen(!open);

                    toast("Essa imagem é muito grande, escolha uma de até 5MB.", "destructive", 4000, "bottom", false);
                }

                if(user?.name) {
                    const updatedUser = await updatePetAvatar(user, pet.id, photoSelected.assets[0].uri);
                    updateUser(updatedUser);
                }

                toast("A foto do seu pet foi alterada com sucesso.", "success", 4000, "bottom", false);
            }

        } catch (error) {
            toast("Ocorreu um problema, por favor tente novamente.", "destructive", 4000, "bottom", false);
        } finally {
            setPhotoIsLoading(false)
        }
    }

    return (
        <Container>
            <Header>
                <Button
                    style={{
                        position: 'absolute',
                        bottom: 30,
                        left: 30,
                    }}
                    onPress={() => router.navigate('/pets')}
                >
                    <MaterialIcons name="arrow-back-ios" size={23} color="#E27E08" />
                </Button>
                <Title>
                    {pet.name}
                </Title>
            </Header>

            <PetInfoBox>
                <PetIcon>
                    {
                        pet.avatar
                            ? <Avatar src={pet.avatar} />
                            : <MaterialCommunityIcons name={pet.icon} size={80} color="#3E84A8" />
                    }
                    <ChangePhotoBtn onPress={handlePetPhotoSelect}>
                        <MaterialIcons name="add-a-photo" size={20} color='#FFEF61' />
                    </ChangePhotoBtn>
                </PetIcon>
                <PetInfoText>
                    {pet.specie} - {pet.gender} {'\n'}
                    {pet.breed} {'\n'}
                    {/* {yearsOld} anos {(monthsOld)} meses */}
                    {yearsOld} anos
                </PetInfoText>
            </PetInfoBox>

            <Content>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.key}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <OptionsCard
                            name={item.name}
                            active={screenSelected === item.key}
                            onPress={() => setScreenSelected(item.key)}
                        />
                    )}
                    alwaysBounceHorizontal
                />
            </Content>
            <Subscreen>
                {screenSelected === 'info' && <GeneralDisplay pet={pet} />}
                {screenSelected === 'vaccines' && <VaccinesDisplay petId={pet.id} />}
                {screenSelected === 'medications' && <MedicationsDisplay petId={pet.id} />}
                {screenSelected === 'deworming' && <DewormingDisplay petId={pet.id} />}
                {screenSelected === 'hygiene' && <HygieneDisplay petId={pet.id} />}
                {screenSelected === 'weight' && <WeightDisplay petId={pet.id} />}
                {screenSelected === 'appointments' && <AppointmentsDisplay petId={pet.id} />}
            </Subscreen>
        </Container>
    );
}
