import { useState } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Avatar, Container, Image, Name } from './styles';

type Props = RectButtonProps & {
    type: 'cat' | 'dog';
    name: string;
    avatar?: string;
};

export function PetCard({ type, name, avatar, ...rest }: Props) {
    const [imgError, setImgError] = useState(false);

    return (
        <Container {...rest}>
            <Image>
                {avatar && !imgError ? (
                    <Avatar source={{ uri: avatar }} onError={() => setImgError(true)} />
                ) : (
                    <MaterialCommunityIcons name={type} size={70} color="#E27E08" />
                )}
            </Image>
            <Name numberOfLines={1}>{name}</Name>
        </Container>
    );
}
