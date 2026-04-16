import React from 'react';
import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

interface Props {
    screen: string;
    logoColor: 'black' | 'white';
}

export const Container = styled.View`
    flex: 1;

    justify-content: center;
    align-items: center;
`;

export const Box = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(Ionicons)<Props>`
    color: ${({ screen }) => (screen === 'welcome' ? 'white' : 'black')};
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 50px;
`;
