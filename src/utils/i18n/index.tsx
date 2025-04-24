import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import ptBr from './ptBr.json';
// import en from './en.json';

import translations from "./locale";

const i18nConfig = {
	resource: translations,
	fallbackLng: "pt-BR",
	defaultNS: "translations",
};

i18n
    .use(initReactI18next)
    .init(i18nConfig)

// i18n.use(initReactI18next).init({
// 	fallbackLng: "pt",
// 	interpolation: {
// 		escapeValue: false,
// 	},
// 	resources: {
// 		en: en,
// 		pt: ptBr,
// 	},
// 	react: { useSuspense: false },
// });

export default i18n;
