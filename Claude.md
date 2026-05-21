# PetControl — Contexto do Projeto

## Visão Geral

App mobile React Native para gerenciamento de informações de pets (vacinas, medicações, consultas, higiene, peso, alimentação). Desenvolvido por Ighor Santiago, atualmente em refatoração pré-publicação.

**Repositório:** https://github.com/ighorsantiago/petcontrol

---

## Stack

| Tecnologia | Versão |
|---|---|
| React Native | 0.76 |
| Expo | SDK 52 |
| TypeScript | 5.3 |
| Expo Router | 4.0 |
| Firebase (Auth + Firestore + Storage) | 11.6 |
| Styled Components | 6.0 |
| React Hook Form + Yup | - |
| i18next | PT-BR, EN, ES, FR |
| EAS Build | - |

---

## Estrutura do projeto

```
petcontrol/
├── src/
│   ├── app/                  # Rotas (Expo Router)
│   │   ├── (auth)/           # Onboarding, Welcome, Login, SignUp
│   │   └── (tabs)/           # Home, Pets, PetInfo, AddPet, Tutor
│   │       └── (tabs)/       # Weight, Food, Vaccines, Medications,
│   │                         # Hygiene, Deworming, Appointments
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Displayers/       # AppointmentsDisplay, VaccinesDisplay, etc.
│   │   └── ui/               # Input, Button, Toast, Loading, etc.
│   ├── config/
│   │   └── firebase.ts       # Inicialização do Firebase (usa variáveis de ambiente)
│   ├── constants/
│   │   ├── options.ts        # Menus e opções do app
│   │   ├── species.ts        # Espécies e raças (dogBreeds, catBreeds)
│   │   └── slides.tsx        # Slides do onboarding (getSlides(t))
│   ├── contexts/
│   │   └── AuthContext.tsx   # Estado global do usuário autenticado
│   ├── hooks/
│   │   └── useAuth.ts        # Hook de acesso ao AuthContext
│   ├── services/
│   │   ├── auth.service.ts   # signUp, signIn, forgotPassword, changePassword
│   │   ├── user.service.ts   # AsyncStorage + Firestore + atualização de pets
│   │   ├── storageConfig.ts  # Chaves do AsyncStorage
│   │   └── index.ts
│   ├── storage/              # (pasta legacy, storageConfig.ts migrado para services/)
│   ├── types/
│   │   ├── pet.types.ts      # Pet, Weight, Food, Vaccine, Medication, Hygiene, Deworming, Appointment
│   │   ├── user.types.ts     # User
│   │   └── index.ts
│   └── utils/
│       ├── firebaseErrors.ts # getFirebaseErrorMessage(error)
│       ├── getPetAge.ts
│       ├── masks.ts
│       └── i18n/             # Configuração e locales do i18next
├── assets/                   # Imagens e ícones
├── .env                      # Variáveis de ambiente (não commitado)
├── .env.example              # Modelo das variáveis
├── eslint.config.js          # ESLint (flat config, v9)
├── .prettierrc               # Prettier (singleQuote, tabWidth: 4)
└── eas.json                  # Profiles: development, preview, production
```

---

## Fluxo de autenticação

```
App abre
  └── AuthContext.loadStoredUser()
        ├── getUserLocally() → tem usuário → setUser → Home
        └── sem usuário → setUser(null) → Onboarding

Login
  └── logInFirebase(email, password)
        └── auth.service.signIn()
              ├── signInWithEmailAndPassword (Firebase Auth)
              ├── getUserFromFirestore(email)
              └── saveUserLocally(userData)

Cadastro
  └── signInFirebase(name, email, password)
        └── auth.service.signUp()
              ├── createUserWithEmailAndPassword (Firebase Auth)
              ├── saveUserInFirestore(user)
              └── saveUserLocally(user)

Logout
  └── logOut()
        ├── removeUserLocally()
        ├── setUser(null)
        └── router.replace('/onboardingScreen')
```

---

## Arquitetura de dados

O usuário (`User`) contém uma lista de pets (`Pet[]`). Cada pet contém arrays de:
- `weight[]` — histórico de peso
- `food[]` — alimentação
- `vaccines[]` — vacinas
- `medications[]` — medicamentos
- `hygiene[]` — higiene (banho/tosa)
- `deworming[]` — vermífugos
- `appointments[]` — consultas veterinárias

**Todos os dados do usuário e pets são salvos como um único documento no Firestore**, usando o email como ID do documento (`doc(db, 'users', user.email)`).

---

## Padrão de atualização de pet

Todas as telas que atualizam dados do pet seguem esse padrão:

```tsx
// Na tela
const updatedUser = await addPetVaccine(user, petId, { id, name, date, next });
await updateUser(updatedUser); // salva localmente + Firestore
```

Funções disponíveis em `user.service.ts`:
- `addPetWeight(user, petId, entry: Weight)`
- `addPetFood(user, petId, entry: Food)`
- `addPetVaccine(user, petId, entry: Vaccine)`
- `addPetMedication(user, petId, entry: Medication)`
- `addPetHygiene(user, petId, entry: Hygiene)` ← já salva no Firestore internamente
- `addPetDeworming(user, petId, entry: Deworming)`
- `addPetAppointment(user, petId, entry: Appointment)`
- `updatePetAvatar(user, petId, avatar)`

---

## Variáveis de ambiente

Arquivo `.env` na raiz (não commitado). Modelo em `.env.example`:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

---

## Commits realizados (refatoração)

```
✅ chore: move firebase config to env variables
✅ chore: remove nativewind and tailwind dependencies
✅ chore: add src/types with Pet and User types
✅ refactor: create src/services layer
✅ refactor: create AuthContext and useAuth hook
✅ chore: remove legacy storage files and dtos folder
✅ refactor: create src/constants folder
✅ chore: add ESLint and Prettier configuration
✅ refactor: add Firebase error handling utility
✅ fix: persist user session with AsyncStorage
✅ docs: add README
```

---

## Problema em aberto (PRIORIDADE ALTA)

### Persistência de sessão não funciona no build

**Sintoma:** Ao fazer login o usuário acessa o app normalmente. Ao fechar o app e abrir novamente, volta para o Onboarding em vez de ir direto para a Home.

**O que já foi investigado:**
- O `saveUserLocally` salva corretamente no AsyncStorage (confirmado via logs)
- O `getUserLocally` lê corretamente durante a sessão ativa
- Ao reabrir o app, o AsyncStorage está vazio — a chave `@petcontrol:user` some
- A chave `test_key` (teste manual) persiste normalmente entre sessões
- O problema foi identificado no `+not-found.tsx` que chamava `logOut` no `onPress` — já corrigido
- Mesmo após a correção, o problema persiste no build (APK gerado via EAS)
- No Expo Go o problema também ocorre mas pode ser comportamento do Expo Go

**Suspeita atual:** Algo ainda está chamando `removeUserLocally` ou limpando a chave `@petcontrol:user` especificamente ao iniciar o app. O `test_key` persiste mas `@petcontrol:user` some — indica remoção seletiva, não limpeza geral.

**Estado atual do `AuthContext`:**
```tsx
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
```

**Estado atual do `_layout.tsx`:**
```tsx
function RootLayoutNav() {
    const { user, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const [isNavigationReady, setIsNavigationReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            setIsNavigationReady(true);
            SplashScreen.hideAsync();
        }
    }, [loading]);

    useEffect(() => {
        if (!isNavigationReady) return;
        const inAuthGroup = segments[0] === '(auth)';
        if (!user?.email && !inAuthGroup) {
            router.replace('/onboardingScreen');
        } else if (user?.email && inAuthGroup) {
            router.replace('/(tabs)/home');
        }
    }, [user, isNavigationReady, segments]);

    if (!isNavigationReady) return null;

    return <Slot />;
}
```

**Próximo passo sugerido:** Adicionar logs no build de desenvolvimento para rastrear exatamente quando e por quem a chave `@petcontrol:user` é removida ao iniciar o app.

---

## Checklist restante antes de publicar

```
⏳ Resolver persistência de sessão (problema acima)
⏳ Testar todas as funcionalidades no build:
   - Vacinas, medicações, vermífugos, higiene, consultas, peso, alimentação
   - Tela de perfil do tutor
   - Logout
   - Listagem e troca de pets
⏳ Revisar regras de segurança do Firestore
⏳ Configurar ícone e splash screen definitivos no app.json
⏳ Adicionar screenshots no README
⏳ Build de produção (AAB) para a Play Store
```

---

## Observações importantes

- O Firebase Auth **não persiste sessão** nessa versão do SDK sem `getReactNativePersistence` — a persistência é feita manualmente via AsyncStorage
- O `getReactNativePersistence` não está disponível no Firebase 11.6 com SDK 52 / `@react-native-async-storage` 1.23.1 (conflito de versões)
- As regras do Firestore usam `match /{document=**}` (permissivo) — refinar antes de publicar
- O documento do usuário no Firestore usa o **email** como ID (não o UID do Firebase Auth)
- O i18n precisa ser importado no `_layout.tsx` com `import '@/utils/i18n'` para inicializar antes do app renderizar
- NativeWind foi removido — usar apenas Styled Components
- O `+not-found.tsx` é um arquivo padrão do Expo Router para rotas 404
