import { RectButtonProps } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
      Avatar,
      Container,
      Image,
      Name
} from './styles';

type Props = RectButtonProps & {
      type: 'cat' | 'dog';
      name: string;
      avatar?: string;
}

export function PetCard({ type, name, avatar, ...rest }: Props) {

      return (
            <Container {...rest}>
                  <Image>
                        {
                              avatar
                                    ? <Avatar src={avatar} />
                                    : <MaterialCommunityIcons name={type} size={70} color="#E27E08" />
                        }
                  </Image>
                  <Name numberOfLines={1}>{name}</Name>
            </Container>
      );
}