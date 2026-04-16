import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { Container, Content, Form } from './styles';

import { useAuth } from '@/hooks';
import { maskDate } from '@/utils/masks';
import { AddHeader } from '@/components/AddHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';

import { addPetDeworming } from '@/services/user.service';

type RouteParams = {
    dropdown: string;
    petId: string;
};

interface PetsProps {
    label: string;
    value: string;
}

export default function Deworming() {
    const route = useLocalSearchParams();
    const { dropdown, petId } = route as RouteParams;

    const { user, updateUser } = useAuth();
    const { t } = useTranslation();

    const { toast } = useToast();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const pets = user?.pets ? user.pets : [];

    const [organizedPets, setOrganizedPets] = useState<PetsProps[]>([]);
    const [petID, setPetID] = useState('');
    const [petOpen, setPetOpen] = useState(false);

    function petsOrgonizer() {
        const organizingPets = [];

        for (let i = 0; i < pets.length; i++) {
            const pet = pets[i];

            organizingPets.push({
                label: pet.name,
                value: pet.id,
            });
        }

        setOrganizedPets(organizingPets);
    }

    async function handleUpdateDeworming() {
        try {
            const id = String(new Date().getTime());
            const pet_id = dropdown ? petID : petId;

            if (user?.name) {
                const updatedUser = await addPetDeworming(user, petId, {
                    id,
                    name,
                    date,
                });
                updateUser(updatedUser);
            }

            toast(
                'O vermífugo do seu pet foi adicionado com sucesso.',
                'success',
                4000,
                'bottom',
                false,
            );
        } catch (error) {
            toast(
                getFirebaseErrorMessage(error),
                'destructive',
                4000,
                'bottom',
                false,
            );
        } finally {
            router.back();
        }
    }

    function cancel() {
        router.back();
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        petsOrgonizer();
    }, []);

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Content>
                    {/* <AddHeader title={t('deworming.deworming')} handleCancel={cancel} handleSave={() => handleUpdateDeworming} /> */}
                    <AddHeader
                        style={{ borderRadius: 30 }}
                        title="Vermífugo"
                        handleCancel={cancel}
                        handleSave={handleUpdateDeworming}
                    />
                    <Form>
                        {!!dropdown && (
                            <DropDownPicker
                                style={style.dropdownContainer}
                                dropDownContainerStyle={style.dropdown}
                                placeholder="Escolha o pet"
                                placeholderStyle={{ color: '#4A4A4A' }}
                                ListEmptyComponent={() => (
                                    // <></>
                                    <Text style={{ backgroundColor: '#fff' }}>
                                        Nenhum pet adicionado
                                    </Text>
                                )}
                                open={petOpen}
                                value={petID}
                                items={organizedPets}
                                setOpen={setPetOpen}
                                setValue={setPetID}
                                zIndex={2}
                            />
                        )}
                        <InputForm placeholder="Nome" value={name} onChangeText={setName} />
                        <InputForm
                            style={{ backgroundColor: '#FFF' }}
                            placeholder="Data"
                            value={date}
                            onChangeText={(e) => setDate(maskDate(e))}
                            maxLength={10}
                            keyboardType="numeric"
                        />
                    </Form>
                </Content>
            </TouchableWithoutFeedback>
        </Container>
    );
}

const style = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
        minHeight: 65,
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#BDBBBB',
        borderRadius: 6,
        backgroundColor: '#FFF',
        zIndex: 10,
    },
    dropdown: {
        borderRadius: 0,
        borderColor: '#BDBBBB',
    },
});
