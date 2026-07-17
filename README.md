# 🐾 PetControl

A mobile app to manage your pets' health information. Track vaccines, medications, appointments, hygiene, weight, and more — all in one place.

---

## 📱 Screenshots

> _Screenshots coming soon._

---

## ✨ Features

- 🔐 Owner registration and login
- 🐶 Multiple pet profiles (dog and cat)
- 💉 Vaccine tracking
- 💊 Medication management
- 🪱 Deworming records
- 🛁 Hygiene control (bath and grooming)
- 📅 Veterinary appointment scheduling
- 🔔 Local reminders for future events
- ⚖️ Weight history
- 🍖 Feeding control
- 🌐 Multi-language support (PT-BR, EN, ES, FR)

---

## 🛠 Stack

| Technology | Version |
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

## 🚀 Running locally

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go on your phone **or** a configured Android/iOS emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/ighorsantiago/petcontrol.git
cd petcontrol

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase credentials
```

### Environment variables

Create a `.env` file at the project root based on `.env.example`:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Running the project

```bash
npx expo start
```

- Press `a` to open on the Android emulator
- Press `i` to open on the iOS simulator
- Scan the QR Code with Expo Go on your phone

---

## 📁 Project structure

```
petcontrol/
├── src/
│   ├── app/                  # Routes (Expo Router)
│   │   ├── (auth)/           # Authentication screens
│   │   └── (tabs)/           # Main screens
│   ├── components/           # Reusable components
│   ├── config/               # Firebase configuration
│   ├── constants/            # Static data (species, breeds, options)
│   ├── contexts/             # Context API (AuthContext)
│   ├── hooks/                # Custom hooks (useAuth)
│   ├── services/             # Service layer (Firebase)
│   ├── storage/              # AsyncStorage configuration
│   ├── types/                # TypeScript types
│   └── utils/                # Utility functions and i18n
├── assets/                   # Images and icons
├── .env.example              # Environment variables example
└── eas.json                  # EAS Build configuration
```

---

## 🔨 Production build

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) to generate builds.

```bash
# Preview build (APK for testing)
eas build --platform android --profile preview

# Production build (AAB for Play Store)
eas build --platform android --profile production
```

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ighor Santiago**
- GitHub: [@ighorsantiago](https://github.com/ighorsantiago)
- LinkedIn: [linkedin.com/in/ighorsantiago](https://linkedin.com/in/ighorsantiago)
