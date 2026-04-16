import type { TouchableOpacityProps } from 'react-native';
// import { useTranslation } from 'react-i18next';

import { Container, Button, ButtonText, Title } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    handleCancel: () => void;
    handleSave: () => void;
};

export function AddHeader({ title, handleCancel, handleSave, ...rest }: Props) {
    // const { t } = useTranslation();

    return (
        <Container {...rest}>
            <Button onPress={handleCancel}>
                <ButtonText>Cancelar</ButtonText>
            </Button>

            <Title>{title}</Title>

            <Button onPress={handleSave}>
                <ButtonText>Salvar</ButtonText>
            </Button>
        </Container>
    );
}
