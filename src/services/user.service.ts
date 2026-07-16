import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

import { db, storage } from '@/config/firebase';
import type {
    User,
    Pet,
    Weight,
    Food,
    Vaccine,
    Medication,
    Hygiene,
    Deworming,
    Appointment,
} from '@/types';
import { USER_STORAGE, ONBOARDING_STORAGE, PENDING_SYNC_KEY, LAST_SYNC_KEY } from '@/services/storageConfig';

// ─── Firebase Storage ─────────────────────────────────────────────────────────

export async function uploadImageToStorage(localUri: string, storagePath: string): Promise<string> {
    const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    const storageRef = ref(storage, storagePath);
    await uploadString(storageRef, base64, 'base64');
    return await getDownloadURL(storageRef);
}

// ─── Helpers internos ────────────────────────────────────────────────────────

function updatePetInList(pets: Pet[], petId: string, updater: (pet: Pet) => Pet): Pet[] {
    return pets.map((pet) => (pet.id === petId ? updater(pet) : pet));
}

// ─── AsyncStorage ─────────────────────────────────────────────────────────────

export async function saveUserLocally(user: User): Promise<void> {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function getUserLocally(): Promise<User | null> {
    const data = await AsyncStorage.getItem(USER_STORAGE);
    return data ? JSON.parse(data) : null;
}

export async function removeUserLocally(): Promise<void> {
    await AsyncStorage.multiRemove([USER_STORAGE, ONBOARDING_STORAGE]);
}

// ─── Sync control ────────────────────────────────────────────────────────────

export async function markPendingSync(): Promise<void> {
    await AsyncStorage.setItem(PENDING_SYNC_KEY, 'true');
}

export async function clearPendingSync(): Promise<void> {
    await AsyncStorage.removeItem(PENDING_SYNC_KEY);
    await AsyncStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
}

export async function hasPendingSync(): Promise<boolean> {
    const val = await AsyncStorage.getItem(PENDING_SYNC_KEY);
    return val === 'true';
}

export async function getLastSyncTime(): Promise<number> {
    const val = await AsyncStorage.getItem(LAST_SYNC_KEY);
    return val ? Number(val) : 0;
}

// ─── Onboarding ──────────────────────────────────────────────────────────────

export async function saveOnboarding(): Promise<void> {
    await AsyncStorage.setItem(ONBOARDING_STORAGE, 'true');
}

export async function getOnboarding(): Promise<boolean> {
    const data = await AsyncStorage.getItem(ONBOARDING_STORAGE);
    return !!data;
}

// ─── Firestore ────────────────────────────────────────────────────────────────

export async function saveUserInFirestore(user: User): Promise<void> {
    try {
        const userRef = doc(db, 'users', user.email);
        await setDoc(userRef, {
            name: user.name,
            email: user.email,
            pets: user.pets ?? [],
            photo: user.avatar ?? '',
        });
    } catch (error) {
        console.error('user.service / saveUserInFirestore =>', error);
        throw error;
    }
}

export async function getUserFromFirestore(email: string): Promise<User | null> {
    try {
        const userRef = doc(db, 'users', email);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) return null;

        const data = snapshot.data();
        return {
            name: data.name,
            email: data.email,
            pets: data.pets ?? [],
            avatar: data.photo ?? '',
        };
    } catch (error) {
        console.error('user.service / getUserFromFirestore =>', error);
        throw error;
    }
}

// ─── Atualização de Pet ───────────────────────────────────────────────────────

export async function updatePetAvatar(user: User, petId: string, avatar: string): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        avatar,
    }));
    return { ...user, pets };
}

export async function addPetWeight(user: User, petId: string, entry: Weight): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        weight: [...pet.weight, entry],
    }));
    return { ...user, pets };
}

export async function addPetFood(user: User, petId: string, entry: Food): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        food: [...(pet.food ?? []), entry],
    }));
    return { ...user, pets };
}

export async function addPetVaccine(user: User, petId: string, entry: Vaccine): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        vaccines: [...(pet.vaccines ?? []), entry],
    }));
    return { ...user, pets };
}

export async function addPetMedication(
    user: User,
    petId: string,
    entry: Medication,
): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        medications: [...(pet.medications ?? []), entry],
    }));
    return { ...user, pets };
}

export async function addPetHygiene(user: User, petId: string, entry: Hygiene): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        hygiene: [...(pet.hygiene ?? []), entry],
    }));
    return { ...user, pets };
}

export async function addPetDeworming(user: User, petId: string, entry: Deworming): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        deworming: [...(pet.deworming ?? []), entry],
    }));
    return { ...user, pets };
}

export async function addPetAppointment(
    user: User,
    petId: string,
    entry: Appointment,
): Promise<User> {
    const pets = updatePetInList(user.pets ?? [], petId, (pet) => ({
        ...pet,
        appointments: [...(pet.appointments ?? []), entry],
    }));
    return { ...user, pets };
}