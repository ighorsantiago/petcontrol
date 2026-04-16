import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: 100%;
    height: 30%;

    justify-content: center;
    align-items: center;

    margin-bottom: 20%;

    background-color: #ea763b;
`;

export const PageName = styled.Text`
    font-size: 48px;
    font-weight: bold;

    color: cornsilk;
`;

export const Pet = styled.View`
    width: 150px;
    height: 150px;

    justify-content: center;
    align-items: center;

    border-radius: 75px;
    border-width: 1px;

    background-color: white;

    position: absolute;
    top: 70%;
`;

export const PetType = styled(MaterialCommunityIcons)``;

export const PetName = styled.Text`
    font-size: 36px;

    color: #ea763b;
`;
