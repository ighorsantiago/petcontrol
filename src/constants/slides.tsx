import { Image } from 'react-native';
import type { TFunction } from 'i18next';

export function getSlides(t: TFunction) {
    return [
        {
            backgroundColor: '#FFF',
            image: <Image source={require('@/assets/image-dogs.png')} />,
            title: t('onboarding.slide1.title'),
            subtitle: t('onboarding.slide1.subtitle'),
        },
        {
            backgroundColor: '#FFF',
            image: <Image source={require('@/assets/image-cat.png')} />,
            title: t('onboarding.slide2.title'),
            subtitle: t('onboarding.slide2.subtitle'),
        },
        {
            backgroundColor: '#FFF',
            image: <Image source={require('@/assets/image-dog-hug.png')} />,
            title: t('onboarding.slide3.title'),
            subtitle: t('onboarding.slide3.subtitle'),
        },
    ];
}
