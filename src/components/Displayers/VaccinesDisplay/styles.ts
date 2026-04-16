import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;

    justify-content: center;

    /* background-color: red; */
`;

export const Content = styled.View`
    flex: 1;

    padding: 30px;

    margin-bottom: 70px;
`;

export const Box = styled.View`
    border-width: 3px;
    border-radius: 20px;
    border-color: #3e84a8;

    padding: 10px;

    margin-bottom: 30px;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;

    margin-bottom: 15px;

    color: black;
`;

export const BoxContent = styled.View`
    flex-direction: row;

    align-items: center;
`;

export const InfoBox = styled.View`
    flex-direction: row;

    align-items: center;

    margin-bottom: 10px;

    /* background-color: gray; */
`;

export const Label = styled.Text`
    font-size: 16px;
    align-self: flex-end;

    color: black;
`;

export const Text = styled.Text`
    font-size: 14px;
    align-self: flex-end;

    margin-right: 50px;

    color: black;
`;

export const AddButton = styled(TouchableOpacity)`
    /* width: 90%;
    height: 40px; */

    justify-content: center;
    align-items: center;
    align-self: center;

    border-radius: 20px;
    border-width: 2px;
    border-color: #3e84a8;

    margin: 25px 0;

    padding: 7px;

    /* background-color: #3E84A8; */
`;

export const AddButtonText = styled.Text`
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    text-align: center;

    color: #3e84a8;
`;
