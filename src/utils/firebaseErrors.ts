const firebaseErrorMessages: Record<string, string> = {
    // Auth
    'auth/invalid-email': 'E-mail inválido.',
    'auth/user-disabled': 'Usuário desativado. Entre em contato com o suporte.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/email-already-in-use': 'Este e-mail já está em uso.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Sem conexão com a internet.',
    'auth/requires-recent-login': 'Faça login novamente para continuar.',
    'auth/popup-closed-by-user': 'Login cancelado.',

    // Firestore
    'permission-denied': 'Você não tem permissão para realizar esta ação.',
    unavailable: 'Serviço indisponível. Tente novamente mais tarde.',
    'deadline-exceeded': 'A operação demorou demais. Tente novamente.',
};

export function getFirebaseErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'code' in error) {
        const code = (error as { code: string }).code;
        return firebaseErrorMessages[code] ?? 'Ocorreu um erro inesperado. Tente novamente.';
    }

    return 'Ocorreu um erro inesperado. Tente novamente.';
}
