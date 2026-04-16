import { Platform } from 'react-native';
import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    isFocused?: boolean;
    isFilled: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    align-items: center;

    /* background-color: white; */
`;

export const Drop = styled(DropDownPicker)<Props>`
    width: 100%;
    min-height: 65px;

    flex-direction: row;

    margin-bottom: 10px;
    padding: 0 8px;

    border: 1px solid #bdbbbb;

    ${({ isFilled }) =>
        !isFilled && {
            borderColor: 'red',
        }}

    border-radius: 6px;

    background-color: white;
`;

export const IconBox = styled.View`
    position: absolut;
    bottom: 5px;
    right: 40px;
`;

export const ErrorMessage = styled.Text`
    color: red;
`;
