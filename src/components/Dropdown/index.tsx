import { useState } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { DropDownPickerProps, ValueType } from 'react-native-dropdown-picker';

import { Container, IconBox, Drop, ErrorMessage } from './styles';

// type Props = {
type Props = DropDownPickerProps<ValueType> & {
    valor?: string;
    isFilled?: boolean;
    errorMessage?: string;
    zIndex?: number;
};

export function Dropdown({ valor, isFilled, errorMessage, zIndex = 5000, ...rest }: Props) {
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

            <Container style={{ zIndex: zIndex }}>
                <Drop
                    // style={style.dropdownContainer}
                    dropDownContainerStyle={style.dropdown}
                    // value={valor}
                    isFocused={isFocused}
                    isFilled={!errorMessage}
                    searchPlaceholderTextColor="#4A4A4A"
                    {...rest}
                />
            </Container>
        </>
    );
}

const style = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
        minHeight: 65,
        flexDirection: 'row',
        marginBottom: 10,
        // borderWidth: 1,
        borderColor: '#BDBBBB',
        borderRadius: 6,
        // backgroundColor: '#FFF',
    },
    dropdown: {
        borderRadius: 0,
        borderColor: '#BDBBBB',
    },
});
