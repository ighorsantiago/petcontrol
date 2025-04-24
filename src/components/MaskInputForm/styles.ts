import MaskInput from 'react-native-mask-input';
import styled from 'styled-components/native';

interface Props {
    isFocused?: boolean;
    isFilled: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    align-items: center;

    /* background-color: white; */
`;

export const Drop = styled(MaskInput)<Props>`
    width: 100%;
    min-height: 65px;
    
    flex-direction: row;

    margin-bottom: 10px;
    padding: 0 8px;

    border: 1px solid #BDBBBB;
    ${({ isFilled }) => !isFilled && {
        borderColor: 'red'
    }}
    border-radius: 6px;
`;

export const IconBox = styled.View`
    position: absolut;
    bottom: 5px;
    right: 40px;
`;

export const ErrorMessage = styled.Text`
    color: red;
`;
