import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import {
      Container,
      OptionView,
      Title,
} from './styles';

type Props = TouchableOpacityProps & {
      name: string;
      active: boolean;
}

export function OptionsCard({ name, active = false, ...rest }: Props) {

      return (
            <TouchableOpacity {...rest}>
                  <OptionView active={active}>
                        <Title active={active}>{name}</Title>
                  </OptionView>
            </TouchableOpacity>
      );
}
