import { Image } from 'react-native';
import type { TFunction } from 'i18next';

import dog from '@/assets/image-dogs.png';
import cat from '@/assets/image-cat.png';
import hug from '@/assets/image-dog-hug.png';

export function getSlides(t: TFunction) {
    return [
        {
            backgroundColor: '#FFF',
            image: <Image source={dog} />,
            title: t('onboarding.slide1.title'),
            subtitle: t('onboarding.slide1.subtitle'),
        },
        {
            backgroundColor: '#FFF',
            image: <Image source={cat} />,
            title: t('onboarding.slide2.title'),
            subtitle: t('onboarding.slide2.subtitle'),
        },
        {
            backgroundColor: '#FFF',
            image: <Image source={hug} />,
            title: t('onboarding.slide3.title'),
            subtitle: t('onboarding.slide3.subtitle'),
        },
    ];
}
