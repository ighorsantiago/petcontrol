import { RectButtonProps } from 'react-native-gesture-handler';

import {
      Container,
      OptionView,
      OptionIcon,
      Name,
      Image,
      ImageBox
} from './styles';

type Props = RectButtonProps & {
      // type: 'cat' | 'dog';
      type: string;
      name: string;
      icon?: ImageSourcePropType;
}

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native';

export function ImageOptionsCard({ type, name, icon, ...rest }: Props) {

      return (
            <Container {...rest}>
                  <OptionView>
                        <Name>{name}</Name>
                        {icon &&
                              <ImageBox>
                                    <Image source={icon} />
                              </ImageBox>
                        }
                  </OptionView>
            </Container>
      );
}