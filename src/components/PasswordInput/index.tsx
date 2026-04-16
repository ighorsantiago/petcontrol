import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handlePasswordVisibilityChange() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    function handleInputFocused() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={isFocused || isFilled ? '#DC1637' : '#AEAEB3'}
                />
            </IconContainer>

            <InputText
                onFocus={handleInputFocused}
                onBlur={handleInputBlur}
                secureTextEntry={isPasswordVisible}
                autoCorrect={false}
                {...rest}
            />

            <TouchableOpacity onPress={handlePasswordVisibilityChange}>
                <IconContainer>
                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color="#AEAEB3"
                    />
                </IconContainer>
            </TouchableOpacity>
        </Container>
    );
}
