import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    updateProfile,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import { GoogleSignin, statusCodes, isSuccessResponse, isErrorWithCode } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';

import { auth } from '@/config/firebase';
import type { User } from '@/types';
import { saveUserLocally, saveUserInFirestore, getUserFromFirestore } from './user.service';

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function resolveUserFromFirebase(firebaseUser: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}, fallbackName?: string): Promise<User> {
    const email = firebaseUser.email!;

    let userData: User | null = null;
    try {
        userData = await getUserFromFirestore(email);
    } catch {
        // Firestore indisponível — usa dados do provedor como fallback
    }

    if (userData) return userData;

    const newUser: User = {
        id: firebaseUser.uid,
        name: fallbackName ?? firebaseUser.displayName ?? '',
        email,
        avatar: firebaseUser.photoURL ?? undefined,
    };

    await saveUserInFirestore(newUser);
    return newUser;
}

// ─── Email / Senha ────────────────────────────────────────────────────────────

export async function signUp(user: User, password: string): Promise<User> {
    try {
        const { user: firebaseUser } = await createUserWithEmailAndPassword(
            auth,
            user.email,
            password,
        );

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: user.name });
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

// ─── Google ───────────────────────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<User> {
    try {
        GoogleSignin.configure({
            webClientId: '967896711448-mfav5qflj356vfbesdkl370s32ahqbuc.apps.googleusercontent.com',
        });
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();

        if (!isSuccessResponse(response)) {
            throw new Error('Login com Google cancelado.');
        }

        const idToken = response.data.idToken;
        if (!idToken) throw new Error('Google Sign-In: token não recebido.');

        const credential = GoogleAuthProvider.credential(idToken);
        const { user: firebaseUser } = await signInWithCredential(auth, credential);

        const user = await resolveUserFromFirebase(firebaseUser);
        await saveUserLocally(user);
        return user;
    } catch (error: unknown) {
        if (isErrorWithCode(error)) {
            if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                throw new Error('Google Play Services indisponível.');
            }
        }
        console.error('auth.service / signInWithGoogle =>', error);
        throw error;
    }
}

// ─── Apple ────────────────────────────────────────────────────────────────────

export async function isAppleSignInAvailable(): Promise<boolean> {
    if (Platform.OS !== 'ios') return false;
    return AppleAuthentication.isAvailableAsync();
}

export async function signInWithApple(): Promise<User> {
    try {
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });

        const { identityToken, fullName, email } = credential;
        if (!identityToken) throw new Error('Apple Sign-In: token não recebido.');

        const provider = new OAuthProvider('apple.com');
        const oauthCredential = provider.credential({ idToken: identityToken });
        const { user: firebaseUser } = await signInWithCredential(auth, oauthCredential);

        const appleName = fullName?.givenName
            ? `${fullName.givenName} ${fullName.familyName ?? ''}`.trim()
            : undefined;

        const user = await resolveUserFromFirebase(
            { ...firebaseUser, email: firebaseUser.email ?? email ?? '' },
            appleName,
        );
        await saveUserLocally(user);
        return user;
    } catch (error: any) {
        if (error?.code === 'ERR_REQUEST_CANCELED') {
            throw new Error('Login com Apple cancelado.');
        }
        console.error('auth.service / signInWithApple =>', error);
        throw error;
    }
}
