import { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

import { Container, Content, Form } from './styles';

import { useAuth } from '@/hooks';
import { maskDate } from '@/utils/masks';
import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrors';

import { addPetHygiene } from '@/services/user.service';

type RouteParams = {
    dropdown: string;
    petId: string;
};

interface PetsProps {
    label: string;
    value: string;
}

const HYGIENE_CATEGORIES = [
    { label: 'Banho', value: 'Banho' },
    { label: 'Tosa', value: 'Tosa' },
    { label: 'Banho e tosa', value: 'Banho e tosa' },
];

export default function Hygiene() {
    const route = useLocalSearchParams();
    const { dropdown, petId } = route as RouteParams;

    const { user, updateUser } = useAuth();
    const { toast } = useToast();

    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const pets = user?.pets ? user.pets : [];

    const [organizedPets, setOrganizedPets] = useState<PetsProps[]>([]);
    const [petID, setPetID] = useState('');
    const [petOpen, setPetOpen] = useState(false);

    const [category, setCategory] = useState('');
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [categories] = useState(HYGIENE_CATEGORIES);

    useFocusEffect(
        useCallback(() => {
            const organized = pets.map((pet) => ({ label: pet.name, value: pet.id }));
            setOrganizedPets(organized);
            setDate('');
            setCategory('');
            setPetID('');
        }, []),
    );

    async function handleUpdateHygiene() {
        setIsLoading(true);
        try {
            const id = String(new Date().getTime());
            const pet_id = dropdown ? petID : petId;

            if (user?.name) {
                const updatedUser = await addPetHygiene(user, pet_id, {
                    id,
                    category,
                    date,
                });
                updateUser(updatedUser);
            }

            toast('A higiene do seu pet foi adicionada com sucesso.', 'success', 4000, 'top', false);
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
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setPetOpen(false); setCategoriesOpen(false); }}>
                <Content>
                    <AddHeader
                        style={{ borderRadius: 30 }}
                        title="Higiene"
                        handleCancel={cancel}
                        handleSave={handleUpdateHygiene}
                        isLoading={isLoading}
                    />
                    <Form>
                        {!!dropdown && (
                            <DropDownPicker
                                style={style.dropdownContainer}
                                dropDownContainerStyle={style.dropdown}
                                placeholder="Escolha o pet..."
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
                                onOpen={() => setCategoriesOpen(false)}
                                setValue={setPetID}
                                zIndex={100}
                            />
                        )}
                        <DropDownPicker
                            style={style.dropdownContainer}
                            dropDownContainerStyle={style.dropdown}
                            placeholder="Categoria"
                            placeholderStyle={{ color: '#4A4A4A' }}
                            open={categoriesOpen}
                            value={category}
                            items={categories}
                            setOpen={setCategoriesOpen}
                            onOpen={() => setPetOpen(false)}
                            setValue={setCategory}
                            zIndex={1}
                        />
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
