import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
// import { v4 as uuidv4 } from 'uuid';
import DropDownPicker from 'react-native-dropdown-picker';

import {
      Container,
      Content,
      Form,
} from './styles';

import { useAuth } from '@/hooks';
import { maskDate } from '@/utils/masks';
import { AddHeader } from '@/components/AddHeader';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';

import { addPetMedication } from '@/services/user.service';

type RouteParams = {
      dropdown: string;
      petId: string;
};

interface PetsProps {
      label: string;
      value: string;
}

export default function Medications() {

      const route = useLocalSearchParams();
      const { dropdown, petId } = route as RouteParams;

      const { user, updateUser } = useAuth();
      const { t } = useTranslation();
      const { toast } = useToast();

      const [name, setName] = useState('');
      const [date, setDate] = useState('');
      const [hour, setHour] = useState('');

      const pets = user?.pets ? user.pets : [];

      const [organizedPets, setOrganizedPets] = useState<PetsProps[]>([])
      const [petID, setPetID] = useState('');
      const [petOpen, setPetOpen] = useState(false);

      function petsOrganizer() {

            const organizingPets = [];

            for (let i = 0; i < pets.length; i++) {

                  const pet = pets[i];

                  organizingPets.push({
                        label: pet.name,
                        value: pet.id
                  });
            }

            setOrganizedPets(organizingPets);
      }

      async function handleUpdateMedication() {
            try {
                  const id = String(new Date().getTime());
                  const pet_id = dropdown ? petID : petId;
                  
                  if(user?.name) {
                        const updatedUser = await addPetMedication(user, pet_id, { id, name, date, hour });
                        updateUser(updatedUser);
                  }

                  toast("Seu pet foi adicionado com sucesso.", "success", 4000, "bottom", false);
                  
            } catch (error) {
                  toast("Ocorreu um problema, por favor tente novamente.", "destructive", 4000, "bottom", false);
                  
            } finally {
                  router.back();
            }
      }

      function cancel() {
            router.back();
      }

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
            petsOrganizer();
      }, []);

      return (
            <Container>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Content>
                              <AddHeader
                                    style={{ borderRadius: 30 }}
                                    title='Medicações'
                                    handleCancel={cancel}
                                    handleSave={handleUpdateMedication} />
                              <Form>
                                    {
                                          !!dropdown &&
                                          <DropDownPicker
                                                style={style.dropdownContainer}
                                                dropDownContainerStyle={style.dropdown}
                                                placeholder='Escolha o pet'
                                                placeholderStyle={{ color: '#4A4A4A' }}
                                                ListEmptyComponent={() => (
                                                      <Text style={{ backgroundColor: '#fff' }}>{t('medications.empty')}</Text>
                                                )}
                                                open={petOpen}
                                                value={petID}
                                                items={organizedPets}
                                                setOpen={setPetOpen}
                                                setValue={setPetID}
                                                zIndex={2}
                                          />
                                    }
                                    <InputForm
                                          placeholder='Medicação'
                                          value={name}
                                          onChangeText={setName}
                                    />
                                    <InputForm
                                          style={{ backgroundColor: '#FFF' }}
                                          placeholder='Data'
                                          value={date}
                                          onChangeText={(e) => setDate(maskDate(e))}
                                          maxLength={10}
                                          keyboardType="numeric"
                                    />
                                    <InputForm
                                          placeholder='Hora'
                                          value={hour}
                                          onChangeText={setHour}
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
            zIndex: 10
      },
      dropdown: {
            borderRadius: 0,
            borderColor: '#BDBBBB',
      }
});
