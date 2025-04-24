import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '../dtos/UserDTO'
import { PetDTO } from '../dtos/PetDTO'

const [user, setUser] = useState<UserDTO>({} as UserDTO);

const userStorageKey = '@mypet:user';
const petStorageKey = '@mypet:pet';

async function signIn(user: UserDTO, storageKey: string) {
      try {
            if (user) {
                  const userLogged = {
                        id: user.id,
                        name: user.name,
                        pets: [],
                        selectedPet: {} as PetDTO
                  };

                  setUser(userLogged);

                  await AsyncStorage.setItem(storageKey, JSON.stringify(userLogged));
            }

      } catch (error) {
            throw new Error();
      }
}


async function signOut(storageKey: string) {
      console.log("Removeu o usuário")
      // setUser({} as UserDTO);
      await AsyncStorage.removeItem(storageKey);
}

export {
      user,
      signIn,
      signOut
}