# 🐾 PetControl

Aplicativo mobile para gerenciamento de informações dos seus pets. Acompanhe vacinas, medicações, consultas, higiene, peso e muito mais em um só lugar.

---

## 📱 Screenshots

> _Screenshots serão adicionados em breve._

---

## ✨ Funcionalidades

- 🔐 Cadastro e login de tutor
- 🐶 Cadastro de múltiplos pets (cão e gato)
- 💉 Registro de vacinas
- 💊 Controle de medicações
- 🪱 Registro de vermífugos
- 🛁 Controle de higiene (banho e tosa)
- 📅 Agendamento de consultas veterinárias
- ⚖️ Histórico de peso
- 🍖 Controle de alimentação
- 🌐 Suporte a múltiplos idiomas (PT-BR, EN, ES, FR)

---

## 🛠 Stack

| Tecnologia | Versão |
|---|---|
| React Native | 0.76 |
| Expo | SDK 52 |
| TypeScript | 5.3 |
| Expo Router | 4.0 |
| Firebase (Auth + Firestore + Storage) | 11.6 |
| Styled Components | 6.0 |
| React Hook Form + Yup | - |
| i18next | - |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo Go no celular **ou** emulador Android/iOS configurado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ighorsantiago/petcontrol.git
cd petcontrol

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Firebase
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Rodando o projeto

```bash
npx expo start
```

- Pressione `a` para abrir no emulador Android
- Pressione `i` para abrir no simulador iOS
- Escaneie o QR Code com o Expo Go no celular

---

## 📁 Estrutura do projeto

```
petcontrol/
├── src/
│   ├── app/                  # Rotas (Expo Router)
│   │   ├── (auth)/           # Telas de autenticação
│   │   └── (tabs)/           # Telas principais
│   ├── components/           # Componentes reutilizáveis
│   ├── config/               # Configuração do Firebase
│   ├── constants/            # Dados estáticos (espécies, raças, opções)
│   ├── contexts/             # Context API (AuthContext)
│   ├── hooks/                # Custom hooks (useAuth)
│   ├── services/             # Camada de serviços (Firebase)
│   ├── storage/              # Configuração do AsyncStorage
│   ├── types/                # Tipos TypeScript
│   └── utils/                # Funções utilitárias e i18n
├── assets/                   # Imagens e ícones
├── .env.example              # Exemplo de variáveis de ambiente
└── eas.json                  # Configuração do EAS Build
```

---

## 🔨 Build para produção

O projeto usa [EAS Build](https://docs.expo.dev/build/introduction/) para gerar os builds.

```bash
# Build de preview (APK para testes)
eas build --platform android --profile preview

# Build de produção (AAB para Play Store)
eas build --platform android --profile production
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Ighor Santiago**
- GitHub: [@ighorsantiago](https://github.com/ighorsantiago)
- LinkedIn: [linkedin.com/in/ighorsantiago](https://linkedin.com/in/ighorsantiago)