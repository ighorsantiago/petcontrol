import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
    isFocused: boolean;
}

export const Container = styled.View`
    height: 46px;
    
    flex-direction: row;

    margin-bottom: 8px;

    border: 1px solid rgba(189, 187, 187, 0.25);
    border-radius: 6px;
`;

export const IconContainer = styled.View<Props>`
    width: 55px;
    height: 100%;

    justify-content: center;
    align-items: center;

    margin-right: 2px;

    background-color: #FFFFFF;

    ${({ isFocused }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: #DC1637;
    `}
`;

export const InputText = styled(TextInput)<Props>`
    flex: 1;

    font-size: ${RFValue(15)}px;

    padding: 0 5px;

    ${({ isFocused }) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: #DC1637;
    `}

    color: rgba(74, 74, 74, 0.4);
    background-color: #FFFFFF;
`;
