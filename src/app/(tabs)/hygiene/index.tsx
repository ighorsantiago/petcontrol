import { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';
import { v4 as uuidv4 } from 'uuid';

import { Container, Content, Form } from './styles';

import { useAuth } from '@/hooks';
import { maskDate } from '@/utils/masks';
import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';

import { addPetHygiene } from '@/services/user.service';

type RouteParams = {
    dropdown: string;
    petId: string;
};

interface PetsProps {
    label: string;
    value: string;
}

export default function Hygiene() {
    const route = useLocalSearchParams();
    const { dropdown, petId } = route as RouteParams;

    const { user, updateUser } = useAuth();
    const { t } = useTranslation();
    const { toast } = useToast();

    const [date, setDate] = useState('');
    const [schedule, setSchedule] = useState('');

    const pets = user?.pets ? user.pets : [];

    const [organizedPets, setOrganizedPets] = useState<PetsProps[]>([]);
    const [petID, setPetID] = useState('');
    const [petOpen, setPetOpen] = useState(false);

    const [category, setCategory] = useState('');
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [categories, setCategories] = useState([
        { label: 'Banho', value: 'bath' },
        { label: 'Tosa', value: 'shave' },
    ]);

    const onPetOpen = useCallback(() => {
        setCategoriesOpen(false);
    }, []);

    const onCategoriesOpen = useCallback(() => {
        setPetOpen(false);
    }, []);

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

    async function handleUpdateHygiene() {
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

            toast(
                'A higiene do seu pet foi adicionado com sucesso.',
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
                    {/* <AddHeader title="Higiene" handleCancel={cancel} handleSave={() => handleUpdateHygiene} /> */}
                    <AddHeader
                        style={{ borderRadius: 30 }}
                        title="Higiêne"
                        handleCancel={cancel}
                        handleSave={handleUpdateHygiene}
                    />
                    <Form>
                        {!!dropdown && (
                            <DropDownPicker
                                style={style.dropdownContainer}
                                dropDownContainerStyle={style.dropdown}
                                placeholder="Escolha o pet..."
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
                                onOpen={onPetOpen}
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
                            onOpen={onCategoriesOpen}
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
