import { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaskInputProps, UseMaskedInputProps } from 'react-native-mask-input';

import {
    Container,
    IconBox,
    InputText,
    ErrorMessage
} from './styles';

type Props = TextInputProps & {
    value?: string;
    icon?: boolean;
    isFilled?: boolean;
    errorMessage?: string;
}

export function InputForm({ value, icon = false, isFilled, errorMessage, ...rest }: Props) {

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
            { errorMessage &&
                <ErrorMessage>
                    { errorMessage }
                </ErrorMessage>
            }

            <Container>
                <InputText
                    value={value}
                    onFocus={handleInputFocused}
                    onBlur={handleInputBlur}
                    isFocused={isFocused}
                    isFilled={!errorMessage}
                    placeholderTextColor="#4A4A4A"
                    {...rest}
                />
                {
                    icon &&
                    <IconBox>
                        <Ionicons name="search" size={24} color="#787878" />
                    </IconBox>
                }
            </Container>
        </>
    );
}
