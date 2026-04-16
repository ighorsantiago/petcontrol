import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
    width: 120px;
    height: 100px;

    justify-content: center;
    align-items: center;

    margin: 30px 20px;

    /* background-color: #EBEBEB; */
`;

export const Image = styled.View`
    width: 100px;
    height: 100px;

    justify-content: center;
    align-items: center;

    border-radius: 60px;
    border-width: 5px;
    border-color: #e27e08;

    margin-bottom: 9px;

    background-color: #ebebeb;
`;

export const Avatar = styled.Image`
    width: 90px;
    height: 90px;

    border-radius: 55px;
`;

export const Name = styled.Text`
    font-weight: 700;
    font-size: 24.2px;
    line-height: 28px;

    color: #3e84a8;
`;
