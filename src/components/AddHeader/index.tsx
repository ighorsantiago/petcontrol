import type { TouchableOpacityProps } from 'react-native';

import { Container, Button, ButtonText, Title } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    handleCancel: () => void;
    handleSave: () => void;
    isLoading?: boolean;
};

export function AddHeader({ title, handleCancel, handleSave, isLoading = false, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Button onPress={handleCancel} disabled={isLoading}>
                <ButtonText>Cancelar</ButtonText>
            </Button>

            <Title>{title}</Title>

            <Button onPress={handleSave} disabled={isLoading}>
                <ButtonText>{isLoading ? 'Salvando...' : 'Salvar'}</ButtonText>
            </Button>
        </Container>
    );
}
