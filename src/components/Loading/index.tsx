import { Container, Icon } from './styles';

import logo from '@/assets/logo.png';

export function Loading() {
    return (
        <Container>
            <Icon source={logo} />
        </Container>
    );
}
