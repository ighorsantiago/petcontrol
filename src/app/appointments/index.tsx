import { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View, Switch } from 'react-native';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

import { Container, Content, Form } from './styles';

import { useAuth } from '@/hooks';
import { maskDate, maskTime } from '@/utils/masks';
import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';
import { scheduleNotification } from '@/utils/notifications';
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
    const [reminderEnabled, setReminderEnabled] = useState(false);
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
            setHour('');
            setReminderEnabled(false);
            setPetID('');
        }, []),
    );

    async function handleUpdateAppointments() {
        if (!name.trim() || date.length < 10) {
            toast('Preencha o profissional e a data antes de salvar.', 'destructive', 3000, 'top', false);
            return;
        }
        setIsLoading(true);
        try {
            const id = String(new Date().getTime());
            const pet_id = dropdown ? petID : petId;
            const petName = pets.find((p) => p.id === pet_id)?.name ?? 'Pet';

            let notificationId: string | undefined;
            if (reminderEnabled && date.length === 10) {
                const nid = await scheduleNotification(petName, `Compromisso: ${name}`, date, hour || undefined);
                if (nid) notificationId = nid;
            }

            if (user?.name) {
                const updatedUser = await addPetAppointment(user, pet_id, {
                    id,
                    name,
                    date,
                    hour,
                    ...(reminderEnabled && date && { scheduledDate: date, scheduledHour: hour, notificationId }),
                });
                await updateUser(updatedUser);
            }

            toast('O compromisso foi adicionado com sucesso.', 'success', 4000, 'top', false);
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
                        title="Compromisso"
                        handleCancel={() => router.back()}
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
                        <View style={style.toggleRow}>
                            <Text style={style.toggleLabel}>Agendar lembrete</Text>
                            <Switch
                                value={reminderEnabled}
                                onValueChange={setReminderEnabled}
                                trackColor={{ false: '#BDBBBB', true: '#3E84A8' }}
                                thumbColor="#fff"
                            />
                        </View>
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
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginTop: 8,
    },
    toggleLabel: {
        fontSize: 15,
        color: '#4A4A4A',
    },
});
