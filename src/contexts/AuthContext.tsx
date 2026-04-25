import { createContext, useContext, useEffect, useState } from 'react';
import { router, useSegments, useRouter } from 'expo-router';

import type { User } from '@/types';
import { Loading } from '@/components/Loading';
import { signUp, signIn, forgotPassword, changePassword } from '@/services/auth.service';
import {
    saveUserLocally,
    getUserLocally,
    removeUserLocally,
    saveUserInFirestore,
} from '@/services/user.service';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signInFirebase: (name: string, email: string, password: string) => Promise<void>;
    logInFirebase: (email: string, password: string) => Promise<void>;
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
                setLoading(true);
                const storedUser = await getUserLocally();
                if (storedUser) {
                    setUser(storedUser);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('AuthContext / loadStoredUser =>', error);
            } finally {
                setLoading(false);
            }
        }

        loadStoredUser();
    }, []);

    async function signInFirebase(name: string, email: string, password: string) {
        try {
            setLoading(true);
            const newUser: User = { name, email };
            await signUp(newUser, password);
            const storedUser = await getUserLocally();
            if (storedUser) setUser(storedUser);
        } catch (error) {
            console.error('AuthContext / signInFirebase =>', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function logInFirebase(email: string, password: string) {
        try {
            setLoading(true);
            await signIn(email, password);
            const storedUser = await getUserLocally();
            if (storedUser) {
                setUser(storedUser);
            }
        } catch (error) {
            console.error('AuthContext / logInFirebase =>', error);
            throw error;
        } finally {
            setLoading(false);
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
            setLoading(true);
            await removeUserLocally();
            setUser(null);
            router.replace('/onboardingScreen');
        } catch (error) {
            console.error('AuthContext / logOut =>', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signInFirebase,
                logInFirebase,
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
