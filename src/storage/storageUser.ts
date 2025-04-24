import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useToast } from "native-base";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	updateCurrentUser,
	updateProfile,
	signInWithRedirect,
	onAuthStateChanged,
	signInWithCredential,
	sendPasswordResetEmail,
	updatePassword,
} from "firebase/auth";

import {
	collection,
	getDocs,
	doc,
	setDoc,
	addDoc,
	query,
	collectionGroup,
	where,
	updateDoc,
	arrayUnion,
	getDoc,
} from "firebase/firestore";
import { date } from "yup";
import { app, auth, db } from "../../firebaseConfig";
import type { PetDTO } from "@/dtos/PetDTO";

import type { UserDTO } from "@/dtos/UserDTO";

import { ONBOARDING_STORAGE, USER_STORAGE } from "./storageConfig";

// import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from 'expo-auth-session';
// import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

export async function storageUserSave(user: UserDTO) {
	await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
	await storageUserSaveInFB(user);
}

async function storageUserSaveInFB(user: UserDTO) {
	const usersRef = doc(db, "users", user.email);

	try {
		await setDoc(usersRef, {
			name: user.name,
			email: user.email,
			pets: user.pets,
			photo: user.avatar ? user.avatar : '',
		});
	} catch (error) {
        console.log("storageUserSaveInFB / setDoc =>", error)
    }
}

export async function storageUserSignInFB(user: UserDTO, password: string) {
	
    try {
		await createUserWithEmailAndPassword(auth, user.email, password)
			.then((userCredential) => {
				const newUser = userCredential.user;

				if (auth.currentUser) {
					updateProfile(auth.currentUser, {
						displayName: newUser.displayName,
					});
				}

				storageUserSave(user);
			})
			.catch((error) => {
				console.log("createUserWithEmailAndPassword =>", error);
			});

		const usersRef = doc(db, "users", user.email);

		await setDoc(usersRef, {
			name: user.name,
			email: user.email,
			pets: [],
			photo: "",
		});

		// await storageUserSave(user);
	} catch (error) {
		console.log("storageUserSignInFB =>", error);
	}
}

export async function storageUserLogInFB(email: string, password: string) {
	try {
		await signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				if (user.email) {
					const usersRef = doc(db, "users", user.email);
					const userInfos = await getDoc(usersRef);
					const userData = userInfos.data();

					if (userData) {
						storageUserSave({
							name: userData.name,
							email: userData.email,
							pets: userData.pets,
							avatar: userData.photo,
						});
					}
				}
			})
			.catch((error) => {
				console.log("signInWithEmailAndPassword", error.message);
			});
	} catch (error) {
		console.log("storageUserLogInFB", error);
	}
}

export async function storageUserGet() {
	const storage = await AsyncStorage.getItem(USER_STORAGE);
	const user: UserDTO = storage ? JSON.parse(storage) : {};

	return user;
}

export async function storageUserForgotPassword(email: string) {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		console.log("storageUserForgotPassword =>", error);
	}
}

export async function storageChangeUserPassword(newPassword: string) {
	const user = auth.currentUser;

	try {
		if (user) {
			updatePassword(user, newPassword).catch((error) => {
				console.log("updatePassword =>", error);
			});
		}
	} catch (error) {
		console.log("storageChangeUserPassword =>", error);
	}
}

export async function storageUserRemove() {
	await AsyncStorage.removeItem(USER_STORAGE);
	await AsyncStorage.removeItem(ONBOARDING_STORAGE);
}

export async function storageUpdatePetAvatar(
	user: UserDTO,
	petID: string,
	avatar: string,
) {
	// Select the pet from the pet list
	// biome-ignore lint/style/useConst: <explanation>
	let petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];
	let pet = petFilter[0];

	// Remove the pet from the pet list
	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	pet = {
		...pet,
		avatar,
	};

	// Insert the updated pet in the pet list
	const petsUpdated = [pet, ...petsFiltered];

	// Insert the updated pet list in the user object
	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

	return userUpdated;
}

export async function storageUpdatePetWeight(
	user: UserDTO,
	petID: string,
	id: string,
	amount: string,
	weighingDate: string,
) {
	// biome-ignore lint/style/useConst: <explanation>
	let petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];
	let pet = petFilter[0];

	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	pet = {
		...pet,
		weight: [
			...pet.weight,
			{
				id,
				amount,
				weighingDate,
			},
		],
	};

	const petsUpdated = [pet, ...petsFiltered];

	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

	return userUpdated;
}

export async function storageUpdatePetFood(
	user: UserDTO,
	petID: string,
	id: string,
	name: string,
	amount: string,
	times: string,
	amountPerMeal: string,
) {
	// biome-ignore lint/style/useConst: <explanation>
	let petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];
	let pet = petFilter[0];

	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	if (pet.food) {
		pet = {
			...pet,
			food: [
				...pet.food,
				{
					id,
					name,
					amount,
					times,
					amountPerMeal,
				},
			],
		};
	}

	const petsUpdated = [pet, ...petsFiltered];

	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

	return userUpdated;
}

export async function storageUpdatePetVaccines(
	user: UserDTO,
	petID: string,
	id: string,
	name: string,
	date: string,
	next?: string,
) {
	// biome-ignore lint/style/useConst: <explanation>
	let petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];
	let pet = petFilter[0];

	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	const vaccinesTaken = pet.vaccines ? pet.vaccines : [];

	pet = {
		...pet,
		vaccines: [
			...vaccinesTaken,
			{
				id,
				name,
				date,
				// next
			},
		],
	};

	const petsUpdated = [pet, ...petsFiltered];

	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

	return userUpdated;
}

export async function storageUpdatePetMedications(
	user: UserDTO,
	petID: string,
	id: string,
	name: string,
	date: string,
	hour: string,
) {
	// biome-ignore lint/style/useConst: <explanation>
	let petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];
	let pet = petFilter[0];

	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	const medicationsTaken = pet.medications ? pet.medications : [];

	pet = {
		...pet,
		medications: [
			...medicationsTaken,
			{
				id,
				name,
				date,
				hour,
			},
		],
	};

	const petsUpdated = [pet, ...petsFiltered];

	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

	return userUpdated;
}

export async function storageUpdatePetHygiene(
	user: UserDTO,
	petID: string,
	id: string,
	category: string,
	date: string,
	next?: string,
) {
	const petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];

	let pet = petFilter[0];

	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	const hygieneMade = pet.hygiene ? pet.hygiene : [];

	pet = {
		...pet,
		hygiene: [
			...hygieneMade,
			{
				id,
				category,
				date,
				next: next ? next : '',
			},
		],
	};

	const petsUpdated = [pet, ...petsFiltered];

	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

    storageUserSaveInFB(userUpdated);

	return userUpdated;
}

export async function storageUpdatePetDeworming(
	user: UserDTO,
	petID: string,
	id: string,
	name: string,
	date: string,
) {
	// biome-ignore lint/style/useConst: <explanation>
	let petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];
	let pet = petFilter[0];

	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	const dewormTaken = pet.deworming ? pet.deworming : [];

	pet = {
		...pet,
		deworming: [
			...dewormTaken,
			{
				id,
				name,
				date,
			},
		],
	};

	const petsUpdated = [pet, ...petsFiltered];

	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

	return userUpdated;
}

export async function storageUpdatePetAppointments(
	user: UserDTO,
	petID: string,
	id: string,
	name: string,
	date: string,
	hour?: string,
) {
	// biome-ignore lint/style/useConst: <explanation>
	let petFilter: PetDTO[] = user.pets
		? user.pets.filter((pet) => pet.id === petID)
		: [];
	let pet = petFilter[0];

	const petsFiltered = user.pets
		? user.pets.filter((pet) => pet.id !== petID)
		: [];

	const appointmentsSetted = pet.appointments ? pet.appointments : [];

	pet = {
		...pet,
		appointments: [
			...appointmentsSetted,
			{
				id,
				name,
				date,
			},
		],
	};

	const petsUpdated = [pet, ...petsFiltered];

	const userUpdated = {
		...user,
		pets: petsUpdated,
	};

	return userUpdated;
}

export function runAtSpecificTimeOfDay(
	hour: number,
	minutes: number,
	user: UserDTO,
	func: (user: UserDTO) => void,
) {
	const twentyFourHours = 86400000;
	const now = new Date();
	let eta_ms =
		new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			hour,
			minutes,
			0,
			0,
		).getTime() - Number(now);
	if (eta_ms < 0) {
		eta_ms += twentyFourHours;
		console.log("eta_ms < 0");
	}
	console.log("eta_ms > 0");
	// setTimeout(function () {
	//     //run once
	//     func(user);
	//     // run every 24 hours from now on
	//     setInterval(func, twentyFourHours);
	// }, eta_ms);
}
