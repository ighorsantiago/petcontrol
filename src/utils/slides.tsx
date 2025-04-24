import { Image } from "react-native";
import { useTranslation } from "react-i18next";

// const { t } = useTranslation();

export const slides = [
    {
        backgroundColor: '#FFF',
        image: <Image source={require("../assets/image-dogs.png")} />,
        title: useTranslation("onboarding.slide1.title"),
        subtitle: useTranslation("onboarding.slide1.subtitle"),
    },
    {
        backgroundColor: "#FFF",
        image: <Image source={require("../assets/image-cat.png")} />,
        title: useTranslation("onboarding.slide2.title"),
        subtitle: useTranslation("onboarding.slide2.subtitle"),
    },
    {
        backgroundColor: "#FFF",
        image: <Image source={require("../assets/image-dog-hug.png")} />,
        title: useTranslation("onboarding.slide3.title"),
        subtitle: useTranslation("onboarding.slide3.subtitle"),
    },
];

// export const slides = [
//     {
//         backgroundColor: '#FFF',
//         image: <Image source={require('../assets/image-dogs.png')} />,
//         title: 'Cuide do seu melhor amigo.',
//         subtitle: 'Todas as informações importantes sobre o seu pet em um só lugar.',
//     },
//     {
//         backgroundColor: '#FFF',
//         image: <Image source={require('../assets/image-cat.png')} />,
//         title: 'Vacinas, consultas, horários de remédios...',
//         subtitle: 'Confira as informações a qualquer momento.',
//     },
//     {
//         backgroundColor: '#FFF',
//         image: <Image source={require('../assets/image-dog-hug.png')} />,
//         title: 'Aprenda mais sobre seu pet.',
//         subtitle: 'Artigos e vídeos para você aprender mais sobre o comportamento do seu pet.',
//     },
// ];

// export const slides = [
//     {
//         id: '1',
//         title: 'Cuide do seu melhor amigo.',
//         subtitle: 'Todas as informações importantes sobre o seu pet em um só lugar.',
//         image: require('../assets/image-dogs.png'),
//         alt: 'Imagem de dois cochorros',
//     },
//     {
//         id: '2',
//         title: 'Vacinas, consultas, horários de remédios...',
//         subtitle: 'Confira as informações a qualquer momento.',
//         image: require('../assets/image-cat.png'),
//         alt: 'Imagem de um gato.',
//     },
//     {
//         id: '3',
//         title: 'Aprenda mais sobre seu pet.',
//         subtitle: 'Artigos e vídeos para você aprender mais sobre o comportamento do seu pet.',
//         image: require('../assets/image-dog-hug.png'),
//         alt: 'Imagem de um humano abraçando um cachorro.',
//     },
// ];