import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    updateProfile,
} from 'firebase/auth';

import { auth } from '@/config/firebase';
import type { User } from '@/types';
import { saveUserLocally, saveUserInFirestore, getUserFromFirestore } from './user.service';

export async function signUp(user: User, password: string): Promise<User> {
    try {
        const { user: firebaseUser } = await createUserWithEmailAndPassword(
            auth,
            user.email,
            password,
        );

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: user.name,
            });
        }

        const newUser: User = { ...user, id: firebaseUser.uid };
        await saveUserInFirestore(newUser);
        await saveUserLocally(newUser);
        return newUser;
    } catch (error) {
        console.error('auth.service / signUp =>', error);
        throw error;
    }
}

export async function signIn(email: string, password: string): Promise<User> {
    try {
        const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);

        // Tenta buscar dados completos do Firestore
        let userData: User | null = null;
        try {
            userData = await getUserFromFirestore(firebaseUser.email!);
        } catch {
            // Firestore falhou — usa dados básicos do Firebase Auth como fallback
        }

        const user: User = userData ?? {
            id: firebaseUser.uid,
            name: firebaseUser.displayName ?? '',
            email: firebaseUser.email!,
        };

        await saveUserLocally(user);
        return user;
    } catch (error) {
        console.error('auth.service / signIn =>', error);
        throw error;
    }
}

export async function forgotPassword(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error('auth.service / forgotPassword =>', error);
        throw error;
    }
}

export async function changePassword(newPassword: string): Promise<void> {
    try {
        const user = auth.currentUser;

        if (!user) throw new Error('Nenhum usuário autenticado.');

        await updatePassword(user, newPassword);
    } catch (error) {
        console.error('auth.service / changePassword =>', error);
        throw error;
    }
}