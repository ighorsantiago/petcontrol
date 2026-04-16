import AsyncStorage from "@react-native-async-storage/async-storage";

import { ONBOARDING_STORAGE } from "./storageConfig";

export async function storageOnboardingSave() {
    await AsyncStorage.setItem(ONBOARDING_STORAGE, 'true');
}

// export async function storageOnboardingGet() {
//     const storage = await AsyncStorage.getItem(ONBOARDING_STORAGE);
//     const onboardingViewed = !!storage;

//     return onboardingViewed;
// }

export async function storageOnboardingRemove() {
    await AsyncStorage.removeItem(ONBOARDING_STORAGE);
}
