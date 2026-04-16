import { useState } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { MaskInputProps, UseMaskedInputProps } from 'react-native-mask-input';

import { Container, IconBox, Drop, ErrorMessage } from './styles';

type Props = MaskInputProps & {
    value?: string;
    icon?: boolean;
    isFilled?: boolean;
    errorMessage?: string;
};

export function MaskInputForm({ value, icon = false, isFilled, errorMessage, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    // const [isFilled, setIsFilled] = useState(false);

    function handleInputFocused() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        // setIsFilled(!!value);
    }

    return (
        <>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

            <Container>
                <MaskInput
                    style={styles.dropdown}
                    onFocus={handleInputFocused}
                    onBlur={handleInputBlur}
                    // isFilled={!errorMessage}
                    placeholderTextColor="#4A4A4A"
                    {...rest}
                />
                {icon && (
                    <IconBox>
                        <Ionicons name="search" size={24} color="#787878" />
                    </IconBox>
                )}
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        minHeight: 65,
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#BDBBBB',
        borderRadius: 6,
    },
});

// ${({ isFilled }) => !isFilled && {
//     borderColor: 'red'
// }}
