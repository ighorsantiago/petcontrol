import styled from 'styled-components/native';

export const Container = styled.View`
    width: 80%;

    align-self: center;
    justify-content: center;
    align-items: flex-start;

    border-radius: 10px;
    margin-bottom: 20px;
    background-color: white;
`;

export const InfoBox = styled.View`
    flex-direction: row;

    margin: 10px 0;
`;

export const Label = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin: 0 10px;
    color: black;
`;

export const Text = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: black;
`;
