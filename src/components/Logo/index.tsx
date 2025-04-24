import React from 'react';

import {
      Container,
      Box,
      Icon,
      Title,
} from './styles';

interface Props {
      size: number;
      iconColor: string;
      screen: string;
}

export function Logo({ size, iconColor, screen }: Props) {

      return (
            <Container>
                  <Box>
                        <Icon
                              name="paw-outline"
                              size={size}
                              // color={iconColor}
                              screen={screen}
                        />
                        <Title>Pet Control</Title>
                  </Box>
            </Container>
      );
}