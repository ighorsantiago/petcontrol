import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    updateProfile,
} from 'firebase/auth';

import { auth } from '@/config/firebase';
import type { User } from '@/types';
import { saveUserLocally, saveUserInFirestore, getUserFromFirestore, getUserLocally } from './user.service';

export async function signUp(user: User, password: string): Promise<void> {
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

        await saveUserInFirestore({ ...user, id: firebaseUser.uid });
        await saveUserLocally({ ...user, id: firebaseUser.uid });
    } catch (error) {
        console.error('auth.service / signUp =>', error);
        throw error;
    }
}

export async function signIn(email: string, password: string): Promise<void> {
    try {
        const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
        console.log('firebaseUser =>', firebaseUser.email);
        if (!firebaseUser.email) return;
        const userData = await getUserFromFirestore(firebaseUser.email);
        console.log('userData do Firestore =>', userData);
        if (userData) {
            await saveUserLocally(userData);
            const userLocal = await getUserLocally()
            if (userLocal?.email) console.log('Salvou localmente!');
        }
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
