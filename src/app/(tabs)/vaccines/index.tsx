import { useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { Container, Content, Form } from './styles';

import { useAuth } from '@/hooks';

import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { Dropdown } from '@/components/Dropdown';
import { useToast } from '@/components/Toast';

import { maskDate } from '@/utils/masks';

import { addPetVaccine } from '@/services/user.service';

interface PetsProps {
    label: string;
    value: string;
}

type RouteParams = {
    dropdown: string;
    petId: string;
};

export default function Vaccines() {
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

    async function handleUpdateVaccine() {
        try {
            const id = String(new Date().getTime());
            const pet_id = dropdown ? petID : petId;

            if (user?.name) {
                const updatedUser = await addPetVaccine(user, pet_id, {
                    id,
                    name,
                    date,
                });
                updateUser(updatedUser);
            }

            toast(
                'A vacina do seu pet foi adicionada com sucesso.',
                'success',
                4000,
                'bottom',
                false,
            );
        } catch (error) {
            toast(
                'Ocorreu um problema, por favor tente novamente.',
                'destructive',
                4000,
                'bottom',
                false,
            );
            console.log('handleUpdateVaccine =>', error);
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
                    <AddHeader
                        style={{ borderRadius: 30 }}
                        title="Vacinas"
                        handleCancel={cancel}
                        handleSave={handleUpdateVaccine}
                    />
                    <Form>
                        {!!dropdown && (
                            <Dropdown
                                placeholder="Escolha o pet..."
                                placeholderStyle={{ color: '#4A4A4A' }}
                                ListEmptyComponent={() => (
                                    <Text style={{ backgroundColor: '#fff' }}>
                                        {t('vaccines.empty')}
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
                        <InputForm placeholder="Vacina" value={name} onChangeText={setName} />
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
