import { useCallback, useState } from 'react';
import { Text, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';

import { Container, Content, Form } from './styles';

import { useAuth } from '@/hooks';
import { maskDate } from '@/utils/masks';
import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { Dropdown } from '@/components/Dropdown';
import { NotificationToggle } from '@/components/NotificationToggle';
import { useToast } from '@/components/Toast';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { scheduleNotification } from '@/utils/notifications';
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
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledHour, setScheduledHour] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const pets = user?.pets ?? [];
    const [organizedPets, setOrganizedPets] = useState<PetsProps[]>([]);
    const [petID, setPetID] = useState('');
    const [petOpen, setPetOpen] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setOrganizedPets(pets.map((p) => ({ label: p.name, value: p.id })));
            setName('');
            setDate('');
            setScheduledDate('');
            setScheduledHour('');
            setPetID('');
        }, []),
    );

    async function handleUpdateVaccine() {
        setIsLoading(true);
        try {
            const id = String(new Date().getTime());
            const pet_id = dropdown ? petID : petId;
            const petName = pets.find((p) => p.id === pet_id)?.name ?? 'Pet';

            let notificationId: string | undefined;
            if (scheduledDate.length === 10) {
                const nid = await scheduleNotification(petName, `Vacina: ${name}`, scheduledDate, scheduledHour || undefined);
                if (nid) notificationId = nid;
            }

            if (user?.name) {
                const updatedUser = await addPetVaccine(user, pet_id, {
                    id,
                    name,
                    date,
                    ...(scheduledDate && { scheduledDate, scheduledHour, notificationId }),
                });
                await updateUser(updatedUser);
            }

            toast('A vacina do seu pet foi adicionada com sucesso.', 'success', 4000, 'top', false);
        } catch (error) {
            toast(getFirebaseErrorMessage(error), 'destructive', 4000, 'top', false);
        } finally {
            setIsLoading(false);
            router.back();
        }
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setPetOpen(false); }}>
                <Content>
                    <AddHeader
                        style={{ borderRadius: 30 }}
                        title="Vacinas"
                        handleCancel={() => router.back()}
                        handleSave={handleUpdateVaccine}
                        isLoading={isLoading}
                    />
                    <Form>
                        {!!dropdown && (
                            <Dropdown
                                placeholder="Escolha o pet..."
                                placeholderStyle={{ color: '#4A4A4A' }}
                                ListEmptyComponent={() => (
                                    <Text style={{ backgroundColor: '#fff' }}>Nenhum pet adicionado</Text>
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
                        <NotificationToggle
                            scheduledDate={scheduledDate}
                            scheduledHour={scheduledHour}
                            onChangeDate={setScheduledDate}
                            onChangeHour={setScheduledHour}
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
