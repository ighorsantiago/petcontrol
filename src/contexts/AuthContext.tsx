import { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';

import type { User } from '@/types';
import { Loading } from '@/components/Loading';
import {
    signUp,
    signIn,
    forgotPassword,
    changePassword,
    signInWithGoogle,
    signInWithApple,
} from '@/services/auth.service';
import {
    getUserLocally,
    removeUserLocally,
    saveUserLocally,
    saveUserInFirestore,
} from '@/services/user.service';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signInFirebase: (name: string, email: string, password: string) => Promise<void>;
    logInFirebase: (email: string, password: string) => Promise<void>;
    logInWithGoogle: (accessToken: string) => Promise<void>;
    logInWithApple: () => Promise<void>;
    forgotPasswordFirebase: (email: string) => Promise<void>;
    updateUser: (updatedUser: User) => Promise<void>;
    changePasswordFirebase: (newPassword: string) => Promise<void>;
    logOut: () => Promise<void>;
};

// ─── Context ──────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoredUser() {
            try {
                const storedUser = await getUserLocally();
                setUser(storedUser ?? null);
            } catch (error) {
                console.error('AuthContext / loadStoredUser =>', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadStoredUser();
    }, []);

    async function signInFirebase(name: string, email: string, password: string) {
        try {
            const createdUser = await signUp({ name, email }, password);
            setUser(createdUser);
        } catch (error) {
            console.error('AuthContext / signInFirebase =>', error);
            throw error;
        }
    }

    async function logInFirebase(email: string, password: string) {
        try {
            const loggedUser = await signIn(email, password);
            setUser(loggedUser);
        } catch (error) {
            console.error('AuthContext / logInFirebase =>', error);
            throw error;
        }
    }

    async function logInWithGoogle(accessToken: string) {
        try {
            const googleUser = await signInWithGoogle(accessToken);
            setUser(googleUser);
        } catch (error) {
            console.error('AuthContext / logInWithGoogle =>', error);
            throw error;
        }
    }

    async function logInWithApple() {
        try {
            const appleUser = await signInWithApple();
            setUser(appleUser);
        } catch (error) {
            console.error('AuthContext / logInWithApple =>', error);
            throw error;
        }
    }

    async function forgotPasswordFirebase(email: string) {
        try {
            await forgotPassword(email);
        } catch (error) {
            console.error('AuthContext / forgotPasswordFirebase =>', error);
            throw error;
        }
    }

    async function changePasswordFirebase(newPassword: string) {
        try {
            await changePassword(newPassword);
        } catch (error) {
            console.error('AuthContext / changePasswordFirebase =>', error);
            throw error;
        }
    }

    async function updateUser(updatedUser: User) {
        try {
            setUser(updatedUser);
            await saveUserLocally(updatedUser);
            await saveUserInFirestore(updatedUser);
        } catch (error) {
            console.error('AuthContext / updateUser =>', error);
            throw error;
        }
    }

    async function logOut() {
        try {
            await removeUserLocally();
            setUser(null);
            router.replace('/onboardingScreen');
        } catch (error) {
            console.error('AuthContext / logOut =>', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signInFirebase,
                logInFirebase,
                logInWithGoogle,
                logInWithApple,
                forgotPasswordFirebase,
                updateUser,
                changePasswordFirebase,
                logOut,
            }}
        >
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}
