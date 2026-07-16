import { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

import { Container, Content, Form } from './styles';

import { useAuth } from '@/hooks';
import { maskDate, maskTime } from '@/utils/masks';
import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';

import { addPetAppointment } from '@/services/user.service';

type RouteParams = {
    dropdown: string;
    petId: string;
};

interface PetsProps {
    label: string;
    value: string;
}

export default function Appointments() {
    const route = useLocalSearchParams();
    const { dropdown, petId } = route as RouteParams;

    const { user, updateUser } = useAuth();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const pets = user?.pets ? user.pets : [];

    const [organizedPets, setOrganizedPets] = useState<PetsProps[]>([]);
    const [petID, setPetID] = useState('');
    const [petOpen, setPetOpen] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const organized = pets.map((pet) => ({ label: pet.name, value: pet.id }));
            setOrganizedPets(organized);
            setName('');
            setDate('');
            setHour('');
            setPetID('');
        }, []),
    );

    async function handleUpdateAppointments() {
        setIsLoading(true);
        try {
            const id = String(new Date().getTime());
            const pet_id = dropdown ? petID : petId;

            if (user?.name) {
                const updatedUser = await addPetAppointment(user, pet_id, {
                    id,
                    name,
                    date,
                    hour,
                });
                updateUser(updatedUser);
            }

            toast('O compromisso foi adicionado com sucesso.', 'success', 4000, 'top', false);
        } catch (error) {
            toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
        } finally {
            setIsLoading(false);
            router.back();
        }
    }

    function cancel() {
        router.back();
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setPetOpen(false); }}>
                <Content>
                    <AddHeader
                        style={{ borderRadius: 30 }}
                        title="Compromisso"
                        handleCancel={cancel}
                        handleSave={handleUpdateAppointments}
                        isLoading={isLoading}
                    />
                    <Form>
                        {!!dropdown && (
                            <DropDownPicker
                                style={style.dropdownContainer}
                                dropDownContainerStyle={style.dropdown}
                                placeholder="Escolha o pet"
                                placeholderStyle={{ color: '#4A4A4A' }}
                                ListEmptyComponent={() => (
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
                        <InputForm placeholder="Profissional" value={name} onChangeText={setName} />
                        <InputForm
                            style={{ backgroundColor: '#FFF' }}
                            placeholder="Data"
                            value={date}
                            onChangeText={(e) => setDate(maskDate(e))}
                            maxLength={10}
                            keyboardType="numeric"
                        />
                        <InputForm
                            placeholder="Hora"
                            value={hour}
                            onChangeText={(e) => setHour(maskTime(e))}
                            maxLength={5}
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
