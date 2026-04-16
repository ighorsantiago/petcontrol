import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

import {
      Container,
      Content,
      Form,
} from './styles';

import { useAuth } from '@/hooks';
import { AddHeader } from '@/components/AddHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { InputForm } from '@/components/InputForm';
import { useToast } from '@/components/Toast';

import { addPetWeight } from '@/services/user.service';

type RouteParams = {
      dropdown: string;
      petId: string;
};

interface PetsProps {
      label: string;
      value: string;
}

export default function Weight() {

      const route = useLocalSearchParams();
      const { dropdown, petId } = route as RouteParams;

      const { user, updateUser } = useAuth();
      const { toast } = useToast();

      const [amount, setAmount] = useState('');
      const [weighingDate, setWeighingDate] = useState('');

      const pets = user?.pets ? user.pets : [];
      const [organizedPets, setOrganizedPets] = useState<PetsProps[]>([])
      const [petID, setPetID] = useState('');
      const [petOpen, setPetOpen] = useState(false);

      function petsOrgonizer() {

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

      async function handleUpdateWeight() {

            try {
                  const id = String(new Date().getTime());
                  const pet_id = dropdown ? petID : petId;

                  if (user?.name) {
                        const updatedUser = await addPetWeight(user, pet_id, { id, amount, weighingDate });
                        updateUser(updatedUser);
                  }

                  toast("O peso do seu pet foi adicionado com sucesso.", "success", 4000, "bottom", false);

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
            petsOrgonizer();
      }, []);

      return (
            <Container>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Content>
                              <AddHeader
                                    style={{ borderRadius: 30 }}
                                    title="Peso"
                                    handleCancel={cancel}
                                    handleSave={() => handleUpdateWeight}
                              />
                              <Form>
                                    {
                                          !!dropdown &&
                                          <DropDownPicker
                                                style={style.dropdownContainer}
                                                dropDownContainerStyle={style.dropdown}
                                                placeholder='Escolha o pet'
                                                placeholderStyle={{ color: '#4A4A4A' }}
                                                open={petOpen}
                                                value={petID}
                                                items={organizedPets}
                                                setOpen={setPetOpen}
                                                setValue={setPetID}
                                                zIndex={2}
                                          />
                                    }
                                    <InputForm
                                          placeholder="Peso"
                                          value={amount}
                                          onChangeText={setAmount}
                                    />
                                    <InputForm
                                          placeholder="Data"
                                          value={weighingDate}
                                          onChangeText={setWeighingDate}
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
